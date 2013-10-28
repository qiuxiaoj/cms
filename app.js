
/**
 * Module dependencies.
 */

var express = require('express')
  , less = require('less-middleware')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , settings = require('./settings')
  , flash = require('connect-flash')
  , fs = require('fs')
  , helpers = require('./libs/helpers')
  , accessLog = fs.createWriteStream('logs/access.log', {flags: 'a'})
  , errorLog = fs.createWriteStream('logs/error.log', {flags: 'a'});

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.logger({stream: accessLog}));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/upload/tmp' }));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret
}));
app.use(helpers.helpers('广发行'));
app.use(require('./controllers/sign').auth_user);
app.use(app.router);
app.use(less({
  dest: __dirname + '/public/stylesheets',
  src: __dirname + '/assets/less',
  prefix: '/stylesheets',
  paths  : [path.join(__dirname, 'assets', 'less')],
  compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app);