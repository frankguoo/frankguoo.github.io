$( function(){
	
	
	$('#myCarousel-A').owlCarousel({
			loop:true,
			margin:5,
			padding: 10,
			nav:false,
			dots: true,
			autoplay:true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			slideBy: 1,
			responsive:{
				0:{
					stagePadding: 20,
					margin:5,
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:2
				}
			}
	});

	// Mobile FB ＆ TOP icon
	var navp = $('.pointer, .facebook, .go');
	$(window).scroll(function(){
		if (  $(window).scrollTop() == 0 ) {
			navp.css('opacity','0');
		}else {
			navp.css('display','block');
			navp.css('opacity','0.90');
		}
	});
	
	// iframe RWD
	$('iframe').iFrameResize( [{
		inPageLinks	: true,
		log			: false
	}] );


    // 影像地圖RWD
    $('map').imageMapResize()

	// 滑動
	$('.pointer').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});





});