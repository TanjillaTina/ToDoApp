var express = require('express');
var router = express.Router();
const passport=require('passport');
const authController=require('../controllers/authcontroller');


/* GET users listing. */

//auth login
router.get('/login',authController.loginPage);

//auth logout
router.get('/logout',authController.logOut);

//// auth with google
router.get('/google', passport.authenticate('google',{
  scope:['profile']
}));


//callback route for gogle to redirect to
router.get('/google/redirect',passport.authenticate('google'),authController.RedirectProfilePage);


module.exports = router;
