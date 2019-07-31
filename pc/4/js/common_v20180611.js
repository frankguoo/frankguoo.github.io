
$( function(){

	// 所有資訊載入後執行
	$('.KV img').delay(100).queue(function (next) {
  		var swiperHeight = $('.KV img').height();
  		$('.promo_box').height((swiperHeight-100));
	});

	// 輪播
	$('body').delay(100).queue(function (next) {
	    var swiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			slidesPerView: 2, 	//顯示數量
			slidesPerGroup: 1, 	//一次切換幾個
			spaceBetween: 20,	//間距
			loop: true,			//循環
			autoHeight: true,
			pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
			},
	      	navigation: {
	        	nextEl: '.swiper-button-next',
	        	prevEl: '.swiper-button-prev',
	      	},
	      	autoplay: {
			    delay: 3000,
			    stopOnLastSlide: false,
			    disableOnInteraction: true,
		    },
		    breakpoints: {
		    	1280: {
		    		spaceBetween: 10,
		    	},
		    	1100: {
		    		spaceBetween: 5,
		    	},
	            1023: {
					direction: 'horizontal',
					freeMode: true, 			//取消只滑動1格,但不會貼齊
					freeModeSticky: true, 		//取消只滑動1格時也可貼齊
					slidesPerView: 3,
					slidesPerGroup: 1, 
					spaceBetween: 10,
	            },
	            480: {
					direction: 'horizontal',
					freeMode: false, 			//只滑動1格,會貼齊
					slidesPerView: 1,
					slidesPerGroup: 1, 
					spaceBetween: 10,
					slidesOffsetBefore: '10', 	//左偏移
					// slidesOffsetAfter: '10', //右偏移
	            },
		    },
			onImagesReady: function (swiper) {
			   resizeSwiper();
			   swiper.onResize();
			}
	    });

		function resizeSwiper() {
		    $('.swiper-container').height(($('.KV img').height())-100)
		}
		$(window).resize(function(){
		    resizeSwiper()
		});		
	});


	$('.share').click(function(){
		$('.more_shore').toggleClass("open_all");
	});

	// 關閉 固定置底APP Banner
	$('.app_close').click(function(){
		$('.app_download').hide(100);
		$('.keyword').addClass('noAPP');
		$('.right_box').addClass('noAPP');
	});

	// 儲值FAQ, 活動說明 收合
	$('.question').click(function(){
		$(this).next('.ans').slideToggle(200);
		$(this).children('.ques_text').children('span.open').toggle();
		$(this).children('.ques_text').children('span.close').toggle();
		$(this).children().next('.more').children('.more span.open').toggle();
		$(this).children().next('.more').children('.more span.close').toggle();
		$(this).children().next('.more').toggleClass('opacity');
	});

	// 螢幕寬度判別，PC or 行動裝置 版面控制
	var viewWidth = window.screen.availWidth;
	
	if ( (viewWidth) < 1024) {
		// Mobile文字跑馬燈
	    $('.marquee_box .marquee p:gt(0)').hide();
	    setInterval(function(){
	      $('.marquee_box .marquee p:first-child').fadeOut(800)
	         .next('p').fadeIn(800)
	         .end().appendTo('.marquee_box .marquee');}, 
	      4000);
	} if ( (viewWidth) < 769) {
		$(window).scroll(function(){
			// 選單控制
			if ( $(window).scrollTop() < 39 ) {
				$('.nav').removeClass('fixed');
			} else {
				$('.nav').addClass('fixed');
			}
		});
	} else {
		// PC文字跑馬燈
	    $('.section.marquee.pc p:gt(0)').hide();
	    setInterval(function(){
	      $('.section.marquee.pc p:first-child').fadeOut(800)
	         .next('p').fadeIn(800)
	         .end().appendTo('.section.marquee.pc');}, 
	      4000);
	}

	// Smooth scrolling with links, hashtag滑動 
	$('a[href^="#"]').on('click', function(event) {
	    var target = $(this.getAttribute('href'));
	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').stop().animate({
	            scrollTop: target.offset().top
	        }, 600);
	    }
	});

	// 滑動到最上
	$('.gotop').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});

    // 側邊 LINE，FB分享
	var navp = $('.right_box');
	$(window).scroll(function(){
		if ( $(window).scrollTop() == 0 ) {
			navp.css({
				'display':'none',
				'opacity':'0',
				'width':'0'
			});
			$('.primecard').css('width','0');

		} else {
			navp.css({
				'display':'block',
				'opacity':'1',
				'width':'42px'
			});
			$('.primecard').css('width','65px');
		}
	});


	// 撥放影片
	$('a.youtube').magnificPopup({
		disableOn: 100,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedBgPos: true,
		overflowY: 'hidden',
		fixedContentPos: true
	});

	$('.ajax-popup-link').magnificPopup({
		type:'inline',
		midClick: true,
		fixedContentPos: 'true',
		fixedBgPos: 'true',
		removalDelay: 100,
        mainClass: 'my-mfp-zoom-in'
	});

	// iframe RWD
	$('iframe').iFrameResize( [{
		inPageLinks	: true,
		log			: false
	}] );

    // 影像地圖RWD
    $('map').imageMapResize();
	

});


