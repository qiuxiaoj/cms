var Menu = require('../proxy').Menu;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.new = function(req, res, next){
  res.render('admin/menu/new');
};

exports.create = function(req, res, next){
  var name = sanitize(req.body.name).trim();
  var link = sanitize(req.body.link).trim();
  var position = sanitize(req.body.position).trim();
  Menu.newAndSave(name, link, position, true, function(err, menu){
  	if (err) {
      return next(err);
    }
    res.redirect('admin/menu/list');
  });	
};

exports.list = function(req, res, next){
  var page = sanitize(req.query.page || '1').trim();
  var render = function (menus, total) {
  	res.render('admin/menu/list', {menus: menus, total: total});
  };
  var proxy = EventProxy.create('menus', 'total', render);
  proxy.fail(next);

  Menu.paginate(page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('menus', docs);
    proxy.emit('total', total);
  }));
};