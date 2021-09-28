const config = require("../config/config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { Op, Sequelize } = require("sequelize");
const { generateJWTToken } = require("../utils");

// const User = db.user;
// const Role = db.role;
exports.signup = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, roles } = req.body;
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

    user = await db.user.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    if (roles) {
      const array = await db.role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });
      await user.setRoles(array);
      res.send({ message: "User was registered successfully!" });
    } else {
      await user.setRoles([1]);
      res.send({ message: "User was registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user;
    // if (username) {
    //   user = await db.user.findOne({
    //     where: {
    //       username: username,
    //     },
    //   });
    // }
    if (email) {
      user = await db.user.findOne({
        where: {
          email: email,
        },
      });
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    console.log(`@@@user`, user, password);

    let passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    console.log(`@user->passwordIsValid`, passwordIsValid);

    let token = generateJWTToken(user);

    let authorities = [];
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
