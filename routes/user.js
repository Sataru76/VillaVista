const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
let { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controller/user.js");


router.route("/signup")
    .get(usercontroller.rendersignUpForm)
    .post(wrapAsync(usercontroller.signUpUser))



router.route("/login")
    .get( usercontroller.renderloginForm)
    .post(
         saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        usercontroller.login
    )

router.get("/logout", usercontroller.logout);

// Google OAuth routes
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      req.flash("success", "Welcome to Wanderlust via Google!");
      res.redirect("/listings");
    }
  );


module.exports = router;
