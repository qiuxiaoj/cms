var auth = require('../midderwares/auth');
var site = require('../controllers/site');
var sign = require('../controllers/sign');
var user = require('../controllers/user');
var admin = require('../controllers/admin');
var article = require('../controllers/article');
var menu = require('../controllers/menu');
var upload = require('../controllers/upload');

module.exports = function (app) {
	app.get('/', site.index);
	app.get('/signin', sign.showLogin);
	app.post('/signin', sign.login);
	app.get('/signout', sign.signout);
	app.get('/admin/index', auth.adminRequired, admin.index);

	app.get('/admin/art_cat/new', auth.adminRequired, article.new_cat);
	app.post('/admin/art_cat/create', auth.adminRequired, article.create_cat);
	app.get('/admin/art_cat/list', auth.adminRequired, article.list_cat);

	app.get('/admin/cat/:cat_id/new', auth.adminRequired, article.new_art);
	app.get('/admin/art/new', auth.adminRequired, article.new_art);
	app.post('/admin/art/create', auth.adminRequired, article.create_art);
	app.get('/admin/cat/:cat_id/list', auth.adminRequired, article.list_art);

	app.get('/admin/menu/new', auth.adminRequired, menu.new);
	app.post('/admin/menu/create', auth.adminRequired, menu.create);
	app.get('/admin/menu/list', auth.adminRequired, menu.list);

	// upload
	app.post('/upload/attachment', upload.uploadAttachment);	
	
	app.get('/user/createAdmin', user.createAdmin);

	app.get('/categroy/:id', article.cate_index);
	app.get('/article/:id', article.article_detail);
}