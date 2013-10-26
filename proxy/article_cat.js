var models = require('../models');
var ArticleCat = models.ArticleCat;

exports.getCatById = function (id, callback) {
  ArticleCat.findOne({_id: id}, callback);
};

exports.list = function (callback) {
  ArticleCat.find({}, [], {sort: [['sort', 'asc'], ['updated_at', 'desc']], limit: 20}, callback);
}; 

exports.update = function(cat_id, cat_name, parent_id, sort, active, callback){
  ArticleCat.update({_id: cat_id}, {cat_name: cat_name, parent_id: parent_id, sort: sort, active: active, updated_at: new Date()}, callback);
}; 

exports.remove = function(cat_id, callback){
  ArticleCat.remove({_id: cat_id}, callback);
}; 

exports.newAndSave = function (cat_name, parent_id, sort, active, callback) {
  var cat = new ArticleCat();
  cat.cat_name = cat_name;
  cat.parent_id = parent_id;
  cat.sort = sort;
  cat.active = active;
  cat.save(callback);
};
