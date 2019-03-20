var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session')
const colors = require('colors');
const i18n = require('i18n');

const index = require('./routes/index');
const users = require('./routes/users');
const videos = require('./routes/videos');
const messages = require('./routes/messages');
const featuredVideos = require('./routes/featured_videos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//session
app.use(session({
    secret: 'edms',
    resave: false,
    saveUninitialized: true
}));

//set i18n
i18n.configure({
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    queryParameter: 'lang',
    autoReload: true,
    directory: __dirname + '/config/locales/',
});

app.use(i18n.init);

app.use((req, response, next) => {
  // TODO: to be used if we needed multi lang app
  // const lang = req.query.lang;
  // if (lang === "en") {
  //     i18n.setLocale("en");
  //   } else {
  //     i18n.setLocale('ar');
  //   }
  i18n.setLocale("en");
  console.log(`\nlocale: ${i18n.getLocale()} `.green);
  next();
});


Object.defineProperty(global, '__', {
    value: i18n.__
});

// middleware to make 'user' available to all templates
app.use(function (req, response, next) {
    response.locals.user = req.session.user;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/videos', videos);
app.use('/messages', messages);
app.use('/featured_videos', featuredVideos);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
