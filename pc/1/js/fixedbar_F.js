$(function(){
	
	// 側邊選單開關換圖
		$('#RMenuOutF').click(function(){
		$(this).hide();
		$('#RMenuInF').show();
		$('.RmenuBoxF').animate({right:'-210px'});
	});

	$('#RMenuInF').click(function(){
		$(this).hide();
		$('#RMenuOutF').show();
		$('.RmenuBoxF').animate({right:'0px'});
	});
	
		
	// 滑動
	$('.RmenuTopF').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
	
			
 });