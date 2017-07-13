var express =  require('express');
var router = express.Router();

var request = require('request');
var passport = require('passport');
var promise = require('promise');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../model/dbconfig').user;


passport.use('signup', new LocalStrategy({
    passReqToCallback : true,
     usernameField: 'email',
     passwordField: 'password'
   },(req, email, password, done) => {
        process.nextTick(function() {
                db.findOne({ 'email': email }, (err, user) => {
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
                        db.create({
                          'email':req.param('email'),
                          'password':req.param('password'),
                          'username':req.param('username'),
                          'online':req.param('online')},
                        (err,user) => {
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
  usernameField: 'email',
  passwordField: 'password'
},(req, email, password, done) => {
        process.nextTick(function(){
            db.findOne({ 'email': email }, (err, user) => {
              console.log(user);
                if(err){
                    console.log('errr in login--',err);
                    return done(err);
                }
                else if(!user){
                    console.log('User not found with username--',username);
                    return done(null,false);
                }
                else if(user.password !== password) {
                    console.log('Invalid Password');
                    return done(null, false, 'Invalid Password' );
                }
                else{
                  console.log('user present');
                    db.findOneAndUpdate({ 'email': email },{ online: true })
                      .then((user) => db.find({ online: true }))
                      .then((result) => {
                        return done(null, { user: user, onlineUser: result }, 'Logged in successfull')
                      })
                      .catch((e) => {
                        return done(true);
                      })

                    // db.findOneAndUpdate({'username':username},{login:true},(err,user) =>{
                    //     if(err){
                    //         console.log('err in updating DB-',err);
                    //         throw err;
                    //     }
                    //     else{
                    //       db.find({ login: true })
                    //         .then((result) => {
                    //
                    //         })
                    //     }
                    //     console.log('Update successfull---',user);
                    // });
                    //
                    // return done(null,user);

                }

            });
        })
    })
)
module.exports = router;
