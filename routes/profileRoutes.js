var express = require('express');
var router = express.Router();

const TodoModel=require('../models/todo');
const UserModel=require('../models/user-model');
const ProfileController=require('../controllers/profile');


router.get('/',ProfileController.authCheck,ProfileController.profilePage);

/* GET users listing. */


module.exports = router;
