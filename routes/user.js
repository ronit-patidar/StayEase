const express = require("express");
const router = express.Router();
const wrapAsync = require('../util/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");
const userController = require('../controller/users.js');
router.get('/signup',userController.renderSignupform)

router.post(
  "/signup",  
  wrapAsync(userController.signup)
);

router.get("/login",userController.renderloginform);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout",userController.logout)


module.exports = router;