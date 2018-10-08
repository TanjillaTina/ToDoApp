var TodoModel=require('../models/todo');
var UserModel=require('../models/user-model');
var express = require('express');


//this fun is to check if,someone is logged-in in the page, if yes, redirect to profile page, else redirect to login page
//middleware function, that's gonna set in before profile page is redirected
var authCheck=(req,res,next)=>{
    if(!req.user){
      //if user isn't logged in 
      res.redirect('/auth/login');
 
    }
    else{
      //if logged in
     next();
    }
 };

 var profilePage= (req, res)=> {
  
var user=req.user;
var id=user._id;
  UserModel.findById(id).then(function(results){
            // console.log("Showing Todos \n ",results);

            let todos=results.tasks.filter((todo)=>{
                return !todo.done;
              
            });
           // console.log('Printing All todos  '+todos);
            
            let Donetodos=results.tasks.filter((todo)=>{
            return todo.done;
            });
            
          res.render('profile',{user:user, todos:todos,Donetodos:Donetodos});
 }
);
 

 ///res.render('profile',{user:user});
};

var insertTask=(req,res)=>{
  //res.render('index',{title:"Tina's Task"})
  //res.json(req.body);
  var user=req.user;
  console.log('Printing from here  User name:'+user.username+' main id '+user._id);

  var taskname=req.body.description;
///////////////////////////////////////

  let id=user._id;

 UserModel.findById(id).then((result)=>{
 // console.log(result);
 // res.render('index',{title:"Tina's Task"})
 result.tasks.push({taskname:taskname});
 result.save();
 res.redirect('/');
}).catch((err)=>{
console.log(err);
res.redirect('/');  
});

  };



 module.exports = {
  authCheck,
  profilePage,
  insertTask
  };

