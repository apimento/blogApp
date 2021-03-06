//after npm i express
const express = require("express");
//after npm i mongoose
const mongoose = require ("mongoose");   
//after npm i dotenv 
//when in group.. each member has unique env files
require('dotenv').config() 
//after npm i connect-flash 
const flash = require("connect-flash");

//after npm i express-ejs-layouts
const expressLayouts = require("express-ejs-layouts"); 

//port location hidden here.. moved into .env
const PORT = process.env.PORT;

const app = express();    

//look for statioc files (CSS,JS,images,audio etc) 
app.use(express.static("public"));

// const expressLayouts=require('express-ejs-layouts');

app.use(expressLayouts); 

//after npm i express-session
let session = require('express-session'); 
let passport = require("./help/ppConfig"); 


app.use(session({
    //value kept in .env
   secret: process.env.secret, 
   //if new session, save session info in browser
   saveUninitialized: true, 
   //do not save if modified
   resave: false,  
   //cookies will expire after: .env
   cookie: {maxAge: 360000}
})) 

app.use(passport.initialize()); 
app.use(passport.session());  

app.use(flash());

//sharing all info with all pages 
app.use(function(req, res, next){ 
    //locals shares info with all pages
    res.locals.currentUser = req.user; 
    res.locals.alerts = req.flash();
    next();
})

//anything used by routes must be before this
//import route
const indexRoute = require('./routes/index');  
const articlesRoute = require('./routes/article');  
const authorRoutes = require("./routes/author"); 
const authRoutes = require("./routes/auth");

//mount route
app.use('/', indexRoute);  
app.use('/', articlesRoute); 
app.use('/', authorRoutes); 
app.use('/', authRoutes);

//nodejs to look in views folder for all ejs files  
//will always look for folder called "views" (convention)
app.set("view engine", "ejs");

//connection string cut and pasted to .env
mongoose.connect(process.env.mongoDBURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
},
()=> { 
    console.log("mongodb connected successfully!");
});

app.listen(PORT, ()=> console.log(`App is running on ${PORT}`)); 

// app.get("/a",(req,res) => { 
//     res.render("home/another");
// });