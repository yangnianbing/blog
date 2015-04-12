var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var markdown = require("markdown-js");
var fs = require("fs");
var log = require("./src/log");



var routes = require('./src/routes/index');
var user = require('./src/routes/user');
var manage = require("./src/routes/manage");
var git = require("./src/routes/git");
var weixin = require("./src/routes/weixin");
var app = express();

//app.engine(".md",function(path, options, callback){
//	fs.readFile(path, 'utf-8', function(err, str){
//		if(err){
//			return callback(err);
//		}
//		str = markdown.parse(str).toString();
//		callback(null, str);
//	});
//});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,"limit":'10mb' }));
app.use(cookieParser());
app.use(session({secret:"ynb",resave:false,saveUninitialized:false}));
app.use(express.static(path.join(__dirname, 'public')));

//提供对搜索引擎的支持
app.use(function(req, res, next){
    log.info(req.ip);
    var fragment = req.query._escaped_fragment_;
    log.info("=========================="+fragment);
    if(!fragment) return next();
    log.info("--------------------------"+fragment);
    res.render("html/index");

});

app.use('/', routes);
app.use('/user', user);
app.use("/manage", manage);
app.use('/git', git);
app.use("/weixin", weixin);
//app.get("/blog/:title.html", function(req, res, next){
//	var urlPath = ['blog/', req.params.title, '.md'].join('');
//	var filePath = path.normalize("./views/"+urlPath);
//	fs.exists(filePath, function(exists){
//		if(!exists){
//			next();
//		}else{
//			res.render(urlPath, {layout: true});
//		}
//	});
//});

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
