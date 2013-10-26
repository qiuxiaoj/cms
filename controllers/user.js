var User = require('../proxy').User;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.list = function (req, res, next) {
  var page = sanitize(req.query.page || '1').trim();
  var render = function (users, total) {
    res.render('admin/user/list', {users: users, total: total});
  };
  var proxy = EventProxy.create('users', 'total', render);
  proxy.fail(next);
  User.paginate(page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('users', docs);
    proxy.emit('total', total);
  }));		  
};

exports.new = function(req, res, next){
  res.render('admin/user/new');
};

exports.create = function(req, res, next){
  var name = sanitize(req.body.name).trim();
  var loginname = sanitize(req.body.loginname).trim();
  var email = req.body.email;
  var pass = sanitize(req.body.pass).trim();
  var is_admin = req.body.is_admin ? true : false;
  User.newAndSave(name, loginname, pass, email, is_admin, true, function(err, user){
    if (err) {      
      return next(err);
    }
    res.redirect('admin/user/list');
  });
};

exports.edit = function(req, res, next){
  var user_id = sanitize(req.params.user_id).trim();
  User.getUserById(user_id, function(err, doc){
    if (err) {      
      return next(err);
    }
    res.render('admin/user/edit', {user: doc});
  });
};

exports.update = function(req, res, next){
  var user_id = sanitize(req.body.user_id).trim();
  var name = sanitize(req.body.name).trim();
  var loginname = sanitize(req.body.loginname).trim();
  var email = req.body.email;
  var pass = sanitize(req.body.pass).trim();
  var is_admin = req.body.is_admin ? true : false;
  User.update(user_id, name, loginname, pass, email, is_admin, true, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/user/list');
  });
};

exports.delete = function(req, res, next){
  var user_id = sanitize(req.params.user_id).trim();
  User.remove(user_id, function(err){
    if (err) {
      return next(err);
    }
    res.redirect('admin/user/list');
  });
};

exports.createAdmin = function(req, res, next){
  User.newAndSave('系统管理员', 'admin', '00000000', 'admin@admin1.com', true, true, function(err, user){
  	if (err) {
    	console.log(err);
    	res.send('系统管理员创建失败.');
    	return;
    }
  	res.send('系统管理员创建成功.');
  });
};
