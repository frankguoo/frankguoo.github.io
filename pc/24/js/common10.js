$(function(){
  var $li = $('ul.tab-title li');
    $($li.eq(0).addClass('active').find('a').attr('href')).siblings('.tab-inner').hide();
    $li.click(function(){
      event.preventDefault();
      $($(this).find('a'). attr ('href')).show().siblings ('.tab-inner').hide();
      $(this).addClass('active').siblings('.active').removeClass('active');
	});
	
	 var useragent = navigator.userAgent;
	 var useAPP = useragent.match(/PChome/);
	 if (useAPP == 'PChome') {
	   $('.warn').text('上方圖片請使用手機截圖功能儲存至相簿');
	 }else{
	   $('.warn').text('請長按上方圖片儲存至手機相簿');
	 }
});
$(".ball").draggable();

$("#trash").droppable({
  accept: ".ball",
  classes: {
	"ui-droppable-hover": "trash-active"
  },
  drop: function(event, ui){
	$(this).addClass('trash-active')
	$(ui.draggable).fadeOut( "slow", function() {
	  $(this).remove();
	  $('.trash').removeClass('trash-active');
	});
  }
});


$("#group1 .tabbody img.cakebody").click(function() {
	var cakebodyNum = $('.section_game img.cakebody').length;
	$(this).clone().appendTo(".game_wrap").css({"margin":"0 auto", "display":"block", "top": "30%", "position": "absolute"}).addClass('ball').draggable();
	if ( cakebodyNum >= 1){
		$('.section_game img.cakebody').remove();
		$(this).clone().appendTo(".game_wrap").css({"margin":"0 auto", "display":"block", "top": "30%", "position": "absolute"}).addClass('ball').draggable();
	}
});
$("#group2 .tabbody img, #group3 .tabbody img").click(function() {
	$(this).clone().appendTo(".game_wrap").css({"margin":"0 auto", "display":"block", "top": "30%", "position": "absolute"}).addClass('ball').draggable();
});

$(".trash").on("click", function() {
	$('.game_wrap .ball').remove();
});
  
$(".note").on("click", function() {
	html2canvas(document.getElementById("game"), {
		scale: 4
	}).then(function(canvas) {
		console.log(canvas.toDataURL("image/png"));
		var myImage = canvas.toDataURL("image/png");
		$("#droppable, .header_desktop, .header_mobile, .loading_mask, body > .wrap").remove();
		$('body').prepend('<div class="wrap active"> <img src="' + myImage + '"alt="" style="margin-top: -30px;"> </div>');
	});
		$("html, body, .poppop").addClass("active");	
});

$(".closeGetit").on("click", function() {
	$('.poppop').hide();
});

$(function(){
	$('.open-popup-link').magnificPopup({
		type:'inline',
		fixedBgPos: 'true',
		removalDelay: 100,
        mainClass: 'my-mfp-zoom-in'
	});

	$('.click_start').click(function(){
		$('.header_mobile').hide();
		$('.wrap').addClass('active');
		$('.section_intro').addClass('fadeOut').delay(400).hide();
		$('.section_game').show().addClass('fadeIn');
	});
});
