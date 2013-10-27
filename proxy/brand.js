var models = require('../models');
var Brand = models.Brand;

exports.getBrandById = function (id, callback) {
  Brand.findOne({_id: id}, callback);
};

exports.list = function (limit, callback) {	
  Brand.find({}, [], {sort: [['updated_at', 'desc']], limit: limit}, callback);  
};

exports.paginate = function(page, limit, callback){
  Brand.find({}, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
};

exports.update = function(brand_id, name, desc, image_url, active, callback){
  Brand.update({_id: brand_id}, {name: name, desc: desc, image_url: image_url, active: active, updated_at: new Date()}, callback);
}; 

exports.remove = function(brand_id, callback){
  Brand.remove({_id: brand_id}, callback);
};

exports.newAndSave = function (name, desc, image_url, callback) {
  var brand = new Brand();
  brand.name = name;
  brand.desc = desc;
  brand.image_url = image_url;
  brand.save(callback);
};
