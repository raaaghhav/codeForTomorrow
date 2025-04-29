const constants = {
  statusCode: {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    REQUIRED: 406,
    ALREADY_EXIST: 404,
    CREATE: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
  },

  message: {
    SIGNUP_SUCCESS: "user signup successfully",
    LOGIN_SUCCESS: "user login successfully",
    EMAIL_ALREADY_EXIST: "email already exists",
    TOKEN_REQUIRED: "token required for authentication",
    NAME_ALEARDY_TAKEN: "username already taken",
    SOMETHING_WENT_WRONG: "something went wrong",
    USER_NOT_FOUND: "user not Found",
    EMAIL_DOES_NOT_EXIST: "Email does not exist",
    INVALID_CREDENTIALS: "Invalid Credentials either password or emial",
  },
};
module.exports = constants;
