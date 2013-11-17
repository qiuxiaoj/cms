var Article = require('../proxy').Article;
var Goods = require('../proxy').Goods;
var Brand = require('../proxy').Brand;
var settings = require('../settings');
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.index = function (req, res, next) {
  var render = function (news) {
  	res.render('index', {news: news});
  };

  var proxy = EventProxy.create('news', render);
  proxy.fail(next);

  Article.paginate('525ab43127723bf64a000002', 1, 10, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('news', docs);
  }));
};

exports.goods_detail = function(req, res, next){
  var goods_id = sanitize(req.params.goods_id).trim();
  Goods.getGoodsById(goods_id, function(err, doc){
    if (err) {
      return next(err);
    }
    res.render('goods/detail', {goods: doc});
  });
};

exports.goods_by_brand = function(req, res, next){
  var brand_id = sanitize(req.params.brand_id).trim();
  var page = sanitize(req.query.page || '1').trim();
  var query = {brand_id: brand_id};

  if(req.params.tag) query.tag = req.params.tag; 

  var render = function (goods_list, brand, total) {
    res.render('goods/list', {goods_list: goods_list, brand: brand, total: total});
  };

  var proxy = EventProxy.create('goods_list', 'brand', 'total', render);
  proxy.fail(next);

  Goods.paginate(query, page, 20, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('goods_list', docs);
    proxy.emit('total', total);
  }));
  Brand.getBrandById(brand_id, proxy.done('brand'));
};

exports.goods_by_type = function(req, res, next){
  var type = sanitize(req.params.type).trim();
  var page = sanitize(req.query.page || '1').trim();
  var type_label = "产品列表";
  settings.goods.type.forEach(function(item){
    if(item.id == type){
      type_label = item.label;
    }
  });
  
  var render = function (goods_list, total) {
    res.render('goods/list', {goods_list: goods_list, type_label: type_label, total: total});
  };
  
  var proxy = EventProxy.create('goods_list', 'total', render);
  proxy.fail(next);

  Goods.paginate({type: type}, page, 20, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('goods_list', docs);
    proxy.emit('total', total);
  }));
};