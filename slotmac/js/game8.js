$(function() {

  $(".closeGetit").on("click", function() {
    $('.poppop').hide();
  });

    
    $('.open-popup-link').magnificPopup({
      type:'inline',
      fixedBgPos: 'true',
      removalDelay: 100,
      mainClass: 'my-mfp-zoom-in'
    });
  
    $('.click_start').click(function(){
      $('.header_mobile').hide();
      $('.wrap').addClass('active');
      $('.section_intro').hide();
      $('.section_valentine').show();
    });


     



$(function(){	
  var barWidth = $('#bar ul li').width();
  var barHeight = $('#bar ul li').height();
  var barLength = $('#bar ul li').length;
  function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
  };

  function moveDown2() {
    $('#bar2 ul').animate({
      top: + barHeight
    }, 80, function () {
      $('#bar2 ul li:last-child').prependTo('#bar2 ul');
      $('#bar2 ul').css('top', '');
    });
  };
function moveDown3() { 
  $('#bar3 ul').animate({
    top: + barHeight
  }, 70, function () {
    $('#bar3 ul li:last-child').prependTo('#bar3 ul');
    $('#bar3 ul').css('top', '');
  });
}; 

  function moveTop() {
    $('#bar ul').animate({
      top: - barHeight
    }, 60, function () {
      $('#bar ul li:first-child').appendTo('#bar ul');
      $('#bar ul').css('top', '');
    });
  };


  $('button').on("click", function() {

    a = getRandom(70,80);
    b = getRandom(81,90);
    c = b+6;

    for (var i=0; i<=a; i++) {
      (function(x){
        setTimeout(function () {
          moveTop();
        }, x * i * 1.1);
      })(i);
    }

    for (var i=0; i<=b; i++) {
      (function(x){
        setTimeout(function () {
          moveDown2();
        }, x * i * 1.1);
      })(i);
    }

    for (var i=0; i<=c; i++) {
      (function(x){

        setTimeout(function () {

          moveDown3();

          if (x == c){
            setTimeout(function () {
              var answer1 = $('#bar ul li:nth-child(5)').text();
              var answer2 = $('#bar2 ul li:nth-child(5)').text();
              var answer3 = $('#bar3 ul li:nth-child(5)').text();
              alert(answer1+answer2+answer3);
            }, 2000);
          }

        }, x * i * 1.1);

      })(i);
    }

  });

});
});
