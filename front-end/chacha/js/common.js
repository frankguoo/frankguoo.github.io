$(function () {

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

setTimeout(function() {
	$(".c1").addClass('coin1');
	$(".c2").addClass('coin2');
	$(".c3").addClass('coin3');
	$(".c4").addClass('coin2');
	$(".c5").addClass('coin1');
	$(".c6").addClass('coin3');
},2600);	

// ev.preventDefault();

});

$( ".flip, .cardclose" ).click(function() {	
	$(".flip").removeClass('rubberBand');
	$(".flip").addClass('change');
	$(".fgh").hide();
	$(".cashbox").hide();
	$(".front").addClass('rr');
	$(".back").addClass('rr');
	$(".c1").removeClass('coin1');
	$(".c2").removeClass('coin2');
	$(".c3").removeClass('coin3');
	$(".c4").removeClass('coin2');
	$(".c5").removeClass('coin1');
	$(".c6").removeClass('coin3');

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
			$(".c1").removeClass('coin1');
			$(".c2").removeClass('coin2');
			$(".c3").removeClass('coin3');
			$(".c4").removeClass('coin2');
			$(".c5").removeClass('coin1');
			$(".c6").removeClass('coin3');

			setTimeout(function() {
				$("#cardbox").hide();
				$(".popup2").addClass('fill').addClass('animated');
			},1000);
	}	
});	

    
});

