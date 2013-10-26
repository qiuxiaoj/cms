var macro = require('../midderwares/macro');
var auth = require('../midderwares/auth');
var site = require('../controllers/site');
var sign = require('../controllers/sign');
var user = require('../controllers/user');
var admin = require('../controllers/admin');
var article = require('../controllers/article');
var menu = require('../controllers/menu');
var advertise = require('../controllers/advertise');
var upload = require('../controllers/upload');

module.exports = function (app) {
	app.get('/', macro.cate_list, macro.menu, macro.advs, site.index);
	app.get('/signin', sign.showLogin);
	app.post('/signin', sign.login);
	app.get('/signout', sign.signout);
	app.get('/admin/index', auth.adminRequired, admin.index);

	app.get('/admin/art_cat/new', auth.adminRequired, article.new_cat);
	app.post('/admin/art_cat/create', auth.adminRequired, article.create_cat);
	app.get('/admin/art_cat/:cat_id/edit', auth.adminRequired, article.edit_cat);
	app.post('/admin/art_cat/update', auth.adminRequired, article.update_cat);
	app.get('/admin/art_cat/:cat_id/delete', auth.adminRequired, article.delete_cat);	
	app.get('/admin/art_cat/list', auth.adminRequired, article.list_cat);

	app.get('/admin/cat/:cat_id/new', auth.adminRequired, article.new_art);
	app.get('/admin/art/new', auth.adminRequired, article.new_art);
	app.post('/admin/art/create', auth.adminRequired, article.create_art);
	app.get('/admin/art/:art_id/edit', auth.adminRequired, macro.cate_list, article.edit_art);
	app.post('/admin/art/update', auth.adminRequired, article.update_art);
	app.get('/admin/art/:cat_id/:art_id/delete', auth.adminRequired, article.delete_art);
	app.get('/admin/cat/:cat_id/list', auth.adminRequired, article.list_art);

	app.get('/admin/menu/new', auth.adminRequired, menu.new);
	app.post('/admin/menu/create', auth.adminRequired, menu.create);
	app.get('/admin/menu/:menu_id/edit', auth.adminRequired, menu.edit);
	app.post('/admin/menu/update', auth.adminRequired, menu.update);
	app.get('/admin/menu/:menu_id/delete', auth.adminRequired, menu.delete);
	app.get('/admin/menu/list', auth.adminRequired, menu.list);

	app.get('/admin/user/list', auth.adminRequired, user.list);
	app.get('/admin/user/new', auth.adminRequired, user.new);
	app.post('/admin/user/create', auth.adminRequired, user.create);
	app.get('/admin/user/:user_id/edit', auth.adminRequired, user.edit);
	app.post('/admin/user/update', auth.adminRequired, user.update);
	app.get('/admin/user/:user_id/delete', auth.adminRequired, user.delete);

	app.get('/admin/ad/list', auth.adminRequired, advertise.list);
	app.get('/admin/ad/new', auth.adminRequired, advertise.new);
	app.post('/admin/ad/create', auth.adminRequired, advertise.create);
	app.get('/admin/ad/:ad_id/edit', auth.adminRequired, advertise.edit);
	app.post('/admin/ad/update', auth.adminRequired, advertise.update);
	app.get('/admin/ad/:ad_id/delete', auth.adminRequired, advertise.delete);


	// upload
	app.post('/upload/attachment', upload.uploadAttachment);	
	
	app.get('/system/init', user.createAdmin);

	app.get('/categroy/:id', macro.menu, article.cate_index);
	app.get('/article/:id', macro.menu, article.article_detail);
}