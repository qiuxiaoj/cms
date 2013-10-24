var models = require('../models');
var User = models.User;

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

/**
  * 创建用户 
  */
exports.newAndSave = function (name, loginname, pass, email, is_admin, active, callback) {
  var user = new User();
  user.name = name;
  user.loginname = loginname;
  user.pass = pass;
  user.email = email;
  user.is_admin = is_admin;
  user.active = active;
  user.save(callback);
};