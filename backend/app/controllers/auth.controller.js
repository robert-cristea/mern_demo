const config = require("../config/config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { Op, Sequelize } = require("sequelize");
const { generateJWTToken, randomTokenString, sendEmail } = require("../utils");

// const User = db.user;
// const Role = db.role;
exports.signup = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role: roleName } = req.body;
    let user;

    // Username and Email unique
    user = await db.user.findOne({
      where: {
        username,
      },
    });
    if (user) {
      res.status(400).send({
        message: "Username is already in use!",
      });
      return;
    }

    user = await db.user.findOne({
      where: {
        email,
      },
    });
    if (user) {
      res.status(400).send({
        message: "Email is already in use!",
      });
      return;
    }
    console.log(`auth.controller->signup: user`, user);

    user = await db.user.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      verificationToken: randomTokenString(),
    });

    if (roleName) {
      const role = await db.role.findOne({
        where: {
          name: roleName,
        },
      });
      await user.setRole(role);
      res.send({ message: "User was registered successfully!" });
    } else {
      await user.setRole([3]);
      res.send({ message: "User was registered successfully!" });
    }

    console.log(
      `auth.controller->signup: verificationToken`,
      user.verificationToken
    );
    sendVerificationEmail(user, req.get("origin"));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user;
    if (email) {
      user = await db.user.findOne({
        where: {
          email: email,
        },
      });
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found" });
    }
    if (!user.verified) {
      return res.status(403).send({ message: "Account not activated!" });
    }

    console.log(`auth.controller->signin`, user.password, password);

    let passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    let token = generateJWTToken(user);

    let role = await user.getRole();
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: "ROLE_" + role.name.toUpperCase(),
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.body;
    console.log(`auth.controller->sendVerificationEmail: token`, token);

    let user = await db.user.findOne({
      where: {
        verificationToken: token,
      },
    });
    if (!user) {
      return res.status(400).send({ message: "token is not valid" });
    }
    user.verified = Date.now();
    user.verificationToken = null;
    await user.save();
    res.status(200).send({ message: "Verification success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

async function sendVerificationEmail(user, origin) {
  let message;
  if (origin) {
    const verifyUrl = `${origin}/verify-email?token=${user.verificationToken}`;
    message = `<p>Please click the below link to verify your email address:</p>
                 <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/user/verify-email</code> api route:</p>
                 <p><code>${user.verificationToken}</code></p>`;
  }

  try {
    console.log(`auth.controller->sendVerificationEmail: message`, message);
    await sendEmail({
      to: user.email,
      subject: "SignUp - Verification Email",
      html: `<h4>Verify Email</h4><p>Thanks for registering!</p>${message}`,
    });
  } catch (error) {
    console.log(`auth.controller->sendVerificationEmail: error`, error);
  }
}
