require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");  

require("./mvc/models/db");

const indexRouter = require('./mvc/routes/index');
const usersRouter = require('./mvc/routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'mvc','views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());     

app.use("/", (req, res, next) =>{
  res.header('Access-Control-Allow-Origin','http://localhost:3000','https://alphashop-1f940.web.app','https://alphashop.herokuapp.com','*');
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type,Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set('Access-Control-Allow-Credentials', 'true');
  
  next();
});




app.use('/', indexRouter);
app.use('/api', usersRouter);

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
