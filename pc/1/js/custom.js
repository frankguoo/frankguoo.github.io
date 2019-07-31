jQuery(document).ready(function() {
	
	
	
	
	
	
	$('#myCarousel-A').owlCarousel({
			loop:true,
			margin:5,
			nav:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			slideBy: 1,
			responsive:{
				0:{
					stagePadding: 20,
					margin:0,
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
	
	
	
		$('#myCarousel-B').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			slideBy: 1,
			responsive:{
				0:{
					margin:0,
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

	
	
	
	
	
	
});


