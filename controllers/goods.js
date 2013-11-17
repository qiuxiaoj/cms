var Goods = require('../proxy').Goods;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.new = function(req, res, next){
  res.render('admin/goods/new');
};

exports.create = function(req, res, next){
  var name = sanitize(req.body.name).trim();
  var desc = req.body.desc;
  var content = req.body.content
  var image_url = req.body.image_url
  var brand_id = sanitize(req.body.brand_id).trim();
  var tag = req.body.tags || '';
  if(tag){tag = tag.join(',')};
  Goods.newAndSave(name, desc, content, image_url, brand_id, tag, function(err, cat){
  	if (err) {
      return next(err);
    }
    res.redirect('admin/goods/list');
  });
};

exports.edit = function(req, res, next){
  var goods_id = sanitize(req.params.goods_id).trim();
  Goods.getGoodsById(goods_id, function(err, docs){
    res.render('admin/goods/edit', {goods: docs});
  });
};

exports.update = function(req, res, next){
  var goods_id = sanitize(req.body.goods_id).trim();
  var name = sanitize(req.body.name).trim();
  var desc = req.body.desc;
  var content = req.body.content;
  var image_url = req.body.image_url;
  var brand_id = sanitize(req.body.brand_id).trim();
  var tag = req.body.tags || '';
  if(tag){tag = tag.join(',')};
  Goods.update(goods_id, name, desc, content, image_url, brand_id, true, tag, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/goods/list');
  });
};

exports.update_type = function(req, res, next){
  var type = sanitize(req.params.type).trim();
  var goods_ids = req.body.items;
  Goods.update_type(goods_ids, type, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.json({'success': 0});
  });
};

exports.delete = function(req, res, next){
  var goods_id = sanitize(req.params.goods_id).trim();
  Goods.remove(goods_id, function(err){
    if (err) {
      return next(err);
    }
    res.redirect('admin/goods/list');
  });
};

exports.list = function(req, res, next){
  var page = sanitize(req.query.page || '1').trim();
  var query = {};
  if(req.params.brand_id) query.brand_id = req.params.brand_id;
  var render = function (goods, total) {
    res.render('admin/goods/list', {goods: goods, total: total});
  };
  var proxy = EventProxy.create('goods', 'total', render);
  proxy.fail(next);

  Goods.paginate(query, page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('goods', docs);
    proxy.emit('total', total);
  }));
};