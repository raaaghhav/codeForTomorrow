const jwt = require("jsonwebtoken");
const constants = require("./../constants/en");
const { tokenGenerate, verify } = require("./../utilities/jwtUtilities");

const tokenmiddleware = async (req, res, next) => {
  let token = req.headers.authorization || req.headers.Authorization;
  if (!token) {
    return res.json({ message: constants.message.TOKEN_REQUIRED });
  }

  let newTok = token.trim().split(" ");

  let decoded = await verify(newTok[1]);

  console.log(decoded, ">>>>>>>>>>>>>>decoded");
  if (!decoded) {
    res.json({ message: "UNAUTHORIZED" });
  } else {
    next();
  }
};

module.exports = tokenmiddleware;
