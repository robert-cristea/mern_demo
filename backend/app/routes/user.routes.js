const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { checkAuth, checkRole } = require("../middlewares/auth");
const { validate } = require("../middlewares/validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get("/api/user/", checkAuth, checkRole("admin"), controller.getAll);
  app.post(
    "/api/user/",
    validate("createUser"),
    checkAuth,
    checkRole("admin"),
    controller.create
  );
  app.get("/api/user/:id", checkAuth, checkRole("admin"), controller.retrieve);
  app.put("/api/user/:id", checkAuth, checkRole("admin"), controller.update);
  app.delete("/api/user/:id", checkAuth, checkRole("admin"), controller.delete);
};
