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
  const { username, email, password, role: roleName } = req.body;

  try {
    let user = await db.user.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    console.log(`user.controller->create`, user);
    if (user) {
      message = `User already exists`;
      return res.status(400).json({ message });
    }

    user = await db.user.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    if (roleName) {
      const role = await db.role.findOne({
        where: {
          name: roleName,
        },
      });
      await user.setRole(role);
    } else {
      await user.setRole([3]);
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
  const { username, email, password, role: roleName } = req.body;

  try {
    const userId = req.params.id;
    let user = await db.user.findByPk(userId);
    console.log(`user.controller->update`, user);

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

    if (roleName) {
      const role = await db.role.findOne({
        where: {
          name: roleName,
        },
      });
      await user.setRole(role);
    } else {
      await user.setRole([3]);
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
    console.log(`user.controller->delete`, user);

    await user.destroy();

    return res.status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
