jQuery(document).ready(function() {

  var animation = 'spotlight';
  var options = {};
  var lastChecked;

  function animate()
  {
    $('.mainBody').animate(animation);
  }
  $(animate);

 
	
	function bbb(){
		$(".tittle").addClass("downtoup-play");
		$(".tittle_shadow").addClass("downtoup-play2");
		$(".mainbg,.mainbgM").addClass("hue-rotate-play");
	}
	
	
	setTimeout(function() {
		$(".tittle.mobile, .tittle_shadow.mobile").css("z-index","9");
	 	bbb();
 	},2800);
});