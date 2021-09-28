const config = require("../config/config.js");
const mysql = require("mysql2/promise");
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

  db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id",
  });
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id",
  });

  //   db.sequelize = sequelize;

  db.ROLES = ["user", "admin"];

  // sync all models with database
  await sequelize.sync();
}
