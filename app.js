var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routeIndex = require('./app/routes/index');
var routeConcesionario = require('./app/routes/concesionario');
var routeVehiculo = require('./app/routes/vehiculo');


var mysql = require('mysql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routeIndex);
app.use('/concesionario', routeConcesionario);
app.use('/vehiculo', routeVehiculo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

