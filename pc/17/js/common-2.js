$( function(){

	// Mobile FB ＆ TOP icon
	var navp = $('.go, .pointer, .facebook');
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

		$('#myCarousel-A').owlCarousel({
		loop:true,
		margin:5,
		nav:true,
			autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
			slideBy: 2 ,
		responsive:{
			0:{
				
				
				stagePadding: 50,
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
	
	
	           $('a[href=#topbtn1],.date1').click(function() {
               $('html,body').animate({
                 scrollTop:$('#activity-1').offset().top
               }, 1000);
               return false;
           	   });

	           $('a[href=#topbtn2],.date2').click(function() {
               $('html,body').animate({
                 scrollTop:$('#activity-2').offset().top
               }, 1000);
               return false;
           	   });


});