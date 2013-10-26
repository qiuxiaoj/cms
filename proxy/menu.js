var models = require('../models');
var Menu = models.Menu;

exports.getMenuById = function (id, callback) {
  Menu.findOne({_id: id}, callback);
};

exports.paginate = function(page, limit, callback){
  Menu.find({}, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
} 

exports.list = function (callback) {	
  Menu.find({active: true}, [], {sort: [['updated_at', 'desc']]}, callback);  
};

exports.update = function(menu_id, name, link, position, active, callback){
  Menu.update({_id: menu_id}, {name: name, link: link, position: position, active: active, updated_at: new Date()}, callback);
}; 

exports.remove = function(menu_id, callback){
  Menu.remove({_id: menu_id}, callback);
}; 

exports.newAndSave = function (name, link, position, active, callback) {
  var menu = new Menu();
  menu.name = name;
  menu.link = link;
  menu.position = position;
  menu.active = active;
  menu.save(callback);
};