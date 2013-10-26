var ArticleCat = require('../proxy').ArticleCat;
var Menu = require('../proxy').Menu;
var Advertise = require('../proxy').Advertise;
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

