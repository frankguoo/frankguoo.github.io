$(function() {
  var game = $('#game'),
      canvasW = 0,//遊戲畫面寬度
      canvasH = 0,//遊戲畫面高度
      score = 0,//總得分
      gongWidth = 0,//飛鏢寬度
      gongHeight = 0,//飛鏢高度
      targetTimer = 0,//射出次數
      defaultOption = {
        _k: 1, //遊戲畫面高度佔螢幕比例
        _g: 0.07, //飛鏢大小佔螢幕比例
        _a: 0.8, //射出的飛鏢與飛鏢主體的比例
        _s: 0.2 //分數區塊佔螢幕的比例
      },
      lastId = 0, //計分前起始分數
      hinderOPtion = {
        minWidth: 0.15,//Boxman寬度隨機大小值
        maxWidth: 0.15,
        minSpeedX: 35,//Boxman速度隨機大小值
        maxSpeedX: 40
      },
      targetOption = {
        minWidth: 0.1,//氣球寬度隨機大小值
        maxWidth: 0.1,
        minSpeedX: 35,//氣球速度隨機大小值
        maxSpeedX: 35
      },
      hinderArray = [],//回傳Boxman陣列
      targetArray = []//回傳氣球陣列

  //遊戲畫面渲染函式//    
  function drawGame(defaultOption) {
    canvasW = $('.wrap').innerWidth();
    canvasH = $(window).innerHeight() * defaultOption._k
      game.width(canvasW).height(canvasH)

      var newGong = new Image()
      newGong.src = './images/gong.png'
      newGong.id = 'gong'
      newGong.onload = function() {
        gongWidth = canvasW * defaultOption._g
        gongHeight = gongWidth * newGong.height / newGong.width
        $(newGong).css({
          'width': gongWidth,
          'margin-left': -canvasW * defaultOption._g / 2
        }).addClass('gong')
        game.append(newGong)
        
      }
      eventLoop()
  }

  //循環函式//  
  function eventLoop() {
    eventLoopHinder()
    clearHinder()
    eventLoopTarget()
    clearTarget()
    clickEvent()
  }

  //角度瀏覽器前綴函式//  
  function rotateAngle(angle, type) {
    return {
      'transform':'rotate'+type+'('+ angle +'deg)',
      '-ms-transform':'rotate'+type+'('+ angle +'deg)', 
      '-moz-transform':'rotate'+type+'('+ angle +'deg)',   
      '-webkit-transform':'rotate'+type+'('+ angle +'deg)', 
      '-o-transform':'rotate'+type+'('+ angle +'deg)'
    }
  }

  //transition函式//
  function setTransition(property, timing, speed) {
    return {
        'transition-property': property,
        '-moz-transition-property': property, 
        '-webkit-transition-property': property, 
        '-o-transition-property': property, 
        'transition-timing-function': timing,
        '-moz-transition-timing-function': timing, 
        '-webkit-transition-timing-function': timing, 
        '-o-transition-timing-function': timing, 
        'transition-duration': speed + 's',
        '-moz-transition-duration': speed + 's', 
        '-webkit-transition-duration': speed + 's', 
        '-o-transition-duration': speed + 's', 
    }
  }

  //Boxman物件屬性//
  function Hinder(id, width, speedX) {
    this.id = id || ''
    this.y = canvasH /2
    this.width = width || random(hinderOPtion.minWidth * canvasW, hinderOPtion.maxWidth * canvasW)
    this.speedX = speedX / 10 || random(hinderOPtion.minSpeedX, hinderOPtion.maxSpeedX) / 10
    this.shot = false
    this.score = 0
  }

  //Boxman物件生成原型鏈//
  Hinder.prototype.draw = function() {
    var hinderArray2 = [ //圖片列讀取
      {         
        "src": "./images/boxman1.png"
      },
      {         
        "src": "./images/boxman2.png"
      },	
      {         
        "src": "./images/boxman3.png"
      },
      {         
        "src": ""
      }
    ]
    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)) + min;
    };
    var random = getRandom(1,4) - 1;
    var img = new Image(),
        self = this
    img.src = hinderArray2[random]['src']
    img.id = self.id
    img.onload = function() {
      if ($(img).attr('src') == hinderArray2[2]['src']){
        $(img).css({
          'width': self.width * 1.2,
          'top': -75,
          'left': 0 - self.width /2
        }).css(setTransition('left', 'linear', self.speedX)).addClass('hinder');
      }else if($(img).attr('src') == hinderArray2[3]['src']){
        $(img).css({
          'width': self.width * 0.9,
          'top': -60,
          'left': 0 - self.width /2
        }).css(setTransition('left', 'linear', self.speedX)).addClass('hinder');
      }else{
        $(img).css({
          'width': self.width,
          'top': -60,
          'left': 0 - self.width /2
        }).css(setTransition('left', 'linear', self.speedX)).addClass('hinder');
      }
      $('.hinderbox').append(img);
      setTimeout(function() {
        $(img).css({'left': canvasW})
        self.shot = true
      }, 100)
    }
  }

  //Boxman角度原型鏈//
  Hinder.prototype.angle = function() {
    var left = parseInt($('#' + this.id).css('left'))
    if(left > canvasW) left = canvasW
    if(left < 0) left = 0
    var anglemax = Math.atan2( canvasH - this.y - gongHeight, left - canvasW / 2)
    var anglemin = Math.atan2( canvasH - this.y - gongHeight, left + this.width - canvasW / 2 )
    function angleCal(angle) {
      return (angle / Math.PI * 180) < 0 ? angle / Math.PI * 180 - 90 : angle / Math.PI * 180
    }
    var angleMax = angleCal(anglemax)
    var angleMmin = angleCal(anglemin)
    return {
      max: angleMax,
      min: angleMmin
    }
  }

  //氣球物件屬性//
  function Target(id, width, speedX) {
    this.id = id || ''
    this.y = canvasH /5
    this.width = width || random(targetOption.minWidth * canvasW, targetOption.maxWidth * canvasW)
    this.speedX = speedX / 10 || random(targetOption.minSpeedX, targetOption.maxSpeedX) / 10
    this.shot = false
    this.score = 0
  }

  //氣球生成原型鏈//
  Target.prototype.draw = function() {
    var targetArray3 = [ //圖片列讀取
      {         
        "src": "./images/balloon_pink.png"
      },
      {         
        "src": "./images/balloon_blue.png"
      },	
      {         
        "src": "./images/balloon_green.png"
      },
      {         
        "src": "./images/balloon_yellow.png"
      },
      {         
        "src": ""
      },
      {         
        "src": ""
      },
    ]
    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)) + min;
    };
    var random = getRandom(1,6) - 1;
    var img = new Image(),
        self = this
    img.src = targetArray3[random]['src']
    img.id = self.id
    img.onload = function() {
      $(img).css({
        'width': self.width,
        'top': -30,
        'left': canvasW - self.width/2
      }).css(setTransition('left', 'linear', self.speedX)).addClass('target');
      $('.targetbox').append(img);
      setTimeout(function() {
        $(img).css({'left': -self.width})
        self.shot = true
      }, 100)    
    }
  }

  //氣球角度原型鏈//
  Target.prototype.angle = function() {
    var left = parseInt($('#' + this.id).css('left'))
    var anglemax = Math.atan2( canvasH - this.y - gongHeight - this.width / 2, left - canvasW / 2)
    var anglemin = Math.atan2( canvasH - this.y - gongHeight - this.width / 2, left + this.width - canvasW / 2 )
    function angleCal(angle) {
      return (angle / Math.PI * 180) < 0 ? angle / Math.PI * 180 - 90 : angle / Math.PI * 180
    }
    var angleMax = angleCal(anglemax)
    var angleMmin = angleCal(anglemin)
    return {
      max: angleMax,
      min: angleMmin
    }
  }
  
  //隨機亂數函式//
  function random(min,max) {
      return parseInt(Math.random()*(max - min) + min);
  }

  //Boxman回傳陣列函式//
  function eventLoopHinder() {
    var id = Math.random().toString().split('.')[1]
    var newHinder = new Hinder(id)
    newHinder.draw()
    hinderArray.push(newHinder)
    setTimeout(eventLoopHinder, 800)
  }

  //Boxman清除陣列函式//
  function clearHinder() {
    hinderArray.forEach(function(item, index) {
      if(item.shot) {
        if($('#' + item.id).css('left') == canvasW + 'px') {
          $('#' + item.id).remove()
          hinderArray.splice(index, 1).splice(index, 2)
        }
      }
    })
    setTimeout(clearHinder, 1000)
    console.log(hinderArray);
  }

  //氣球回傳陣列函式//
  function eventLoopTarget() {
    var id = Math.random().toString().split('.')[1]
    var newTarget = new Target(id)
    newTarget.draw()
    targetArray.push(newTarget)
    setTimeout(eventLoopTarget, 800)
  }

  //氣球清除陣列函式//
  function clearTarget() {
    targetArray.forEach(function(item, index) {
        if($('#' + item.id).css('left') == '-' + item.width + 'px') {
          $('#' + item.id).remove()
          targetArray.splice(index, 1).splice(index, 2).splice(index, 3).splice(index, 4)
        }
    })
    setTimeout(clearTarget, 1000)
    console.log(targetArray);
  }

  //分數計算函式//
  function changeScore(id, sc, x, y) {
    if(id !== lastId) {
      $('.score').remove()
      $('#talk').remove()
      lastId = id
      score += sc
      $('#gong').attr('src', './images/gong.png')
      var img = new Image()
      img.src = './images/score.png'
      img.id = 'talk'
      img.onload = function() {
        if(sc > 0) {
          sc = '+' + sc
        }
        var scoreDiv = '<div class="score">' + sc + '</div>'
        game.append(img).append(scoreDiv)
        $('#talk').css({
          width: canvasW * defaultOption._s,
          left: x,
          top: y * 1.2
        })
        $('.score').css({
          'left': x + $('#talk').width() / 4,
          'top': y * 1.2 + $('#talk').width() / 4,
          'font-size': $('#talk').width() / 4,
          'font-weight': 'bold'
        })
        setTimeout(function() {
          $('#talk, .score').fadeOut()
        }, 200)
        $('#totalScore').html('得分: ' + score);
        $('#popscore').html(score);
        console.log(score);
        console.log(sc);
      }
    }   
  }

  //點擊發射函式//
  function clickEvent() {
      game.on('click',function(e) {
        e.preventDefault;
        var x, y, time
        var marginW = $(window).innerWidth() - 768,
          marginLeftW = marginW/ 2
          time = new Date().getTime()

          if ($(window).innerWidth() < 768) {
            var y = e.clientY
          }else if($(window).innerWidth() >= 768) {
            var y = e.clientY 
          }
          if ($(window).innerWidth() < 768) {
            var x = event.clientX
          }else if($(window).innerWidth() >= 768) {
            var x = event.clientX - marginLeftW
          }
        $('.arrow').remove()
        var hinderTimes = 0,
            targetTimes = 0
        if(new Date().getTime() - time < 200) {
          var touchAngle = Math.atan2(canvasH - y - gongHeight, x - canvasW / 2) / Math.PI * 180,
              isFail = false,
              gongAngle = 90 - touchAngle
          $('#gong').css(rotateAngle(gongAngle, 'Z'))
          var newArrow = new Image()
              newArrow.src = './images/arrow.png'
          newArrow.id = 'arrow'
          newArrow.onload = function() {
            var speed = 0.01,
                scale = newArrow.height / newArrow.width,
                width = gongWidth * defaultOption._a
            $(newArrow).css({
              'width': width /2,
              'top': canvasH - width * scale,
              'margin-left': -gongWidth * defaultOption._a / 2,
            }).css(rotateAngle(gongAngle, 'Z')).css(setTransition('all', 'linear', speed)).addClass('arrow')
            game.append(newArrow)
            
            hinderArray.forEach(function(item, index) {
              var angleObj = item.angle()
              var left = parseInt($('#' + item.id).css('left'))
              if(touchAngle > angleObj.min && touchAngle < angleObj.max  && hinderTimes === 0) {
                hinderTimes++
                var bottom = canvasH - item.y - $(newArrow).width() * scale / 2
                var arrowLeft = bottom / (canvasH - y) * (x - canvasW / 2) //依據tan值算出left值
                $('#arrow').css({
                  left: arrowLeft + canvasW / 2,
                  top: canvasH - bottom - newArrow.height / 2 + 100 ,
                  margin: 0
                })
                var newImg = new Image()
                    newImg.src = './images/balloon-shot.png'
                newImg.onload = function() {
                    $(newImg).addClass('hinder').css({
                      left: left,
                      top: item.y,
                      width: item.width / 1.2,
                    })
                  if(!item.type) {
                    if ($('#' + item.id).attr('src') == "./images/boxman1.png"){
                      newImg.src = './images/boxman-shot1.png'
                      item.score = -30
                    }else if($('#' + item.id).attr('src') == "./images/boxman2.png"){
                      newImg.src = './images/boxman-shot2.png'
                      item.score = -25
                    }else if($('#' + item.id).attr('src') == "./images/boxman3.png"){
                      newImg.src = './images/boxman-shot3.png'
                      item.score = -20
                    }
                  } 
                  game.append(newImg)
                  $('#' + item.id).remove()
                  $(newImg).fadeOut(1500, function(){
                    $(this).remove()
                  })
                  setTimeout(function() {
                    changeScore(item.id, item.score, left, item.y)
                    $('#arrow').fadeOut()
                  }, 100)
                }
                hinderArray.splice(index, 1)
                isFail = true
              }
            })



            if(!isFail) {
              clearTimeout(targetTimer)
              targetArray.forEach(function(item, index) {
                var angleObj = item.angle()
                var left = parseInt($('#' + item.id).css('left'))
                var bottom = canvasH - item.y - $(newArrow).width() * scale / 2
                var arrowLeft = bottom / (canvasH - y) * (x - canvasW / 2) //依據tan值算出left值

                if(touchAngle >= angleObj.min - 2 && touchAngle <= angleObj.max + 2 && targetTimes === 0) {
                  targetTimes++
                  var newImg = new Image()
                      newImg.src = './images/balloon-shot.png'
                  newImg.onload = function() {
                      $(newImg).addClass('target').css({
                        left: left,
                        top: item.y,
                        width: item.width,
                      })
                    if(!item.type) {
                      $('#arrow').css({
                        left: arrowLeft + canvasW / 2,
                        top: canvasH - bottom - newArrow.height / 2 + 100 ,
                        margin: 0
                      })
                      if ($('#' + item.id).attr('src') == "./images/balloon_blue.png"){
                        newImg.src = './images/balloon_blue-shot.png'
                        item.score = 30
                      }else if($('#' + item.id).attr('src') == "./images/balloon_green.png"){
                        newImg.src = './images/balloon_green-shot.png'
                        item.score = 25
                      }else if($('#' + item.id).attr('src') == "./images/balloon_pink.png"){
                        newImg.src = './images/balloon_pink-shot.png'
                        item.score = 20
                      }else if($('#' + item.id).attr('src') == "./images/balloon_yellow.png"){
                        newImg.src = './images/balloon_yellow-shot.png'
                        item.score = 15
                      }
                    } 
                    game.append(newImg)
                    $('#' + item.id).remove()
                    $(newImg).fadeOut(1500, function(){
                      $(this).remove()
                    })
                    setTimeout(function() {
                      changeScore(item.id, item.score, left, item.y) 
                      $('#arrow').fadeOut()
                    }, 100)
                  }
                  targetArray.splice(index, 1)
                }

                $('#arrow').css({
                  left: (arrowLeft + canvasW / 2 - $(newArrow).width()),
                  top: (canvasH - bottom - newArrow.height / 2),
                  margin: 0
                })
                setTimeout(function() {
                  $('#arrow').fadeOut()
                }, 100)
              })
            }
          }
        }
      })
  }
  function init() {
    drawGame(defaultOption)
  }
  init();

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

      $( ".door_left" ).animate({
        left: -768
      }, 1000, "linear")
      $( ".door_right" ).animate({
        right: -768
      }, 1000, "linear", function() {
        $( ".screen_intro" ).animate({
          top: -670
        });
        $('.tittle').animate({
          top: -670
        });
        $('.section_intro').fadeOut(1000, "linear", function() {
          $('.section_intro').hide();

          var startCountdown = $('.startcountdownNum').html();//遊戲開始前倒數
          var gamecountdown = $('.gamecountdown').html();//遊戲中倒數
          
          setInterval(function() {
            startCountdown--;
            $('.startcountdownNum').html(startCountdown);
                if (startCountdown == 0) {

                    $('.startcountdown').remove();
                    var countdownGo = setInterval(function() { 
                      gamecountdown--;
                      $('.gamecountdown').html(gamecountdown);               
                      if (gamecountdown == 0) {
                        clearInterval(countdownGo);
                        $('#endGame').show();
                        if (score == 0) {
                          $('.lose, .losebtn').show();
                        }else if (score >= 30) {
                          $('.lose, .losebtn').addClass('hide');
                          $('.winner, .winnerbtn').removeClass('hide');
                        }
                        $('#restartbtn').click(function(e){
                          e.preventDefault();
                          location.reload();
                        });
                      }
                    }, 1000);

                }
          },1000);

        });
      });

      $('.section_game').show().addClass('fadeIn');
     
    });
  });
})