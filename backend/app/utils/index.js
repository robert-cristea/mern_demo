const config = require("../config/config.js");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

sgMail.setApiKey(config.sengridKey);

exports.sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    sgMail.send(mailOptions, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

exports.generateJWTToken = (user) => {
  const { id, email, username } = user;
  const { jwt: jwtConfig } = config;
  const secret = jwtConfig.secret || "JWT_SECRET_KEY";
  const expiresIn = jwtConfig.expiry || 86400;
  const payload = { id, email, username };

  return jwt.sign(payload, secret, { expiresIn });
};

exports.randomTokenString = () => {
  return crypto.randomBytes(40).toString("hex");
};
