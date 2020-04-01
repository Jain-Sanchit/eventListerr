const express=require('express')
const router=express.Router();
const passport=require('passport')

const User=require('../models/users')
const {forwardAuthenticated,ensureAuthenticated}=require('../configs/auth')



router.get('/register',forwardAuthenticated,(req,res)=>{
    res.render('signup');
})

router.get('/login',forwardAuthenticated,(req,res)=>{
    res.render('signin');
})

router.get('/profile',ensureAuthenticated,(req,res)=>{

    res.render('profile',{
        user:req.user
    })
})

router.post('/register',(req,res)=>{
    const {name , email , password,password2}=req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2
      });
    }
    else{
        User.findOne({email:email}).then(user=>{
            if(user){
                errors.push({ msg: "Email already exists" });
                res.render("register", {
                  errors,
                  name,
                  email,
                  password,
                  password2
                });
            }
            else{
                const newUser = new User({
                  name,
                  email,
                  password
                });

                newUser.save().then(user=>{
                    console.log(user);
                    res.redirect('/users/login')
                })
                .catch(err=>{
                    console.log(err);
                    
                })
            }
        })
    }


})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);

})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/users/login')
});

module.exports=router;