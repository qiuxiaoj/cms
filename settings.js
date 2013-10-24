var path = require('path');

module.exports = { 
  cookieSecret: 'xjoy', 
  auth_cookie_name: 'xjoy',
  db: 'mongodb://127.0.0.1/xjoy',
  upload: {
  	dir: path.join(__dirname, 'public', 'upload')
  }, 
  host: 'localhost'
};