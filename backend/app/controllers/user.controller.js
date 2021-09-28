const db = require("../db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");

exports.getAll = async function (req, res) {
  try {
    let users = await db.user.findAll({});
    return res.status(200).json(users);
  } catch (error) {
    logger.error(err);
    return handleError(res, req, 500, err);
  }
};

exports.retrieve = async function (req, res) {
  const userId = req.params.id;
  console.log("userId", userId);
  try {
    let user = await db.user.findByPk(userId);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.create = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, roles } = req.body;

  try {
    let user = await db.user.findAll({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    console.log(`user->create`, user);
    if (user.length !== 0) {
      message = `User already exists.`;
      return res.status(400).json({ message });
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
    } else {
      await user.setRoles([1]);
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, roles } = req.body;

  try {
    const userId = req.params.id;
    let user = await db.user.findByPk(userId);
    console.log(`user->update`, user);

    user.username = username;
    user.email = email;
    user.password = bcrypt.hashSync(password, 8);
    await user.save();

    // user = await db.user.update(
    //   {
    //     username: username,
    //     email: email,
    //     password: bcrypt.hashSync(password, 8),
    //   },
    //   {
    //     where: {
    //       id: userId,
    //     },
    //   }
    // );

    if (roles) {
      const array = await db.role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });
      await user.setRoles(array);
    } else {
      await user.setRoles([1]);
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async function (req, res) {
  try {
    const userId = req.params.id;
    let user = await db.user.findByPk(userId);

    if (!user) {
      message = `User with id ${userId} not found!`;
      return res.status(400).json({ message });
    }
    console.log(`user->delete`, user);

    await user.destroy();

    return res.status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
