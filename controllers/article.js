var Article = require('../proxy').Article;
var ArticleCat = require('../proxy').ArticleCat;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.new_cat = function(req, res, next){
  res.render('admin/article/new_cat');
};

exports.create_cat = function(req, res, next){
  var cat_name = sanitize(req.body.cat_name).trim();	
  ArticleCat.newAndSave(cat_name, 'root', 0, true, function(err, cat){
  	if (err) {
      return next(err);
    }
    res.redirect('admin/art_cat/list');
  });
};

exports.edit_cat = function(req, res, next){
  var cat_id = sanitize(req.params.cat_id).trim();
  ArticleCat.getCatById(cat_id, function(err, docs){
    res.render('admin/article/edit_cat', {cate: docs});
  });
};

exports.update_cat = function(req, res, next){
  var cat_id = sanitize(req.body.cat_id).trim();  
  var cat_name = sanitize(req.body.cat_name).trim();  
  ArticleCat.update(cat_id, cat_name, 'root', 0, true, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/art_cat/list');
  });
};

exports.delete_cat = function(req, res, next){
  var cat_id = sanitize(req.params.cat_id).trim();
  ArticleCat.remove(cat_id, function(err){
    if (err) {
      return next(err);
    }
    res.redirect('admin/art_cat/list');
  });
};

exports.list_cat = function(req, res, next){
  ArticleCat.list(function(err, cats){
    if (err) {
      return next(err);
    }
    res.render('admin/article/list_cat', {article_cats: cats});
  });
};

exports.new_art = function(req, res, next){
  var cat_id = req.params.cat_id ? sanitize(req.params.cat_id).trim() : '';
  ArticleCat.list(function(err, cats){
    if (err) {
      return next(err);
    }
    res.render('admin/article/new', {cat_id: cat_id, article_cats: cats});
  });
};

exports.create_art = function(req, res, next){
  var title = sanitize(req.body.title).trim();
  var content = sanitize(req.body.content).trim();
  var image_url = req.body.image_url;
  var cat_id = sanitize(req.body.cat_id).trim();
  Article.newAndSave(title, content, image_url, cat_id, function(err, art){
  	if (err) {
      return next(err);
    }
    res.redirect('admin/cat/' + cat_id + '/list');
  });
};

exports.edit_art = function(req, res, next){
  var art_id = sanitize(req.params.art_id).trim();
  Article.getArtileById(art_id, function(err, docs){
    res.render('admin/article/edit_art', {article: docs});
  });
};

exports.update_art = function(req, res, next){
  var title = sanitize(req.body.title).trim();
  var content = sanitize(req.body.content).trim();
  var image_url = req.body.image_url;
  var cat_id = sanitize(req.body.cat_id).trim();
  var art_id = sanitize(req.body.art_id).trim();   
  Article.update(art_id, title, content, image_url, cat_id, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/cat/' + cat_id + '/list');
  });
};

exports.delete_art = function(req, res, next){
  var cat_id = sanitize(req.params.cat_id).trim();
  var art_id = sanitize(req.params.art_id).trim();
  Article.remove(art_id, function(err){
    if (err) {
      return next(err);
    }
    res.redirect('admin/cat/' + cat_id + '/list');
  });
};

exports.list_art = function(req, res, next){
  var cat_id = sanitize(req.params.cat_id).trim();
  var page = sanitize(req.query.page || '1').trim();
  var render = function (articles, total, article_cat) {
  	res.render('admin/article/list', {articles: articles, total: total, article_cat: article_cat});
  };
  var proxy = EventProxy.create('articles', 'total', 'article_cat', render);
  proxy.fail(next);

  //Article.list(cat_id, proxy.done('articles'));
  Article.paginate(cat_id, page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('articles', docs);
    proxy.emit('total', total);
  }));
  ArticleCat.getCatById(cat_id, proxy.done('article_cat'));
};

exports.article_detail = function(req, res, next){
  var id = sanitize(req.params.id).trim();
  Article.getArtileById(id, function(err, art){
    if (err) {
      return next(err);
    }
    res.render('article/detail', {article: art});
  });
};

exports.cate_index = function(req, res, next){
  var cat_id = sanitize(req.params.cat_id).trim();
  var page = sanitize(req.query.page || '1').trim();
  var render = function (articles, total, article_cat) {
    res.render('article/index', {articles: articles, total: total, article_cat: article_cat});
  };
  var proxy = EventProxy.create('articles', 'total', 'article_cat', render);
  proxy.fail(next);

  //Article.list(cat_id, proxy.done('articles'));
  Article.paginate(cat_id, page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('articles', docs);
    proxy.emit('total', total);
  }));
  ArticleCat.getCatById(cat_id, proxy.done('article_cat'));
};
