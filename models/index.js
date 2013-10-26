var settings = require('../settings'),
    mongoose = require('mongoose');

require('mongoose-pagination');   

mongoose.connect(settings.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', settings.db, err.message);
    process.exit(1);
  }
});

require('./user');
require('./article');
require('./article_cat');
require('./menu');
require('./advertise');

exports.User = mongoose.model('User');
exports.Article = mongoose.model('Article');
exports.ArticleCat = mongoose.model('ArticleCat');
exports.Menu = mongoose.model('Menu');
exports.Advertise = mongoose.model('Advertise');