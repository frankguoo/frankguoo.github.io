$(document).ready(function(e) {
	// 遊戲開始
	$(".game_go span").click(function () {
        for (i = 1; i <= 11; i++) {
            $(".ball_" + i).removeClass("shake_" + i);
        }
        draw();
        $(this).addClass("none");
        $(".click").addClass("none");
	});
	function draw() {
	    var number = Math.floor(12 * Math.random() + 1);

	    for (i = 1; i <= 11; i++) {
	        $(".ball_" + i).removeClass("ani_" + i);
	        $(".ball_" + i).addClass("shake_" + i);
	    };
	    $(".game_go").addClass("rotate");

	    setTimeout(function () {
	        for (i = 1; i <= 11; i++) {
	            $(".ball_" + i).removeClass("shake_" + i);
	        }
	    }, 1100);
	    setTimeout(function () {
	    	console.log('ball',number);
	    	 $(".getBall").children("span").addClass("bg_"+number);
	        $(".getBall").removeClass("none").addClass("drop_Y");
	        
	        // 顯示結果燈箱
	        setTimeout(function () {
	        	$(".wrap .game_go, .popup").removeClass("none");
	        }, 900);
	    }, 1100)

	    //取消動畫
	    setTimeout(function () {
	        $(".getBall").addClass("none").removeClass("drop_Y");
	        $(".game_go").removeClass("rotate");
	        $(".game_go span").removeClass("none");
	    }, 2000)

	}

	// 隨機 
	function getRandom (min, max) { 
		return Math.floor(Math.random() * (max - min)) + min; 
	} 
	getNum = getRandom(1,9);
	console.log(getNum);
	if (getNum == 1 || getNum == 2){ 	//折價券
		console.log('活',getNum);
	    $('.popup .result').html('<b>恭喜獲得</b><p>日本旅遊上網卡<br>不降速吃到飽</p><a href="https://24h.pchome.com.tw/store/DYAFC1" target="_blank" class="btn">特價傳送門</a>');
	} else if (getNum == 3 || getNum == 4){	//推薦活動
		console.log('活',getNum);
		$('.popup .result').html('<b>恭喜獲得</b><p>Dr.Jart+獨家面膜<br>任選2件5折</p><a href="https://24h.pchome.com.tw/store/DDAFQV" target="_blank" class="btn">特價傳送門</a>');
	} else if (getNum == 5 || getNum == 6){	//推薦活動
		console.log('活',getNum);
		$('.popup .result').html('<b>恭喜獲得</b><p>Kworld WS-A8<br>真無線藍牙耳機<br>限時搶購55折</p><a href="https://24h.pchome.com.tw/prod/DCAYJN-A90098SK9?fq=/S/DYAQF4" target="_blank" class="btn">特價傳送門</a>');
	} else if (getNum == 7 || getNum == 8){//推薦活動
		console.log('明',getNum);
		$('.popup .result').html('<div class="again"><b>再接再厲<br>明天再來!</b></div>');
	}

	// 關閉燈箱
	$(".popup .close").click(function () {
	    $(".popup").addClass("none");
	    $(".click").removeClass("none");
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

    // 影像地圖RWD
    $('map').imageMapResize();
});