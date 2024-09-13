const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', (req,req,next) => {
console.log('login request received');
next()
},  usersCtrl.login);




/*---------- Protected Routes ----------*/




module.exports = router;