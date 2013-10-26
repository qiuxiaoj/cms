var Advertise = require('../proxy').Advertise;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');

exports.new = function(req, res, next){
  res.render('admin/ad/new');
};

exports.create = function(req, res, next){
  var title = sanitize(req.body.title).trim();
  var desc = req.body.desc;
  var link = sanitize(req.body.link).trim();
  var image_url = req.body.image_url;

  Advertise.newAndSave(title, desc, link, image_url, 'home', function(err, menu){
  	if (err) {
      return next(err);
    }
    res.redirect('admin/ad/list');
  });	
};

exports.edit = function(req, res, next){
  var ad_id = sanitize(req.params.ad_id).trim();
  Advertise.getAdvertiseById(ad_id, function(err, docs){
    res.render('admin/ad/edit', {ad: docs});
  });
};

exports.update = function(req, res, next){
  var ad_id = sanitize(req.body.ad_id).trim();  
  var title = sanitize(req.body.title).trim();
  var desc = sanitize(req.body.desc).trim();
  var link = sanitize(req.body.link).trim();
  var image_url = req.body.image_url; 
  Advertise.update(ad_id, title, desc, link, image_url, 'home', function(err, num, raw){
    if (err) {
      return next(err);
    }
    res.redirect('admin/ad/list');
  });
};

exports.delete = function(req, res, next){
  var ad_id = sanitize(req.params.ad_id).trim();
  Advertise.remove(ad_id, function(err){
    if (err) {
      return next(err);
    }
    res.redirect('admin/ad/list');
  });
};

exports.list = function(req, res, next){
  var page = sanitize(req.query.page || '1').trim();
  var render = function (ads, total) {
  	res.render('admin/ad/list', {ads: ads, total: total});
  };
  var proxy = EventProxy.create('ads', 'total', render);
  proxy.fail(next);

  Advertise.paginate(page, 15, proxy.done(function(docs, total, err){
    if (err) {
      return next(err);
    }
    proxy.emit('ads', docs);
    proxy.emit('total', total);
  }));
};