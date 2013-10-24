var models = require('../models');
var ArticleCat = models.ArticleCat;

exports.getCatById = function (id, callback) {
  ArticleCat.findOne({_id: id}, callback);
};

exports.list = function (callback) {
  ArticleCat.find({}, [], {sort: [['sort', 'asc'], ['updated_at', 'desc']], limit: 20}, callback);
};  

exports.newAndSave = function (cat_name, parent_id, sort, active, callback) {
  var cat = new ArticleCat();
  cat.cat_name = cat_name;
  cat.parent_id = parent_id;
  cat.sort = sort;
  cat.active = active;
  cat.save(callback);
};
