const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
require('dotenv').config()



//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//set public folder
app.use(express.static(path.join(__dirname, 'public')))

//Set local variables
app.locals.errors = null;
//bodyparser
app.use(bodyparser.urlencoded({ extended: true }))


//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//express validator
  app.use(expressValidator({
      errorFormatter: function(param, msg, value){
          var namespace = param.split('.')
          , root = namespace.shift()
          , formParam = root

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']'
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        }
      }
  }))

//express messages middleware
app.use(require('connect-flash')())
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
})
const adminRoutes = require('./routes/adminpages')
app.use('/admin', adminRoutes)

//database
const db = process.env.MONGODB_URI
mongoose.connect(db)
.then( result => console.log("Connected to DB!"))
.catch(err => console.log(err))




//start server
let port = process.env.port || 3000
app.listen(port, () => {
    console.log('app running on port 3000')
})