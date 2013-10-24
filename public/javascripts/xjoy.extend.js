$(function(){
  $('[data-auto-remote]').each(function(i, element){
    var $this = $(element),
        $url = $this.data('url'),
        $target = $this.data('target');
    $target.load($url);
  });
});