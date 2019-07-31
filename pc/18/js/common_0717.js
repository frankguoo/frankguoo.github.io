
// 側選單
$('.right_menu .arrow_box').click(function () {
	$('.right_menu .arRight').toggleClass('rotate');
	$('.right_menu .menu_box').toggleClass('gohide');
});
$('.left_menu .arrow_box').click(function () {
	$('.left_menu .arLeft').toggleClass('rotate');
	$('.left_menu .menu_box').toggleClass('gohide');
});
$('li.subevent a, .menuMask').click(function () {
	$('.left_menu .menu_box, .menuMask').toggleClass('show');
});
$(window).scroll(function () {
	if ($(window).scrollTop() >= 50) {
		$('.right_menu, .left_menu').addClass('subfixed');
	} else {
		$('.right_menu, .left_menu').removeClass('subfixed');
	}
});

// hashtag Smooth scrolling
var $clickTag = $('area[href^="#"], .menu_box a[href^="#"], .gotopMB a[href^="#"], a.gotheme');
$clickTag.click(function () {
	var target = $(this.getAttribute('href'));
	if ($(window).width() < 768) {
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 50
			}, 300);
		}
		return false;
	} else {
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 300);
		}
		return false;
	}
});


// 版頭輪撥
var mySwiper = new Swiper('.swiper-container', {
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
	},
	mousewheel: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});
mySwiper.mousewheel.disable();

var $videoSrc;
$('.video-btn').click(function () {
	$videoSrc = $(this).data("src");
});
// when the modal is opened autoplay it  
$('#movie').on('shown.bs.modal', function (e) {
	$("#video").attr('src', $videoSrc + "&autoplay=1&modestbranding=1&showinfo=0&rel=0");
});

$('#movie').on('hide.bs.modal', function (e) {
	$("#video").attr('src',$videoSrc); 
});

// 影像地圖RWD
// $('map').imageMapResize();
