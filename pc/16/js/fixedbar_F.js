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
		$('#sliderRightF').animate({right:'0px'});
	});
	
		// GO TOP箭頭圖片轉換
	$("#slidertopF").hover( function(){
	}, function(){
		$(".arrawsF").html('<img src="img/up_black.png" alt="" />');
	});
	
		// 滑動
	$('#slidertopF').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
	
		// 手機版置頂選單開關
	$( ".openF" ).click(function() {
		$(this).toggleClass( "active" );
		$( ".RsubmenuF" ).toggleClass( "active" );
		$(".blackBoxF").toggleClass( "active" );
	});	

	$( ".blackBoxF" ).click(function() {
		$(".openF").removeClass( "active" );
		$( ".RsubmenuF" ).removeClass( "active" );
		$(".blackBoxF").removeClass( "active" );
	});		
		
			
 });