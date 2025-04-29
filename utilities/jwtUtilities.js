const jwt = require("jsonwebtoken");

module.exports.tokenGenerate = async (data) => {
  try {
    let result = await jwt.sign({ data }, "secret");

    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error, "error while generating the token");
  }
};

module.exports.verify = async (data) => {
  try {
    let result = await jwt.verify(data, "secret");
    return result;
  } catch (error) {
    console.log(error, "error while verifying the data");
  }
};
