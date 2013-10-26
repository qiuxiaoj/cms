var models = require('../models');
var User = models.User;
var utils = require('../libs/utils');

/**
 * 根据用户名，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {Function} callback 回调函数
 */
exports.getUserByName = function (name, callback) {
  User.findOne({name: name}, callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (id, callback) {
  User.findOne({_id: id}, callback);
};

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByLoginName = function (loginName, callback) {
  User.findOne({'loginname': loginName}, callback);
};

exports.paginate = function(page, limit, callback){
  User.find({}, [], {sort: [['updated_at', 'desc']]}).paginate(page, limit, callback);
};

exports.update = function(user_id, name, loginname, pass, email, is_admin, active, callback){
  User.update({_id: user_id}, {name: name, loginname: loginname, pass: utils.md5(pass), email: email, is_admin: is_admin, active: active, updated_at: new Date()}, callback);
}; 

exports.remove = function(user_id, callback){
  User.remove({_id: user_id}, callback);
}; 

/**
  * 创建用户 
  */
exports.newAndSave = function (name, loginname, pass, email, is_admin, active, callback) {
  var user = new User();
  user.name = name;
  user.loginname = loginname;
  user.pass = utils.md5(pass);
  user.email = email;
  user.is_admin = is_admin;
  user.active = active;
  user.save(callback);
};