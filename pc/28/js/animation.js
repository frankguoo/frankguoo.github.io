(function () {
  // ie GG
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    $('.ie-mask').css('display', 'block');
  }

  $(window).on("load", function () {
    $('.loading_mask').addClass('fadeOut').show().delay(500).fadeOut(0);
    setTimeout(animation, 400);
  })

  function animation() {
    var obj = [
      {
        type: 1,
        img: 'img/card_back1.png',
      },
      {
        type: 1,
        img: 'img/card_back1.png',
      },
      {
        type: 2,
        img: 'img/card_back2.png',
      },
      {
        type: 2,
        img: 'img/card_back2.png',
      },
      {
        type: 3,
        img: 'img/card_back3.png',
      },
      {
        type: 3,
        img: 'img/card_back3.png',
      },
    ]
    //隨機排列陣列
    obj.sort(randomsort);

    //印出&於父層加入屬性data-value
    $(".back.face").each(function (index) {
      var backHtml = '<img src="' + obj[index].img + '">'
      $(this).html(backHtml);
      $(this).parent().attr('data-value', obj[index].type);
    });

    //點擊卡片數量
    var count = 0;
    //目前的data-value
    var nowValue = '';
    var $cardItem = $('.flip_card-item');

    function flipCard() {
      $(this).addClass('rotation');
      thisValue = $(this).data('value');
      if (count % 2 !== 0 && thisValue !== nowValue) {
        //條件符合則全部關閉
        allFlipBack();
      } else {
        count++;
        nowValue = thisValue;
        console.log(count, nowValue);
        if (count > 0 && count % 2 == 0) {
          borderLight();
        }
        if (count === 6) {
          // 六格全開遊戲結束
          setTimeout(success, 1000);
        }
      }
    }
    //關閉並重置
    function allFlipBack() {
      count = 0;
      nowValue = '';
      $cardItem.addClass('pointer_none');
      setTimeout(function () {
        $cardItem.removeClass('rotation box-shadow');
      }, 800)
      setTimeout(function () {
        $cardItem.removeClass('pointer_none');
      }, 1000);
    }
    function success() {
      var $successMask = $('.success_mask');
      var $successModal = $('.success_modal');
      $successMask.css('display', 'block');
      $successModal.css('display', 'block');
      TweenLite.from($successMask, 0.5, { opacity: 0, ease: Power0.easeNone });
      TweenLite.from($successModal, 0.5, { opacity: 0, y: '-=50px', ease: Power2.easeOu });
      setTimeout(function () {
        $('.fireworks').css('display', 'block');
      }, 400)
    };
    function borderLight() {
      console.log('success');
      var nowValue2 = nowValue;
      setTimeout(function () {
        $('.flip_card-item[data-value="' + nowValue2 + '"]').addClass('box-shadow');
      }, 300);
    }
    $cardItem.on('click', flipCard);

    //用Math.random()函式生成0~1之間的隨機數與0.5比較，返回-1或1
    function randomsort(a, b) {
      return Math.random() > .5 ? -1 : 1;
    }
  }
})();

