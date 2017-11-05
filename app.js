const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport   = require('passport');
const expressSession = require('express-session');
const db = require('./dbModels');


const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'todo',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'build')));

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

/*db.user.sync({force: true}).then(() => {
    // Table created
    return db.user.create({
        username: 'Dimon',
        password: '1234'
    });
});*/

app.use('/', index);
app.use('/users', users);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
});

app.use('/todo', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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