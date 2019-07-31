$(function(){

    // 影像地圖RWD
    $('map').imageMapResize();
    
	lottery.lottery({
		selector:     '#lottery',
		width:        3,
		height:       3,
		index:        0,    // 初始位置
		initSpeed:    350,  // 初始轉動速度
		upStep:       80,   // 加速滾動步長
		upMax:        100,  // 速度上限
		downStep:     40,   // 減速滾動步長
		downMax:      100,  // 减速上限
		waiting:      1200,
		aim: function () {  // 重寫計算中獎號的方法：aim
			this.options.target = parseInt(parseInt(Math.random() * 10) * this._count() / 10);
			console.log(this.options.target+1);
			var giftNo = this.options.target+1

			$('p.popup_07').removeClass('hide');
			$('p.popup_07').addClass('hide');

			if (giftNo == 7) {
				$('#youGetit h2').html('');
				$('p.popup_07').removeClass('hide');
			} else {
				$('p.popup_07').addClass('hide');
				$('#youGetit h2').html('<img src="img/item/popup_0'+ giftNo +'.jpg">');
				
			}
			
		}
	});	


	// 燈箱
	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true,
		fixedContentPos: 'true',
		fixedBgPos: 'true',
		removalDelay: 100,
        mainClass: 'my-mfp-zoom-in'
	});
	
	var navp = $('img.gotop, img.FB_m');
	$(window).scroll(function(){
		if ($(window).scrollTop() == 0 ) {
			navp.css("opacity","0");
		}else {
			navp.css("display","block");
			navp.css("opacity","0.8");
		}
	});

	// 滑動
	$('img.gotop, li.top').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});

    // 側選單
	$('.arrow_right').click(function(){
		$(this).hide();
		$('.arrow_left').show();
		$("ul.menu_box").animate({right:'-122px'});
	});

	$('.arrow_left').click(function(){
		$(this).hide();
		$('.arrow_right').show();
		$("ul.menu_box").animate({right:'0px'});
	});

	// 關閉 固定置底APP Banner
	$('.app_close').click(function(){
		$('.app_download').hide(100);
		$('.footer').addClass('noAPP');
		$('.gotop_box').addClass('noAPP');
	});


	

});