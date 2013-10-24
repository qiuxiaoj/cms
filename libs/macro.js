var ArticleCat = require('../proxy').ArticleCat;
var EventProxy = require('eventproxy');

exports.cate_list = function(){
  var sync = true;
  var data = [];
  console.log(1111111);	
  ArticleCat.list(function(err, cats){
    data = cats;
    sync = false;
    console.log(222222);	
  });
  console.log(3333333333);
  return data;
};