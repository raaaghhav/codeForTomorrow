const express = require("express");
const router = express.Router();

const controller = require("././../controller/auth/authController");
const tokenmiddleware = require("./../middleware/middleware");

router.get("/", (req, res) => {
  return res.json("server health is good");
});

router.post("/signup", controller.signUp);

router.post("/login", controller.login);

router.get("/list", tokenmiddleware, controller.list);

module.exports = router;
