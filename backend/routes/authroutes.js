// const express = require("express");
// const { register, login, forgotPassword } = require("../controllers/authcontroller");
// const router = express.Router();
// const authcontroller = require("../controllers/authcontroller");

// router.post("/register", register);
// router.post("/login", login);
// router.post("/forgot", forgotPassword);
// router.post("/google", authcontroller.googleLogin);

// module.exports = router;



const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

router.post("/google", authController.googleLogin);

module.exports = router;
