const config = require("../config/config.js");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database, dialect, pool } = config.db;

  // create db if it doesn't already exist
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
    operatorsAliases: false,
    poll: {
      max: pool.max,
      min: pool.min,
      acquire: pool.acquire,
      idle: pool.idle,
    },
  });

  // init models and add them to the exported db object
  db.book = require("../models/book.model.js")(sequelize);
  db.user = require("../models/user.model.js")(sequelize);
  db.role = require("../models/role.model.js")(sequelize);

  db.user.belongsTo(db.role);

  // db.sequelize = sequelize;

  db.ROLES = ["admin", "vendor", "customer"];

  await sequelize.sync();
  if (process.env.NODE_ENV === "development") {
    let countRoles = await db.role.count({});
    if (countRoles === 0) {
      await seedDatabase();
    }
  }
}

async function seedDatabase() {
  let adminRole = await db.role.create({
    id: 1,
    name: "admin",
  });
  await db.role.create({
    id: 2,
    name: "vendor",
  });
  await db.role.create({
    id: 3,
    name: "customer",
  });

  let user = await db.user.create({
    username: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("password", 8),
  });
  await user.setRole(adminRole);
  user.verified = Date.now();
  await user.save();
}
