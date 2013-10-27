var ArticleCat = require('../proxy').ArticleCat;
var Menu = require('../proxy').Menu;
var Advertise = require('../proxy').Advertise;
var Brand = require('../proxy').Brand;
var Goods = require('../proxy').Goods;
var EventProxy = require('eventproxy');


exports.cate_list = function (req, res, next) {
  ArticleCat.list(function(err, cats){
    if (err) {
      return next(err);
    }
    res.locals.cate_list = cats;
    return next();
  });
};

exports.menu = function(req, res, next){
  Menu.list(function(err, docs){
    if (err) {
      return next(err);
    }
    var top_menu = [],    
    		foot_menu = [];
    for(var i in docs){
      var doc = docs[i];
      if(doc.position == 'top') top_menu.push(doc);
      if(doc.position == 'foot') foot_menu.push(doc);    
    }
    res.locals.top_menu = top_menu;
    res.locals.foot_menu = foot_menu;
    return next();
  });
};

exports.advs = function(req, res, next){
  Advertise.list(6, function(err, docs){
    if (err) {
      return next(err);
    }
    res.locals.advs = docs;
    return next();
  });
};

exports.brand_list = function(req, res, next){
  Brand.list(100, function(err, docs){
    if (err) {
      return next(err);
    }
    res.locals.brand_list = docs;
    return next();
  });
};

exports.home_goods = function(req, res, next){
  var datas = function (low_goods, new_goods, hot_goods) {
    res.locals.low_goods = low_goods;
    res.locals.new_goods = new_goods;
    res.locals.hot_goods = hot_goods;
    return next();
  };

  var proxy = EventProxy.create('low_goods', 'new_goods', 'hot_goods', datas);
  proxy.fail(next);

  Goods.paginate({type: 1}, 1, 12, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('low_goods', docs);
  }));
  Goods.paginate({type: 2}, 1, 12, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('new_goods', docs);
  }));
  Goods.paginate({type: 3}, 1, 12, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('hot_goods', docs);
  }));
};

