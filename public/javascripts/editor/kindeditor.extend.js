!function($) {
  $.fn.editor = function(options) {
	return this.each(function() {
	  return KindEditor.create($(this), $.extend({}, $.fn.editor.defaults, options));
	});
  };
  $.fn.editor.defaults = {
  	uploadJson: '/upload/attachment',
  	items : ['fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
		'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
		'insertunorderedlist', '|', 'emoticons', 'image', 'link']
  };
}(window.jQuery);