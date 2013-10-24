var models = require('../models');
var Menu = models.Menu;

exports.paginate = function(page, limit, callback){
  Menu.find({}, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
} 

exports.newAndSave = function (name, link, position, active, callback) {
  var menu = new Menu();
  menu.name = name;
  menu.link = link;
  menu.position = position;
  menu.active = active;
  menu.save(callback);
};