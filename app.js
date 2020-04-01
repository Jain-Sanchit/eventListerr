const express=require('express')

const passport=require('passport')

const path=require('path')

const hbs=require('hbs')

const mongoose=require('mongoose')

const session=require('express-session')

hbs.registerPartials(path.join(__dirname,"/partials"))

const app=express();

require('./configs/passport')(passport);

const db=require('./configs/keys').mongoURI

mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("Mongo Connected"))
  .catch(err => {
    console.log(err);
  });

app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'Jain-Sanchit',
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))
app.use('/events',require('./routes/events'))

app.listen(3000,()=>{
    console.log('Running on port 3000');
    
})
