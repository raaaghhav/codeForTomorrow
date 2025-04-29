const joi = require("joi");

module.exports.signUpValidation = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  deviceId: joi.string().required(),
});

module.exports.loginValidation = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  deviceId: joi.string().required(),
});
