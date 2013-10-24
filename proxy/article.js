var models = require('../models');
var Article = models.Article;

exports.getArtileById = function (id, callback) {
  Article.findOne({_id: id}, callback);
};

exports.list = function (cat_id, callback) {	
  Article.find({cat_id: cat_id}, [], {sort: [['updated_at', 'desc']], limit: 20}, callback);  
};

exports.paginate = function(cat_id, page, limit, callback){
  Article.find({cat_id: cat_id}, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
} 

exports.newAndSave = function (title, content, image_url, cat_id, callback) {
  var art = new Article();
  art.title = title;
  art.content = content;
  art.image_url = image_url;
  art.cat_id = cat_id;
  art.save(callback);
};
