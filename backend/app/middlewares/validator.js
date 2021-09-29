const { check, body, buildCheckFunction } = require("express-validator");
const db = require("../db");

module.exports.validate = (method) => {
  switch (method) {
    // Auth
    case "signup": {
      return [
        check("username", "username is required").not().isEmpty(),
        check("email", "email is not valid").isEmail(),
        check("password", "password is not valid").isLength({ min: 8 }),
        check("role", "role is not valid")
          .optional()
          .isIn(["customer", "vendor", "admin"]),
      ];
    }
    case "signin": {
      return [
        check("email", "email is not valid").optional().isEmail(),
        check("username", "username is not valid")
          .optional()
          .isLength({ min: 4 }),
        check(
          "password",
          "Please enter a password with 8 or more characters"
        ).isLength({ min: 8 }),
      ];
    }

    case "profile": {
      return [
        check("username", "username name is required").not().isEmpty(),
        check("email", "email name is required").isEmail(),
      ];
    }
    case "changePassword": {
      return [
        check("currentPassword", "Current password is required")
          .not()
          .isEmpty(),
        check(
          "newPassword",
          "Please enter a password with 8 or more characters"
        )
          .isLength({ min: 8 })
          .custom((value, { req, loc, path }) => {
            if (value !== req.body.confirmPassword) {
              throw new Error("Passwords don't match");
            } else {
              return value;
            }
          }),
      ];
    }

    // User
    case "createUser": {
      return [
        check("username", "username is required").not().isEmpty(),
        check("email", "email is not valid").isEmail(),
        check("password", "password is invalid").isLength({ min: 8 }),
        check("role", "role is not valid")
          .optional()
          .isIn(["customer", "vendor", "admin"]),
      ];
    }
    case "updateUser": {
      return [
        check("username", "username is required").not().isEmpty(),
        check("email", "email is not valid").isEmail(),
        check("role", "role is not valid")
          .optional()
          .isIn(["customer", "vendor", "admin"]),
      ];
    }
  }
};
