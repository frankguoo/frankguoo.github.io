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

//活動說明開關
$('.event_more').click(function(){
    $('#explain').show();
});
$('.close_btn').click(function(){
    $('#explain').hide();
});

// 裝置判斷 PC or Mobile
var isMobile = {
    iMob: function() {
        return navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
    }
};
if( isMobile.iMob() ) {
    $('p.worrying').hide();
};
    
// 遊戲開始
$('.game_start').click(function(){

    var countdown = $('.countdown_num').html();
    var interval1 = setInterval(function() {
        if (countdown == 0) {
            clearInterval(interval1);
            $('.rain-wrap').show();
            $('.countdown').hide();

            var over_time = $('.count_num').html();
            var a = 0;
            var count = a;
            $('.rain-wrap').redEnvelope({
                'clickFun': clickFun
            });

            function clickFun() {
                var src = $(this).attr('src');
                src = src.substring(src.length - 5, src.length - 4);
                if (src >= 3 && src < 6) {
                    $(this).attr('src', 'images/fd7.png');
                } else if (src < 3 && src < 6) {
                    $(this).attr('src', 'images/fd6.png');
                }
                $(this).fadeOut(500);

                // 計算點擊數
                a++
                if (a >= 16){
                    $('.cupon').html('<a href="https://ecvip.pchome.com.tw/m/?0xd8b1ee6e4ea2b0e48e36517649a786dddf330324c274e85d8296961561c02c926787c534687c73a8&actid=C006035" target="_blank"><img src="images/cupon_84_beauty_v2.png"></a>');
                    $('.cupon_text').html('<p class="cupon_text"><a href="https://ecvip.pchome.com.tw/m/?0xd8b1ee6e4ea2b0e48e36517649a786dddf330324c274e85d8296961561c02c926787c534687c73a8&actid=C006035" target="_blank">折價券捷徑入口 前往查看</a></p>');
                    $('.winner').removeClass('hide').addClass('show');
                    $('.lose').addClass('hide');
		        }

                console.log('click',a);
                $('.click').html(a);
            }

            var interval2 = setInterval(function() { 
                over_time--;
                $('.count_num').html(over_time);               
                if (over_time == 0) {
                    clearInterval(interval2);
                    $('.rain-wrap').remove();
                    $('#endGame').show();
                    // console.log('click',a);
                }
            }, 1000);

        } else {
            countdown--;
            $('.countdown_num').html(countdown);
        }
    }, 1000);
});