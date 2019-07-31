$(function(){
	//niceScroll 
	$('body').niceScroll();
	
	//search 
	$('#navigation li.search a').click(function(e) {
        $('#search').slideToggle();
    });
	
	//mobile 
	var $mobile = $('#navigation').html();
	$('#header .wrap').append('<a id="mobi-btn"><hr></a>');
	$('#mobile').prepend('<ul class="link">' + $mobile + '</ul>');
	
	$('#mobi-btn').click(function(e) {
        $(this).toggleClass('active');
		$('#mobile').slideToggle();
    });
});