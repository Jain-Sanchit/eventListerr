const express=require('express')

const router=express.Router();

const {ensureAuthenticated,forwardAuthenticated}=require('../configs/auth');
const event=require('../models/events');


router.get('/',forwardAuthenticated,(req,res,next)=>{
    res.render('home');
});

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user:req.user
    })
})

router.get('/welcome',forwardAuthenticated,(req,res,next)=>{
    res.render('welcome')
})

module.exports=router;