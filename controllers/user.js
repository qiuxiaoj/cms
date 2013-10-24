var User = require('../proxy').User;
var utils = require('../libs/utils');

exports.index = function (req, res, next) {
  var user_name = req.params.name;
  User.getUserByName(user_name, function (err, user) {
	  res.render('user/index', {
	    user: user
	  });
  });		  
};

exports.new = function(){
  User.newAndSave('系统管理员', 'Admin', utils.md5('00000000'), 'admin@admin.com', true, true, function(err, user){
    if (err) {
      console.log(err);
      res.send('系统管理员创建失败.');
      return;
    }
    res.send('系统管理员创建成功.');
  });
};

exports.createAdmin = function(req, res, next){
  User.newAndSave('系统管理员', 'Admin', utils.md5('00000000'), 'admin@admin.com', true, true, function(err, user){
  	if (err) {
    	console.log(err);
    	res.send('系统管理员创建失败.');
    	return;
    }
  	res.send('系统管理员创建成功.');
  });
};
