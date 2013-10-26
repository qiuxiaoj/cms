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

exports.edit = function(req, res, next){
  var menu_id = sanitize(req.params.menu_id).trim();
  Menu.getMenuById(menu_id, function(err, docs){
    res.render('admin/menu/edit', {menu: docs});
  });
};

exports.update = function(req, res, next){
  var menu_id = sanitize(req.body.menu_id).trim();  
  var name = sanitize(req.body.name).trim();  
  var link = sanitize(req.body.link).trim();  
  var position = sanitize(req.body.position).trim();  
  Menu.update(menu_id, name, link, position, true, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/menu/list');
  });
};

exports.delete = function(req, res, next){
  var menu_id = sanitize(req.params.menu_id).trim();
  Menu.remove(menu_id, function(err){
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