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
const settings = require('./routes/settings');
const upload = require('./routes/upload');
const usersProfiles = require('./routes/users_profiles');
const workFlows = require('./routes/workflows');
const stepTypes = require('./routes/step_types');
const steps = require('./routes/steps');
const admin = require('./routes/admin');
const socket = require('./routes/socket');
const trash = require('./routes/trash');
const folders = require('./routes/folders');
const favorites = require('./routes/favorites');

// run the socket.io server
const socketServer = require('./libs/socket-io/socket_server');

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
    defaultLocale: 'ar',
    queryParameter: 'lang',
    autoReload: true,
    directory: __dirname + '/config/locales/',
});

app.use(i18n.init);

app.use((req, response, next) => {
    const lang = req.query.lang;
    if (lang === "en") {
        i18n.setLocale("en");
    } else {
        i18n.setLocale('ar');
    }
    console.log(`\nlocale: ${i18n.getLocale()} `.green);
    next();
});


Object.defineProperty(global, '__', {
    value: i18n.__
});

// middleware to make 'user' available to all templates
app.use(function (req, response, next) {
    response.locals.user = req.session.user;
    console.log(req.session)
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/settings', settings);
app.use('/upload', upload);
app.use('/users_profiles', usersProfiles);
app.use('/workflows', workFlows);
app.use('/step_types', stepTypes);
app.use('/steps', steps);
app.use('/admin', admin);
app.use('/socket', socket);
app.use('/trash', trash);
app.use('/folders', folders);
app.use('/favorites', favorites);


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
