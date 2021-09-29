const controller = require("../controllers/auth.controller");
const { validate } = require("../middlewares/validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post("/api/auth/signup", validate("signup"), controller.signup);
  app.post("/api/auth/signin", validate("signin"), controller.signin);
  app.post(
    "/api/auth/verify-email",
    validate("verifyEmail"),
    controller.verifyEmail
  );
};
