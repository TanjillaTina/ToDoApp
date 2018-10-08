var TodoModel=require('../models/todo');
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
  
 res.render('profile',{user:req.user});
};

var insertTask=(req,res)=>{
  //res.render('index',{title:"Tina's Task"})
  //res.json(req.body);
  user:req.user;
  let newTodo=new TodoModel({description:req.body.description});

  newTodo.save().then((result)=>{
      console.log(result);
     // res.render('index',{title:"Tina's Task"})
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

