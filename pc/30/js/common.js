$( function(){

	var navp = $('img.gotop, img.FB_m');
	$(window).scroll(function(){
		if (  $(window).scrollTop() == 0 ) {
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

	// 關閉 固定置底APP Banner
	$('.app_close').click(function(){
		$('.app_download').hide(100);
		$('.footer').addClass('noAPP');
		$('.gotop_box').addClass('noAPP');
	});

	// 再玩一次
    $(".next-btn").click(function() {
        location.reload(true);
    });

    // 禁用雙指縮放
    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, false);

    // 禁用手指雙擊縮放
    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

});