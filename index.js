// Express importing 

const express = require('express');
const port = 8888;
const app = express();

const expresslayout = require('express-ejs-layouts');
const bodyparse = require('body-parser');
const db = require('./config/mongoose');

//Connect-Flash
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

//Session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local');

const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

//Layout for EJS
app.use(expresslayout);
app.use(bodyParser.urlencoded({ extended: false}));

//setup the view engine

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));

//session cookies with mongo store

app.use(session({
    name:'habitTracker',
    secret: 'secretText',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create(    {
        mongoUrl:'mongodb+srv://ssathish0024:Sathiz08@main.ov8cjai.mongodb.net/Habit_Tracker?retryWrites=true&w=majority',
        // mongoUrl:'mongodb://0.0.0.0:27017/Habit_Tracker',
        autoRemove: 'disabled'
    
    },
    function(err){
        console.log(err ||  'Error on connect-mongodb');
    }
)

}))

//using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash middleware
app.use(flash());
app.use(flashMiddleware.setFlash);

//Express Router
app.use('/',require('./routes'));

//starting server 
app.listen(port,function(err){
    if(err){
        console.log("ERROR",err);
        return;
    }
    console.log('server is up and runnning on port',port);
})