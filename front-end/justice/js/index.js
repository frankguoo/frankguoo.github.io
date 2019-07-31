$(function(){
	//story
	$('#story .owl-carousel').owlCarousel({
		items : 1 ,
		nav : true ,
		dots : false
	})
	
	function arrowSize(){
		$('#story .arrow.up').css('border-right-width',$(window).width());
		$('#story .arrow.down').css('border-left-width',$(window).width());
	}
	
	arrowSize();
	
	$(window).on('resize',function(){
		arrowSize();
	})
	
	//case
	$(window).on('load resize',function(){
		$('#case .small-img a span').each(function(index, element) {
        	$(this).css('margin-top', -1 * $(this).height() / 2);
    	});
	});
	
	$('#case .wrap .img-show .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
		URLhashListener: true,
		startPosition: 'URLHash',
		responsive : {
			0 : {
				nav: true
			},
			900 : {
				nav: false
			}
		}
	});
})