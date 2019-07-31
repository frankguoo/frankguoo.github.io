$(function(){
	
		// 側邊選單開關換圖
		$('#RMenuOutF').click(function(){
		$(this).hide();
		$('#RMenuInF').show();
		$('#sliderRightF').animate({right:'-210px'});
	});

	$('#RMenuInF').click(function(){
		$(this).hide();
		$('#RMenuOutF').show();
		$('#sliderRightF').animate({right:'40px'});
	});
	
    // GO TOP箭頭圖片及手機版選單轉換
	$("#slidertopF").hover( function(){
		$(".arrawsF").html('<img src="img/up_black.png" alt="" />');
	}, function(){
		$(".arrawsF").html('<img src="img/up_white.png" alt="" />');
	});
	
	$(".mainstage").hover( function(){
		$(".mainstage").html('<i><img src="img/icon_01-1.png"></i>主會場');
	}, function(){
		$(".mainstage").html('<i><img src="img/sidebar_icon1.png"></i>主會場');
	});
	
	

			
		
		
	
		// 滑動
	$('#slidertopF').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
	
		// 手機版底頂選單開關
	$( ".openF" ).click(function() {
		$(this).toggleClass( "active" );
			if ($( ".openF" ).is('.active')){
					$(".openF img").attr("src","img/icon_02-1.png");
				}else {
					$(".openF img").attr("src","img/sidebar_icon2.png");
			};
		$( ".RsubmenuF" ).toggleClass( "active" );
		$(".blackBoxF").toggleClass( "active" );

	});	

	$( ".blackBoxF" ).click(function() {
		$(".openF").removeClass( "active" );
		$( ".RsubmenuF" ).removeClass( "active" );
		$(".blackBoxF").removeClass( "active" );
		$(".openF img").attr("src","img/sidebar_icon2.png");
	});		
		
			
 });