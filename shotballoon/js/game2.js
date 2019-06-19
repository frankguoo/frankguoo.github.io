$(function(){
  var game = $('#game'), //遊戲畫面id
      gameW = 0, //遊戲畫面寬度 
      gameH = 0, //遊戲畫面高度
      score = 0, //遊戲得分
      gongWidth = 0, //標靶寬度
      gongHeight = 0, //標靶高度
      targetTimer = 0, //標靶寬度
      defaultOption = {
        _k: 1, //遊戲畫面高度佔螢幕比例
        _g: 0.05, //標靶佔螢幕比例
        _a: 1, //標靶頭與標靶比例
        _s: 0.2 //分數佔螢幕比例
      },
      isShot = false, //標靶是否射出
      lastId = 0,
      hinderOPtion = {
        startY: 0.4,  //Y軸亂數起始點
        endY: 0.6,  //Y軸亂數結束點
        minWidth: 0.15, //寬度亂數最小值
        maxWidth: 0.2, //寬度亂數最大值
        minSpeedX: 35, //速度亂數最小值
        maxSpeedX: 40 //速度亂數最大值
      },
      hinderArray = [ //圖片列讀取
       
      ],
      addscoreOPtion = {
        startY: 0.4,  //Y軸亂數起始點
        endY: 0.6,  //Y軸亂數結束點
        minWidth: 0.15, //寬度亂數最小值
        maxWidth: 0.2, //寬度亂數最大值
        minSpeedX: 35, //速度亂數最小值
        maxSpeedX: 40 //速度亂數最大值
      },
      addscoreArray = [ //圖片列讀取
        {         
          "src": "./images/balloon.png",
          "score": 30
        },
        {         
          "src": "./images/balloon.png",
          "score": 10
        },	
        {         
          "src": "./images/balloon.png",
          "score": 5
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

  function rotateAngle(angle, axis) { //旋轉的transform變數
    return {
      'transform':'rotate'+axis+'('+ angle +'deg)',
      '-ms-transform':'rotate'+axis+'('+ angle +'deg)', 
      '-webkit-transform':'rotate'+axis+'('+ angle +'deg)', 
    }
  } 

  function setTransition(property, timing, speed) { //transition變數
    return {
        'transition-property': property,
        '-ms-transition-property': property, 
        '-webkit-transition-property': property, 
        'transition-timing-function': timing,
        '-ms-transition-timing-function': timing, 
        '-webkit-transition-timing-function': timing, 
        'transition-duration': speed + 's',
        '-ms-transition-duration': speed + 's', 
        '-webkit-transition-duration': speed + 's', 
    }
  }    

  function drawGame() { //遊戲畫面長寬
      gameW = $('.wrap').innerWidth();
      gameH = $(window).innerHeight() * defaultOption._k
      game.width(gameW).height(gameH)
  
    var newGong = new Image() //標靶基本設定
        newGong.src = './images/gong.png'
        newGong.id = 'gong'
        newGong.onload = function() {
          gongWidth = gameW * defaultOption._g
          $(newGong).css({
            'width': gongWidth,
            'margin-left': - gameW * defaultOption._g / 2
          }).addClass('gong')
          game.append(newGong)
        }
        eventLoop()
  }

  function eventLoop() { //循環
    eventLoopHinder()
    clearHinder()
    eventLoopAddscore()
    clearAddscore()
    clickEvent()
  }

  function random(min,max) { //大小值區間隨機整數
    return parseInt(Math.random()*(max - min) + min);
  }

  function Hinder(id, type, startY, speedX) { //扣分物件原形鏈
    this.id = id
    this.type = type
    this.y = startY || random(hinderOPtion.startY * gameH, hinderOPtion.endY * gameH)
    this.speedX = speedX / 10 || random(hinderOPtion.minSpeedX, hinderOPtion.maxSpeedX) / 10
    this.shot = false
    this.score = -30
  }

  Hinder.prototype.draw = function() { //扣分物件基本設定
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
    console.log(random);
    var img = new Image(),
        _self = this
      img.src = hinderArray2[random]['src']
      img.id = _self.id
      img.onload = function() {
      $(img).css({
        'width': _self.width,
        'top': 300,
      }).css(setTransition('left', 'linear', _self.speedX)).addClass('hinder');
      game.append(img);
      setTimeout(function() {
        $(img).css({'left': gameW})
        _self.shot = true
      }, 100)
    }
  }

  Hinder.prototype.angle = function() {
    var left = parseInt($('#' + this.id).css('left'))
    if(left > gameW) left = gameW
    if(left < 0) left = 0
    var anglemax = Math.atan2( gameH - this.y - gongHeight / 2, left - gameW / 2)
    var anglemin = Math.atan2( gameH - this.y - gongHeight / 2, left + this.width - gameW / 2 )
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


  function eventLoopHinder() { //扣分物件產出
    var id = Math.random().toString().split('.')[1]
    var newHinder = new Hinder(id)
    newHinder.draw()
    hinderArray.push(newHinder)
    setTimeout(eventLoopHinder, 1000)
  }

  function clearHinder() { //扣分物件完畢刪除
    hinderArray.forEach(function(item, index) {
      if(item.shot) {
        if($('#' + item.id).css('left') == gameW + 'px' || $('#' + item.id).css('left') == -item.width + 'px') {
          $('#' + item.id).remove()
          hinderArray.splice(index, 1)
          console.log(hinderArray);
        }
      }
    })
    setTimeout(clearHinder, 1000)
  }

  function Addscore(id, startY, speedX) { //加分物件原形鏈
    this.id = id
    this.y = startY
    this.speedX = speedX / 10 || random(addscoreOPtion.minSpeedX, addscoreOPtion.maxSpeedX) / 10
    this.shot = false
    this.score = +30
  }

  Addscore.prototype.draw = function() { //加分物件基本設定
    function getRandom2(min,max){
        return Math.floor(Math.random()*(max-min+1)) + min;
    };
    var random2 = getRandom2(1,6) - 1;
    console.log(random2);
    var imgg = new Image(),
        _self = this
      imgg.src = addscoreArray[random2]['src']
      imgg.id = _self.id
      imgg.onload = function() {
        
      $(imgg).css({
        'width': _self.width,
        'top': 50,
        'right': 0
      }).css(setTransition('right', 'linear', _self.speedX)).addClass('target');
      game.append(imgg);
      setTimeout(function() {
        $(imgg).css({'right': gameW})
        _self.shot = true
      }, 100)
    }
  }

  function eventLoopAddscore() { //加分物件產出
    var id = Math.random().toString().split('.')[1]
    var newAddscore = new Addscore(id)
    newAddscore.draw()
    addscoreArray.push(newAddscore)
    setTimeout(eventLoopAddscore, 1000)
  }

  function clearAddscore() { //加分物件完畢刪除
    addscoreArray.forEach(function(item, index) {
      if(item.shot) {
        if($('#' + item.id).css('right') == gameW + 'px') {
          $('#' + item.id).remove()
          addscoreArray.splice(index, 1)
        }
      }
    })
    setTimeout(clearAddscore, 1000)
  }
   
  function clickEvent() {
    game.on('click',function(e) {
      var x, y, time
      x = event.clientX
      y = event.clientY
      time = new Date().getTime()     


        var clickAngle = Math.atan2(gameH - y - gongHeight / 2, x - gameW / 2) / Math.PI * 180,

            gongAngle = 90 - clickAngle
        $('#gong').css(rotateAngle(gongAngle, 'Z'))

        var newArrow = new Image()
        newArrow.id = 'arrow'
        newArrow.src = './images/arrow.png'
        newArrow.onload = function() {
          var speed = 0.1,
              scale = newArrow.height / newArrow.width,
              width = gongWidth * defaultOption._a
          $(newArrow).css({
            'width': width,
            'top': gameH - width * scale,
            'margin-left': - gongWidth/ 2,
          }).css(rotateAngle(gongAngle, 'Z')).css(setTransition('all', 'linear', speed)).addClass('arrow')
          game.append(newArrow)

          hinderArray.forEach(function(item, index) {
            var angleObj = item.angle()
            isFail = false,
            hinderTimes = 0,
            targetTimes = 0
            var left = parseInt($('#' + item.id).css('left'))
            hinderTimes++
            var bottom = gameH - item.y - $(newArrow).width() * scale / 2
            var arrowLeft = bottom / (gameH - y) * (x - gameW / 2)
            $('.arrow').css({
              left: arrowLeft + gameW / 2,
              top: 0,
              margin: 0
            })
            var newImg = new Image()
            newImg.src = ''
    
            newImg.onload = function() {
              $(newImg).addClass('hinder').css({
                left: left,
                top: item.y,
                width: item.width,
              })
  
              game.append(newImg)
              $('#' + item.id).remove()
              $(newImg).fadeOut('normal', function(){
                $(this).remove()
              })
              setTimeout(function() {
                changeScore(item.id, item.score, left, item.y) 
                $('.arrow').fadeOut()
              }, 100)
            }
            hinderArray.splice(index, 1)
            isFail = true
          })



        }
     
    })
}


function init() {
  drawGame(defaultOption)
}
init()
 
})


  