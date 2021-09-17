const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
var passport = require("passport");

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

// Google OAuth login route
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

 // Google OAuth callback route
router.get(
    "/oauth2callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/",
    })
);

 // OAuth logout route
 router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


/*---------- Protected Routes ----------*/




module.exports = router;