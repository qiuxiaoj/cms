var models = require('../models');
var Advertise = models.Advertise;

exports.getAdvertiseById = function (id, callback) {
  Advertise.findOne({_id: id}, callback);
};

exports.list = function (limit, callback) {	
  Advertise.find({}, [], {sort: [['updated_at', 'desc']], limit: limit}, callback);  
};

exports.paginate = function(page, limit, callback){
  Advertise.find({}, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
};

exports.update = function(ad_id, title, desc, link, image_url, category, callback){
  Advertise.update({_id: ad_id}, {title: title, desc: desc, link: link, image_url: image_url, category: category, updated_at: new Date()}, callback);
}; 

exports.remove = function(ad_id, callback){
  Advertise.remove({_id: ad_id}, callback);
}; 

exports.newAndSave = function (title, desc, link, image_url, category, callback) {
  var ad = new Advertise();
  ad.title = title;
  ad.desc = desc;
  ad.link = link;
  ad.image_url = image_url;
  ad.category = category;
  ad.save(callback);
};
