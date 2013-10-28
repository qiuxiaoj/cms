/**
 * 需要管理员权限
 */
exports.adminRequired = function (req, res, next) {
  if (!req.session.user) {
    //return res.render('notify/notify', {error: '请使用管理员账户登陆。'});
    return res.redirect('signin');
  }
  if (!req.session.user.is_admin) {
    //return res.render('notify/notify', {error: '管理员才能访问。'});
    return res.redirect('signin');
  }
  next();
};

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send(403, 'forbidden!');
  }
  next();
};

/**
 * 需要登录，响应错误页面
 */
exports.signinRequired = function (req, res, next) {
  if (!req.session.user) {
    //res.render('notify/notify', {error: '未登入用户不能发布话题。'});
    return res.redirect('signin');
  }
  next();
};