const db = require("./app/db");
const bcrypt = require("bcryptjs");

// const User = db.user;
// const Role = db.role;
// const Op = db.Op;

console.log(`seeder`, db, bcrypt);

async function createRoles() {
  await db.role.create(
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    }
  );
}

createRoles();
