const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require("../db");

// Auth
const checkAuth = passport.authenticate("jwt", { session: false });

// Role
const checkRole = (roles) => async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  if (typeof roles === "string") {
    roles = [roles];
  }
  console.log("middleware->checkRole: req.user", req.user);
  console.log("middleware->checkRole: roles", roles);

  const user = await db.user.findByPk(req.user.id);
  let userRoles = await user.getRoles();
  let arr = userRoles.map((role) => role.name);

  console.log("middleware->userRoles: userRoles", userRoles);

  if (!user || (roles.length && !roles.some((r) => arr.includes(r)))) {
    // account no longer exists or role not authorized
    return res.status(401).json({ message: "Unauthorized" });
  }

  // authentication and authorization successful
  req.user.role = userRoles;
  next();
};

module.exports = {
  checkAuth,
  checkRole,
};
