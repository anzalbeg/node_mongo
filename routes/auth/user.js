var express =  require('express');
var router = express.Router();

var request = require('request');
var passport = require('passport');
var promise = require('promise');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../model/dbconfig').user;


passport.use('signup', new LocalStrategy({
    passReqToCallback : true,
     usernameField: 'username',
     passwordField: 'password'
    },(req,username,password,done) => {
        process.nextTick(function() {
                db.findOne({'username':username},(err,user) => {
                    if(err){
                        console.log('Error in SignUp:'+err);
                        return done(err);
                    }
                    //already user
                    else if(user){
                        console.log('User already Exits');
                        return done(null,false);
                    }
                    else{
                        // for new user
                        db.create({'email':req.param('email'),'passport':req.param('password'),'username':req.param('username'),'login':req.param('login')},(err,user) => {
                            if(err){
                                console.log("Error in Creating the DB",err);
                                throw err;
                            }
                            else{
                                console.log('User Registration Success');
                                return done(null,user);
                            }
                        });
                    }
                });
         });
    })
);


passport.use('signin',new LocalStrategy({
  passReqToCallback :true,
  'usernameField':'username',
  'passwordField':'passport'
    },(req,username,password,done) => {
        process.nextTick(function(){
            db.findOne({'username':username},(err,user) => {
                if(err){
                    console.log('errr in login--',err);
                    return done(err);
                }
                else if(!user){
                    console.log('User not found with username--',username);
                    return done(null,false);
                }
                else if(!isValidPassword(user,password)){
                    console.log('Invalid Password');
                    return done(null,false,req.flash('message','Invalid Password'));
                }
                else{
                    db.findOneAndUpdate({'username':username},{login:true},(err,user) =>{
                        if(err){
                            console.log('err in updating DB-',err);
                            throw err;
                        }
                        else{

                        }
                        console.log('Update successfull---',user);
                    });
                
                    return done(null,user);

                }
                
            });
        })
    })
)
module.exports = router;