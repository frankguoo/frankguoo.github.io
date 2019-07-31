$( function(){

	var navp = $('#menu, .pointer, .facebook');
	$(window).scroll(function(){
		if (  $(window).scrollTop() == 0 ) {
			navp.css("opacity","0");
		}else {
			navp.css("display","block");
			navp.css("opacity","0.90");
		}
	});

	// 滑動到最上方
	$('.goTOP').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 500);
	});

    //側選單
	$('#arrowOut').click(function(){
		$(this).hide();
		$('#arrowIn').show();
		$(".menu_box").animate({right:'-130px'},100);
	});

	$('#arrowIn').click(function(){
		$(this).hide();
		$('#arrowOut').show();
		$(".menu_box").animate({right:'0px'},100);
	});
	$('.footer_title, .footer_mask').click(function(){
		$('.footer_bank, .footer_mask').toggleClass('ani_show');

	});	

    // 影像地圖RWD
    $('map').imageMapResize();
	
	$('li.best').click(function(){
		$('.footer_layaway').hide();
		$('.footer_best').show();
	});

	$('li.layaway').click(function(){
		$('.footer_best').hide();
		$('.footer_layaway').show();
	});

	// 影片撥放
	function myFunction() {
	    var src = 'https://www.youtube.com/embed/PtmQObLwJjA?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0';
	    $('#videoModal').modal('show');
	    $('#videoModal iframe').attr('src', src);
	}

	// Cookie 設定 24H顯示一次影片
	// console.log($.cookie());
	// if ($.cookie('bankVideo') == null ) {
	// 	var bankVideo = $.cookie('bankVideo', 'yes', { expires: 1 });
	// 	myFunction(); // Page loaded
	// } else {
	// 	console.log('video none');
	// }

	$('#link').click(function () {
		myFunction();
	});

	$('#videoModal button').click(function () {
	    $('#videoModal iframe').removeAttr('src');
	});

	$('#videoModal').on('hidden.bs.modal', function () {
	    $('#videoModal iframe').removeAttr('src');
	});

});