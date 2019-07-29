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

  $('#startbtnv').click(function(){
    $('.header_mobile').hide();
    $('.wrap').addClass('active');
    $('.section_intro').hide();
    $('.section_valentine').show();
    $('.section_valentine_input').show();
  });


  $("#nameSubmit").click(function (e) {
    var id_check=/[^a-zA-Z\u4E00-\u9FA5]/g;//帳號只能是英文加上數字//

    if ($("#name").val()==""){
        alert("請輸入您的名稱!");
        $("#name").focus();
        return false;
    }
    else if ($("#name").val().indexOf(' ')>=0){
        alert("請不要在帳號中使用空格!!");
        $("#name").focus();
        return false;
    } 
    else if ($("#name").val().match(id_check)){
        alert("請勿使用非中英文字當做名稱!");
        $("#name").focus();
        return false;
    }else{
      e.preventDefault();
      $('#t4').text($('#name').val());
      $('.section_valentine_input').hide();
      $('.section_valentine_slot').show();
    }

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

  $('#play').on("click", function() {

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
              $('.section_valentine_final').show();
              var answer1 = $('#bar ul li:nth-child(5) p').text();                                                                                                                              
              var answer2 = $('#bar2 ul li:nth-child(5) p').text();
              var answer3 = $('#bar3 ul li:nth-child(5) p').text();

              $('#t1').text(answer1);
              $('#t2').text(answer2);
              $('#t3').text(answer3);

              $('.section_valentine_slot').hide();

              
            }, 5000);
          }
        }, x * i * 1.1);
      })(i);
    }



  });

});
});
