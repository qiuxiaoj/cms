var Brand = require('../proxy').Brand;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.new = function(req, res, next){
  res.render('admin/brand/new');
};

exports.create = function(req, res, next){
  var name = sanitize(req.body.name).trim();
  var desc = req.body.desc;
  var image_url = req.body.image_url;
  Brand.newAndSave(name, desc, image_url, function(err, cat){
  	if (err) {
      return next(err);
    }
    res.redirect('admin/brand/list');
  });
};

exports.edit = function(req, res, next){
  var brand_id = sanitize(req.params.brand_id).trim();
  Brand.getBrandById(brand_id, function(err, docs){
    res.render('admin/brand/edit', {brand: docs});
  });
};

exports.update = function(req, res, next){
  var brand_id = sanitize(req.body.brand_id).trim();  
  var name = sanitize(req.body.name).trim(); 
  var desc = req.body.desc;
  var image_url = req.body.image_url; 
  Brand.update(brand_id, name, desc, image_url, true, function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/brand/list');
  });
};

exports.delete = function(req, res, next){
  var brand_id = sanitize(req.params.brand_id).trim();
  Brand.remove(brand_id, function(err){
    if (err) {
      return next(err);
    }
    res.redirect('admin/brand/list');
  });
};

exports.list = function(req, res, next){
  var page = sanitize(req.query.page || '1').trim();
  var render = function (brands, total) {
    res.render('admin/brand/list', {brands: brands, total: total});
  };
  var proxy = EventProxy.create('brands', 'total', render);
  proxy.fail(next);

  Brand.paginate(page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('brands', docs);
    proxy.emit('total', total);
  }));
};
