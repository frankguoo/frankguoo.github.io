$(function() {
  var game = $('#game'),
      canvasW = 0,
      canvasH = 0,
      score = 0,
      gongWidth = 0,
      gongHeight = 0,
      targetTimer = 0,
      defaultOption = {
        _k: 1, //画布高占屏幕比例
        _g: 0.05, //弓箭占屏幕比例
        _a: 0.5, //箭占弓的比例
        _s: 0.2 //分数占屏幕比例
      },
      isShot = false, //箭完成发射
      lastId = 0, //计算分数前一个id
      hinderOPtion = {
        startY: 0.4, //障碍绘制区域所在相对于画布的位置弓
        endY: 0.6,
        minWidth: 0.15, //与屏幕宽度比值
        maxWidth: 0.15,
        minSpeedX: 35,
        maxSpeedX: 40
      },
      targetOption = {
        startY: 0.4,
        endY: 0.6,
        minWidth: 0.1, //与屏幕宽度比值
        maxWidth: 0.1,
        minSpeedX: 35,
        maxSpeedX: 35
      },
      arrowOption = {
        speedX: 0,
        speedY: 0
      },
      hinderArray = [],
      targetArray = [],
      arrowArray = [],
      i = 0,//设定加载障碍频率
      j = 0 //设定加载目标频率
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
  function eventLoop() {
    eventLoopHinder()
    clearHinder()
    eventLoopTarget()
    clearTarget()
    touchEvent()
  }
  function rotateAngle(angle, type) {
    return {
      'transform':'rotate'+type+'('+ angle +'deg)',
      '-ms-transform':'rotate'+type+'('+ angle +'deg)', 
      '-moz-transform':'rotate'+type+'('+ angle +'deg)',   
      '-webkit-transform':'rotate'+type+'('+ angle +'deg)', 
      '-o-transform':'rotate'+type+'('+ angle +'deg)'
    }
  } 
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
  function Hinder(id, width, speedX) {
    this.id = id || ''
    this.y = canvasH /2
    this.width = width || random(hinderOPtion.minWidth * canvasW, hinderOPtion.maxWidth * canvasW)
    this.speedX = speedX / 10 || random(hinderOPtion.minSpeedX, hinderOPtion.maxSpeedX) / 10
    this.shot = false
    this.score = -15
  }
  Hinder.prototype.draw = function() {
    var hinderArray2 = [ //圖片列讀取
      {         
        "src": "./images/balloon.png",
        "score": -30
      },
      {         
        "src": "./images/balloon-shot.png",
        "score": -10
      },	
      {         
        "src": "./images/balloon_08.png",
        "score": -5
      }
    ]
    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)) + min;
    };
    var random = getRandom(1,3) - 1;
    var img = new Image(),
        _self = this
    img.src = hinderArray2[random]['src']
    img.id = _self.id
    img.onload = function() {
      $(img).css({
        'width': _self.width,
        'top': _self.y,
      }).css(setTransition('left', 'linear', _self.speedX)).addClass('hinder');
      game.append(img);
      setTimeout(function() {
        $(img).css({'left': canvasW})
        _self.shot = true
      }, 100)
    }
  }
  Hinder.prototype.angle = function() {
    var left = parseInt($('#' + this.id).css('left'))
    if(left > canvasW) left = canvasW
    if(left < 0) left = 0
    var anglemax = Math.atan2( canvasH - this.y - gongHeight / 2, left - canvasW / 2)
    var anglemin = Math.atan2( canvasH - this.y - gongHeight / 2, left + this.width - canvasW / 2 )
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
  function Target(id, width, speedX) {
    this.id = id || ''
    this.y = 50
    this.width = width || random(targetOption.minWidth * canvasW, targetOption.maxWidth * canvasW)
    this.speedX = speedX / 10 || random(targetOption.minSpeedX, targetOption.maxSpeedX) / 10
    this.shot = false
    this.score = 30
  }

  Target.prototype.draw = function() {
    var targetArray3 = [ //圖片列讀取
      {         
        "src": "./images/balloon.png",
        "score": -30
      },
      {         
        "src": "./images/balloon.png",
        "score": -10
      },	
      {         
        "src": "./images/balloon.png",
        "score": -5
      },
      {         
        "src": "",
        "score": 0
      },
      {         
        "src": "",
        "score": 0
      },
      {         
        "src": "",
        "score": 0
      },
    ]
    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)) + min;
    };
    var random = getRandom(1,6) - 1;

    var img = new Image(),
        _self = this
    img.src = targetArray3[random]['src']
    img.id = _self.id
    img.onload = function() {
      $(img).css({
        'width': _self.width,
        'top': _self.y,
      }).css(setTransition('left', 'linear', _self.speedX)).addClass('target');
      game.append(img);
      setTimeout(function() {
        $(img).css({'left': canvasW})
        _self.shot = true
      }, 100)    }
  }
  Target.prototype.angle = function() {
    var left = parseInt($('#' + this.id).css('left'))
    var anglemax = Math.atan2( canvasH - this.y - gongHeight / 2 - this.width / 2, left - canvasW / 2)
    var anglemin = Math.atan2( canvasH - this.y - gongHeight / 2 - this.width / 2, left + this.width - canvasW / 2 )
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
  
  function random(min,max) {
      return parseInt(Math.random()*(max - min) + min);
  }

  function eventLoopHinder() {
    var id = Math.random().toString().split('.')[1]
    var newHinder = new Hinder(id)
    newHinder.draw()
    hinderArray.push(newHinder)
    setTimeout(eventLoopHinder, 800)
  }
  function clearHinder() {
    hinderArray.forEach(function(item, index) {
      if(item.shot) {
        if($('#' + item.id).css('left') == canvasW + 'px' || $('#' + item.id).css('left') == -item.width + 'px') {
          $('#' + item.id).remove()
          hinderArray.splice(index, 1)
        }
      }
    })
    setTimeout(clearHinder, 1000)
  }
  function eventLoopTarget() {
    var id = Math.random().toString().split('.')[1]
    var newTarget = new Target(id)
    newTarget.draw()
    targetArray.push(newTarget)
    setTimeout(eventLoopTarget, 500)
  }
  function clearTarget() {
    targetArray.forEach(function(item, index) {
      if(item.shot) {
        if($('#' + item.id).css('left') == canvasW + 'px') {
          $('#' + item.id).remove()
          targetArray.splice(index, 1)
        }
      }
    })
    setTimeout(clearTarget, 1000)
  }



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
          top: y
        })
        $('.score').css({
          'left': x + $('#talk').width() / 4,
          'top': y + $('#talk').width() / 4,
          'font-size': $('#talk').width() / 4,
          'font-weight': 'bold',
          'margin-left': '-3px'
        })
        setTimeout(function() {
          $('#talk, .score').fadeOut()
        }, 100)
        $('#totalScore').html('得分 :' + score)
      }
    }   
  }
  function touchEvent() {
      
      game.on('click',function(e) {
        var x, y, time
      var time = new Date().getTime()
          x = e.clientX
          y = 0
        $('.arrow').remove()
        var hinderTimes = 0,
            targetTimes = 0
        if(new Date().getTime() - time < 200) {
          var touchAngle = Math.atan2(canvasH - y - gongHeight / 2, x - canvasW / 2) / Math.PI * 180,
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
              'width': width,
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
                var arrowLeft = bottom / (canvasH - y) * (x - canvasW / 2) //根据tan值算出具体left
                $('#arrow').css({
                  left: arrowLeft + canvasW / 2,
                  top: canvasH - bottom - newArrow.height / 2,
                  margin: 0
                })
                var newImg = new Image()
                    newImg.src = './images/balloon-shot.png'
                newImg.onload = function() {
                  $(newImg).addClass('hinder').css({
                    left: left,
                    top: item.y,
                    width: item.width,
                  })
                  if(!item.type) {
                    $(newImg).css({
                      'transform':'rotateY(180deg)',
                      '-ms-transform':'rotateY(180deg)', 
                      '-moz-transform':'rotateY(180deg)',   
                      '-webkit-transform':'rotateY(180deg)', 
                      '-o-transform':'rotateY(180deg)'
                    })
                  } 
                  game.append(newImg)
                  $('#' + item.id).remove()
                  $(newImg).fadeOut('normal', function(){
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
                var bottom = canvasH - item.y - $(newArrow).width() * scale / 2
                var arrowLeft = bottom / (canvasH - y) * (x - canvasW / 2) //根据tan值算出具体left\
                if(touchAngle >= angleObj.min - 2 && touchAngle <= angleObj.max + 2 && targetTimes === 0) {
                  targetTimes++
                  $('#' + item.id).attr('src', './images/balloon-shot.png').fadeOut(1000, function() {
                    $(this).remove()
                  })
                  targetArray.splice(index, 1)
                  setTimeout(function() {
                    changeScore(item.id, item.score, x, y)
                    clearTarget()
                  }, 100)
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
  init()
})