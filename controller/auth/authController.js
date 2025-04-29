const authService = require("./.../../../../services/authService");
const constants = require("./../../constants/en");
const bcrypt = require("bcrypt");
const { tokenGenerate, verify } = require("./.././../utilities/jwtUtilities");
const UUID = require("uuid-int");
const {
  signUpValidation,
  loginValidation,
} = require("./../../validations/validation");

const authFunction = {
  signUp: async (req, res) => {
    let response = {};
    try {
      let data = req.body;
      let { name, email, password, deviceId } = data;

      let validation = signUpValidation.validate(data);

      if (validation.error) {
        res.statusCode = constants.statusCode.INTERNAL_SERVER_ERROR;
        response.errorMessage = validation.error;

        return res.json(response);
      }
      /**check email */
      let emailCheck = await authService.findOne({ email: email });
      if (emailCheck) {
        res.statusCode = constants.statusCode.ALREADY_EXIST;
        response.errorMessage = constants.message.EMAIL_ALREADY_EXIST;
        return res.json(response);
      }

      let nameCheck = await authService.findOne({ name: name });

      if (nameCheck) {
        res.statusCode = constants.statusCode.ALREADY_EXIST;
        response.errorMessage = constants.message.NAME_ALEARDY_TAKEN;
        return res.json(response);
      }

      const id = Math.random();
      const generator = UUID(id);

      const publicId = generator.uuid();
      let hashPassword = await bcrypt.hash(password, 10);

      let signUpData = {
        name: name,
        publicId: publicId,
        email: email,
        password: hashPassword,
        deviceId: deviceId,
      };

      /**create user*/
      let result = await authService.createUser(signUpData);
      if (!result) {
        res.statusCode = constants.statusCode.INTERNAL_SERVER_ERROR;
        response.errorMessage = constants.message.SOMETHING_WENT_WRONG;
        return res.json(response);
      }

      let tokenData = {
        id: result.publicId,
        email: email,
      };
      let token = await tokenGenerate(tokenData);

      res.statusCode = constants.statusCode.CREATE;
      response.message = constants.message.SIGNUP_SUCCESS;
      response.accessToken = token;
      return res.json(response);
    } catch (error) {
      console.log(error);
      res.statusCode = constants.statusCode.INTERNAL_SERVER_ERROR;
      response.errorMessage = constants.message.SOMETHING_WENT_WRONG;
      return res.json(response);
    }
  },

  login: async (req, res) => {
    let response = {};
    try {
      let data = req.body;
      let { email, password, deviceId } = data;

      let validation = loginValidation.validate(data);
      if (validation.error) {
        res.statusCode = constants.statusCode.INTERNAL_SERVER_ERROR;
        response.errorMessage = validation.error;
        return res.json(response);
      }
      let userCheck = await authService.findOne({ email: email });
      if (!userCheck) {
        res.statusCode = constants.statusCode.UNAUTHORIZED;
        response.errorMessage = constants.message.EMAIL_DOES_NOT_EXIST;
        return res.json(response);
      }

      let match = bcrypt.compare(password, userCheck.password);
      if (!match) {
        res.statusCode = constants.statusCode.UNAUTHORIZED;
        response.errorMessage = constants.message.INVALID_CREDENTIALS;
        return res.json(response);
      }

      let tokenData = {
        email: userCheck.email,
        id: userCheck.publicId,
      };

      let token = await tokenGenerate(tokenData);
      updateData = {
        deviceId: deviceId,
        isLogin: "yes",
      };

      await authService.update(updateData, userCheck.id);
      res.statusCode = constants.statusCode.SUCCESS;
      response.message = constants.message.LOGIN_SUCCESS;
      response.accessToken = token;
      return res.json(response);
    } catch (error) {
      console.log(error);
      res.statusCode = constants.statusCode.INTERNAL_SERVER_ERROR;
      response.errorMessage = constants.message.SOMETHING_WENT_WRONG;
      return res.json(response);
    }
  },

  logout: async (req, res) => {
    try {
      const session = req.session.id;
      let updateData = {
        isLogin: "no",
      };
      await authService.update(updateData, userCheck.id);
    } catch (error) {
      console.log(error);
    }
  },

  list: async (req, res) => {
    let response = {};
    try {
      let limit = req.params.limit || 10;
      let offset = req.params.limit || 0;
      let orderby = req.params.orderby || "DESC";

      let params = {
        limit,
        offset,
        orderby,
      };
      let result = await authService.getList(params);

      res.statusCode = constants.statusCode.SUCCESS;
      response.result = result;
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authFunction;
