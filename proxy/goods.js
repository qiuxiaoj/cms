var models = require('../models');
var Goods = models.Goods;

exports.getGoodsById = function (id, callback) {
  Goods.findOne({_id: id}, callback);
};

exports.list = function (limit, callback) {	
  Goods.find({}, [], {sort: [['updated_at', 'desc']], limit: limit}, callback);  
};

exports.paginate = function(query, page, limit, callback){
  Goods.find(query, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
};

exports.update = function(goods_id, name, desc, content, image_url, brand_id, active, callback){
  Goods.update({_id: goods_id}, {name: name, desc: desc, content: content, image_url: image_url, brand_id: brand_id, active: active, updated_at: new Date()}, callback);
}; 

exports.update_type = function(goods_ids, type, callback){
  Goods.update({_id: {$in: goods_ids}}, {type: type, updated_at: new Date()}, callback);
}; 

exports.remove = function(goods_id, callback){
  Goods.remove({_id: goods_id}, callback);
};

exports.newAndSave = function (name, desc, content, image_url, brand_id, callback) {
  var goods = new Goods();
  goods.name = name;
  goods.desc = desc;
  goods.content = content;
  goods.image_url = image_url;
  goods.brand_id = brand_id;
  goods.save(callback);
};
