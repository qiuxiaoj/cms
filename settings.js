var path = require('path');

module.exports = { 
  cookieSecret: 'xjoy', 
  auth_cookie_name: 'xjoy',
  db: 'mongodb://127.0.0.1/xjoy',
  upload: {
  	dir: path.join(__dirname, 'public', 'upload')
  }, 
  host: 'localhost',
  goods: {
  	type: [{id: 1, label: '特价商品'}, {id: 2, label: '新品上市'}, {id: 3, label: '热销商品'}],
    tag: [{
      k: 'a', 
      v: '款式',
      tags: [{k: '1', v: '男款'}, {k: '2', v: '女款'}]
    }]
  }
};