const express = require("express");

const router = express.Router();

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../configs/auth");
const event = require("../models/events");


router.get("/", ensureAuthenticated, (req, res,next) => {
  

    event.find({},function(err,eventArr){
      console.log(eventArr);
      res.render("events", { eventArr});
    })
    
    

});



router.get('/new',ensureAuthenticated,(req,res)=>{
  const listedUser=req.user;
  res.render('regEvent',{listedUser});
})

router.get("/:id",ensureAuthenticated, (req, res, next) => {
  event.findById(req.params.id, function(err, event) {
    res.render("eventDetails", { event: event });
  });
});
router.post('/new',(req,res)=>{
  const {name,category,venue,eventDate,eventTime,description}=req.body;
  
  
  const newEvent= new event({name,category,venue,eventDate,eventTime,description});
  newEvent.listedUser=req.user.name;
  
  newEvent.save().then(events=>{
    console.log(events);
    res.redirect('/events/')
  }).catch(err=>{
    console.log(err);
    
  })
})

module.exports=router;