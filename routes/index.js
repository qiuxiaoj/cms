var macro = require('../midderwares/macro');
var auth = require('../midderwares/auth');
var site = require('../controllers/site');
var sign = require('../controllers/sign');
var user = require('../controllers/user');
var admin = require('../controllers/admin');
var article = require('../controllers/article');
var menu = require('../controllers/menu');
var advertise = require('../controllers/advertise');
var brand = require('../controllers/brand');
var goods = require('../controllers/goods');
var upload = require('../controllers/upload');

module.exports = function (app) {
	app.get('/', auth.signinRequired, macro.home_goods, macro.menu, macro.advs, site.index);
	app.get('/signin', sign.showLogin);
	app.post('/signin', sign.login);
	app.get('/signout', auth.signinRequired, sign.signout);
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

	app.get('/admin/brand/list', auth.adminRequired, brand.list);
	app.get('/admin/brand/new', auth.adminRequired, brand.new);
	app.post('/admin/brand/create', auth.adminRequired, brand.create);
	app.get('/admin/brand/:brand_id/edit', auth.adminRequired, brand.edit);
	app.post('/admin/brand/update', auth.adminRequired, brand.update);
	app.get('/admin/brand/:brand_id/delete', auth.adminRequired, brand.delete);

	app.get('/admin/goods/list', auth.adminRequired, goods.list);
	app.get('/admin/goods/new', auth.adminRequired, macro.brand_list, goods.new);
	app.post('/admin/goods/create', auth.adminRequired, goods.create);
	app.get('/admin/goods/:goods_id/edit', auth.adminRequired, macro.brand_list, goods.edit);
	app.post('/admin/goods/update', auth.adminRequired, goods.update);
	app.post('/admin/goods/update/:type', auth.adminRequired, goods.update_type);
	app.get('/admin/goods/:goods_id/delete', auth.adminRequired, goods.delete);

	// upload
	app.post('/upload/attachment', auth.signinRequired, upload.uploadAttachment);	
	
	app.get('/system/init', user.createAdmin);

	app.get('/categroy/:id', auth.signinRequired, macro.menu, article.cate_index);
	app.get('/article/:id', auth.signinRequired, macro.menu, article.article_detail);

	app.get('/goods/:goods_id', auth.signinRequired, macro.menu, site.goods_detail);
	app.get('/goods/type/:type', auth.signinRequired, macro.menu, site.goods_by_type);
	app.get('/goods/brand/:brand_id', auth.signinRequired, macro.menu, site.goods_by_brand);
	app.get('/goods/brand/:brand_id/:tag', auth.signinRequired, macro.menu, site.goods_by_brand);
}