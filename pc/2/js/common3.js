var navp = $('.right_box');
$(window).scroll(function () {
	if ($(window).scrollTop() == 0) {
		navp.css({
			'display': 'none',
			'opacity': '0',
			'width': '0'
		});

	} else {
		navp.css({
			'display': 'block',
			'opacity': '1',
			'width': '42px'
		});
	}
});
	
if ($(window).outerWidth() < 768) {
	//hashtag滑動 
	$('area[href^="#"], a[href^="#"]').on('click', function (event) {
		var target = $(this.getAttribute('href'));
		event.preventDefault();
		$('html, body').stop().animate({
			scrollTop: target.offset().top - 45
		}, 300);

		if (!$('#menu').hasClass("mFixed")){
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 91
			}, 300);
		}
	});
} else {
	$('area[href^="#"],#menu a[href^="#"]').on('click', function (event) {
		var target = $(this.getAttribute('href'));
		event.preventDefault();
		$('html, body').stop().animate({
			scrollTop: target.offset().top
		}, 300);
	});	
};
// Mobile 置頂選單控制
$(window).scroll(function () {
	var window_top = $(window).scrollTop();
	var div_top = $('#menu').height();
	if (window_top > div_top) {
		$('#menu').addClass('mFixed');
	} else {
		$('#menu').removeClass('mFixed');
	}
});
// 裝置判斷 PC or Mobile
var isMobile = {
	iMob: function () {
		return navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
	}
};
if (isMobile.iMob()) {
	console.log('mob');
	$('.menu_box').addClass('scroll_mob');
} else {
	console.log('pc');
	$('.menu_box').addClass('scroll_pc');
};

// 側選單
$('.arrow_right').click(function () {
	$(this).hide();
	$('.arrow_left').show();
	$("ul.menu_box").animate({ right: '-122px' });
});

$('.arrow_left').click(function () {
	$(this).hide();
	$('.arrow_right').show();
	$("ul.menu_box").animate({ right: '0px' });
});

$(".linkmore").on("click", function() {
	$(".fixedbutton_more").toggleClass("open")
});

// 滑動
$('.gotop').click(function () {
	$('html,body').animate({ scrollTop: '0px' }, 300);
});

$( "#primecard" ).click(function() {	
	$("#cardbox").show();		
	$(".flip").removeClass('change');	
	$(".flip").addClass('rubberBand');
	$(".fgh").show();
	$(".cashbox").show();
	setTimeout(function() {
		$(".front").removeClass('rr');
		$(".back").removeClass('rr');
	},2400);				
});

$( ".flip, .cardclose" ).click(function() {	
	$(".flip").removeClass('rubberBand');
	$(".flip").addClass('change');
	$(".fgh").hide();
	$(".cashbox").hide();
	$(".front").addClass('rr');
	$(".back").addClass('rr');
	setTimeout(function() {
		$("#cardbox").hide();
		$(".popup2").addClass('fill').addClass('animated');
	},1000);
});

$(document).keyup(function(e){
	if(e.keyCode === 27){
		$(".flip").removeClass('rubberBand');
		$(".flip").addClass('change');
		$(".fgh").hide();
		$(".cashbox").hide();
		$(".front").addClass('rr');
		$(".back").addClass('rr');

		setTimeout(function() {
			$("#cardbox").hide();
			$(".popup2").addClass('fill').addClass('animated');
		},1000);
	}	
});	

// click function to stay still (to work on smart phones)
$('.flip-container').click(function() {
	$(this).toggleClass("hover");
	$(this).find('.back').toggleClass("still");
});


$(".lighter").bind('animationend webkitAnimationEnd', function() { 
	$(this).removeClass('animated fadeIn').addClass('hue-rotate-play');
});

$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	disableOn: 700,
	type: 'iframe',
	mainClass: 'mfp-fade',
	removalDelay: 160,
	preloader: false,
	fixedContentPos: false
});




$(window).scroll(function(){
	if (  $(window).scrollTop() > 40 ) {
			$('#sliderRightF').css('top','40px');
			$('.RmenuArrowF').css('top','0px');
	}else {
			$('#sliderRightF').css('top','80px');
			$('.RmenuArrowF').css('top','40px');
	}
});
			
$( ".mainstage" ).click(function() {
	$(this).toggleClass( "active" );
		if ($( ".mainstage" ).is('.active')){
				$(".mainstage img").attr("src","img/icon_01-1.png");
			}else {
				$(".mainstage img").attr("src","img/sidebar_icon1.png");
		};
});	
			
$(".mainstage").hover(
	function(e){ $(".mainstage img").attr("src","img/icon_01-1.png"); }, // over
	function(e){ $(".mainstage img").attr("src","img/sidebar_icon1.png");}  // out
);
			
$(".substage").hover(
	function(e){ $(".substage img").attr("src","img/icon_02-1.png"); }, // over
	function(e){ $(".substage img").attr("src","img/sidebar_icon2.png");}  // out
);
							
// 手機版底頂選單開關
$( ".openF" ).click(function() {
	$(this).toggleClass( "active" );
	
		if ($( ".openF, .substage" ).is('.active')){
				$(".openF img, .substage img").attr("src","img/icon_02-1.png");
				$(".openF, .substage").hover(
					function(e){ $(".substage img").attr("src","img/icon_02-1.png"); }, // over
					function(e){ $(".substage img").attr("src","img/sidebar_icon2.png");}  // out
				);
			}else {
				$(".openF img").attr("src","img/sidebar_icon2.png");
		};
	
	$( ".RsubmenuF" ).toggleClass( "active" );
	$(".blackBoxF").toggleClass( "active" );
});	
			
$( ".blackBoxF, .submenu_close" ).click(function() {
	$(".openF").removeClass( "active" );
	$( ".RsubmenuF" ).removeClass( "active" );
	$(".blackBoxF").removeClass( "active" );
	$(".openF img").attr("src","img/sidebar_icon2.png");
});	
			
$('#RMenuOutF').click(function() {
	$(this).hide(), $('#RMenuInF').show(), $('#sliderRightF').animate({
		left: '-210px'
	})
}), $('#RMenuInF').click(function() {
	$(this).hide(), $('#RMenuOutF').show(), $('#sliderRightF').animate({
		left: '0px'
	})
});
 

