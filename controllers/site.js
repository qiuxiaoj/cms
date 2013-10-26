var Article = require('../proxy').Article;
var EventProxy = require('eventproxy');

exports.index = function (req, res, next) {
  var render = function (news, new_products, hot_products) {
  	res.render('index', {news: news, new_products: new_products, hot_products: hot_products});
  };

  var proxy = EventProxy.create('news', 'new_products', 'hot_products', render);
  proxy.fail(next);

  Article.paginate('525ab43127723bf64a000002', 1, 10, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('news', docs);
  }));
  Article.paginate('526396e16ec7252238000002', 1, 12, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('new_products', docs);
  }));
  Article.paginate('526396f06ec7252238000003', 1, 12, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('hot_products', docs);
  }));
}