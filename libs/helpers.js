var url = require('url');
var qs = require('querystring');
var pagination = require("node-pagination");
var utils = require('./utils');

/**
 * Helpers method
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

exports.helpers = function(name) {
  return function (req, res, next) {
    res.locals.appName = name || 'App';
    res.locals.title = name || 'App';
    res.locals.req = req;
    res.locals.isActive = function (link) {
      return req.url.indexOf(link) !== -1 ? 'active' : '';
    }
    res.locals.formatDate = formatDate;
    res.locals.formatDatetime = formatDatetime;
    res.locals.stripScript = stripScript;
    res.locals.createPagination = createPagination(req);
    res.locals.text_cut = text_cut;

    if (typeof req.flash !== 'undefined') {
      res.locals.info = req.flash('info')
      res.locals.errors = req.flash('errors')
      res.locals.success = req.flash('success')
      res.locals.warning = req.flash('warning')
    }

    /**
     * Render mobile views
     *
     * If the request is coming from a mobile/tablet device, it will check if
     * there is a .mobile.ext file and it that exists it tries to render it.
     *
     * Refer https://github.com/madhums/nodejs-express-mongoose-demo/issues/39
     * For the implementation refer the above app
     */

    // For backward compatibility check if `app` param has been passed
    var ua = req.header('user-agent')
    var fs = require('fs')

    res._render = res.render
    req.isMobile = /mobile/i.test(ua)

    res.render = function (template, locals, cb) {
      var view = template + '.mobile.' + req.app.get('view engine')
      var file = req.app.get('views') + '/' + view

      if (/mobile/i.test(ua) && fs.existsSync(file)) {
        res._render(view, locals, cb)
      } else {
        res._render(template, locals, cb)
      }
    }

    next()
  }
};

/**
 * Pagination helper
 *
 * @param {Number} pages
 * @param {Number} page
 * @return {String}
 * @api private
 */

function createPagination (req) {
  return function createPagination (total, pagesize) {
    if (total == 0){
      return '';
    }
    var params = qs.parse(url.parse(req.url).query)
    var current_page = parseInt(params.page, 10) || 1;
    var pv = pagination.build(total, current_page, pagesize, 2, 6);

    if(pv.step == 1){
      return '';
    }

    var result = [];
    
    if(pv.isprevious){
      params.page = pv.previous;
      var href = '?' + qs.stringify(params);
      result.push('<li><a href="' + href + '">&laquo;</a></li>');
    }else{
      result.push('<li class="disabled"><a>&laquo;</a></li>');
    }

    for(var p = 0; p < pv.step; p++){
      var pn = p + pv.begin;
      params.page = pn;
      var href = '?' + qs.stringify(params);
      if(pn === current_page){
        result.push('<li class="active"><a href="' + href + '">' + pn + '</a></li>');
      }else{
        result.push('<li><a href="' + href + '">' + pn + '</a></li>');
      }
    }

    if(pv.isnext){
      params.page = pv.next;
      var href = '?' + qs.stringify(params);
      result.push('<li><a href="' + href + '">&raquo;</a></li>');
    }else{
      result.push('<li class="disabled"><a>&raquo;</a></li>');
    }
    return '<ul class="pagination">' + result.join('') + '</ul>';
  }
};

/**
 * Format date helper
 *
 * @param {Date} date
 * @return {String}
 * @api private
 */

function formatDate (date) {
  return utils.DateFormat(date, 'YYYY-MM-DD');
};

/**
 * Format date time helper
 *
 * @param {Date} date
 * @return {String}
 * @api private
 */

function formatDatetime (date) {
  return utils.DateFormat(date, 'YYYY-MM-DD HH:mm:ss');
};

function text_cut(str, num){
  if (!str) {
    return str;
  }
  var sl = str.length;
  if (sl <= num) {
    return str;
  }
  var maxCount = num * 2;
  var count = 0;
  var i = 0;
  while (count < maxCount && i < sl) {
    if (str.charCodeAt(i) < 256 && str.charCodeAt(i) > -1) {
      count++;
    } else {
      count += 2;
    }
    i++;
  }
  if (count > maxCount) {
    i--;
  }
  return str.substring(0, i);
};

/**
 * Strip script tags
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function stripScript (str) {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
};