const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const config = require("./app/config/config.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

// JWT Passport setup
app.use(passport.initialize());
require("./app/config/passport");

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

// api routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/book.routes")(app);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
