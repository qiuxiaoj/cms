var fs = require('fs');
var path = require('path');
var ndir = require('ndir');
var settings = require('../settings');
var utils = require('../libs/utils');

exports.uploadAttachment = function(req, res, next){
  if (!req.session || !req.session.user) {
    res.json({ error: 1, message: 'forbidden' });
    return;
  }
  var file = req.files && req.files.imgFile;
  var type = req.query.dir || 'image';

  if (!file) {
    res.json({ error: 1, message: 'no file' });
    return;
  }
  var now = new Date();
  var year = now.getFullYear() + '';
  var month = (now.getMonth() + 1) + '';
  var day = now.getDate() + '';
  var saveDir = path.join(settings.upload.dir, type, year, month, day);
  ndir.mkdir(saveDir, function (err) {
    if (err) {
      return next(err);
    }
    var filename = Math.ceil(Math.random()*10000) + '_' + file.name;
    var savepath = path.resolve(path.join(saveDir, filename));
    if (savepath.indexOf(path.resolve(saveDir)) !== 0) {
      return res.json({error: 1, message: 'forbidden'});
    }
    fs.rename(file.path, savepath, function (err) {
      if (err) {
        return next(err);
      }
      var url = '/upload/' + [type, year, month, day].join('/') + '/' + encodeURIComponent(filename);
      res.json({ error: 0, url: url });
    });
  }); 
};
