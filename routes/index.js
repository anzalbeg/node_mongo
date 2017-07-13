var express = require('express');
var router = express.Router();
var db = require('./model/dbconfig').user;
var passport = require('passport');
require('./auth/user')
/* GET home page. */

router.get('/getalluser',(req,res,next) =>{
  db.find({},(err,user) =>{
    if(err){
        console.log('error occured ---',err)
      res.send("error occured")
      throw err;
    }
    else{
        console.log(user)
      res.send(user);
    }
  });
});

router.post('/register',(req,res,next) => {
  passport.authenticate('signup',(err,user,info) => {
    if(err){
      console.log('errr---',err);
      return next(err);
    }
    if(!user){
      console.log('Failed---',user);
      res.send('signup Failed');
    }
    if(user){
      console.log('success-',user);
      res.json(user);
    }
  })(req,res,next);
});


router.post('/login',(req,res,next) => {
  passport.authenticate('signin',(err, user, info) => {
    if(err){
      return next(err);
    }
    if(!user){
      console.log('user already exits');
      res.send('user already exits');
    }
    if(user){
      console.log('user login success');
      res.json({
        user: user.user,
        onlineUser: user.onlineUser
      })
    }
  })(req, res, next);
});
module.exports = router;
