var utils = require('../libs/utils');
var settings = require('../settings');
var User = require('../proxy').User;
var sanitize = require('validator').sanitize;

/**
 * define some page when login just jump to the home page
 * @type {Array}
 */
var notJump = [
  '/active_account', //active page
  '/reset_pass',     //reset password page, avoid to reset twice
  '/signup',         //regist page
  '/search_pass'    //serch pass page
];

/**
 * Show user login page.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
exports.showLogin = function (req, res) {
  if (req.session.user) {
  	res.redirect(req.session.user.is_admin ? '/admin/index' : '/');
  }	
  res.render('sign/signin');
};

exports.login = function (req, res, next) {
  var loginname = sanitize(req.body.name).trim();
  var pass = sanitize(req.body.pass).trim();

  if (!loginname || !pass) {
    return res.render('sign/signin', { error: '信息不完整。' });
  }

  User.getUserByLoginName(loginname, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('sign/signin', { error: '这个用户不存在。' });
    }
    pass = utils.md5(pass);
    if (pass !== user.pass) {
      return res.render('sign/signin', { error: '密码错误。' });
    }
    if (!user.active) {
      return res.render('sign/signin', { error: '此帐号还没有被激活。' });
    }
    // store session cookie
    if(req.body.rememberme){
    	gen_session(user, res);
    }
    
    req.session.user = user;
    res.redirect(user.is_admin ? '/admin/index' : '/');
  });
};

// sign out
exports.signout = function (req, res, next) {
  req.session.destroy();
  res.clearCookie(settings.auth_cookie_name, { path: '/' });
  res.redirect('/signin');
};

function gen_session(user, res) {
  var auth_token = utils.encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, settings.cookieSecret);
  res.cookie(settings.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
};

// auth_user middleware
exports.auth_user = function (req, res, next) {
  if (req.session.user) {
      res.locals.current_user = req.session.user;
      return next();
  } else {
    var cookie = req.cookies[settings.auth_cookie_name];
    if (!cookie) {
      return next();
    }

    var auth_token = utils.decrypt(cookie, settings.cookieSecret);
    var auth = auth_token.split('\t');
    var user_id = auth[0];
    User.getUserById(user_id, function (err, user) {	
      if (err) {
        return next(err);
      }
      if (user) {
	      req.session.user = user;
	      res.locals.current_user = req.session.user;
      }
      return next();
    });
  }
};

