var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passort = require('passport');
var expressSession = require('express-session');
var mongoose = require('mongoose');

var index = require('./routes/index');
require('./routes/model/dbconfig');

var app = express();


mongoose.Promise = global.Promise;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('index', __dirname + '/views');
  // create a new Temaplting engine
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(expressSession({secret:'mySecretKey'}));
app.use(passort.initialize());
app.use(passort.session());



app.use('/', index);

app.get('/',(req,res,next) => {
  res.render('../views/index.html');
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
