module.exports={
    forwardAuthenticated: function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/dashboard')
    },
    ensureAuthenticated: function(req,res,next){
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect("/users/login");
    }
};