const LocalStrategy=require('passport-local').Strategy

const mongoose=require('mongoose')

const User=require('../models/users')



module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email',},(email,password,done)=>{
            User.findOne({
                email:email
            }).then(user=>{
                if(!user){
                    return done(null,false,{message: 'This Email is not registered!!'});
                }
                

                //now passwrd

                if (password == user.password) {
                    return done(null,user);
                }
                else{
                    return done(null,false, {message : 'Password Incorrect !'});
                }
            
            })
        })
    );
    passport.serializeUser(function(user, done) {
      return done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
};

