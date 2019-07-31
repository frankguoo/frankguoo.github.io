var turnplate={
		restaraunts:[],				//大轉盤獎品名稱
		colors:[],					//大轉盤獎品區塊對應背景顏色
		outsideRadius:197.5,		//大轉盤外圓的半徑
		textRadius:160,				//大轉盤獎品位置距離圓心的距離
		insideRadius:68,			//大轉盤內圓的半徑
		startAngle:0,				//開始角度
		bRotate:false				//false:停止;ture:旋轉
};

$(document).ready(function(){

	//動態添加大轉盤的獎品與獎品區域背景顏色
	turnplate.restaraunts = ["美妝單品\n$100\n折價券", "再接\n再厲", "家電單品\n$200\n折價券", "不要\n灰心", "美妝單品\n$100\n折價券", "要再\n加油喔!", "生活單品\n$150\n折價券", "給你一\n個擁抱"];
	turnplate.colors = ["#e32432", "#3da4e8", "#df531f", "#f0c324","#e32432", "#3da4e8", "#df531f", "#f0c324"];
	turnplate.gift = ["美妝單品滿$800<br>現抵$100折價券", "0", "家電單品滿$2000<br>現抵$200折價券", "0", "美妝單品滿$800<br>現抵$100折價券", "0", "生活單品滿$1500<br>現抵$150折價券", "0"];
	turnplate.link = ["http://shopping.pchome.com.tw/marketing/coupon/v2/couponsend.htm?id=5ac1e56ea409dman1", "0",
					  "http://shopping.pchome.com.tw/marketing/coupon/v2/couponsend.htm?id=5ac1e8c36f3bcman1", "0",
					  "http://shopping.pchome.com.tw/marketing/coupon/v2/couponsend.htm?id=5ac1e56ea409dman1", "0", 
					  "http://shopping.pchome.com.tw/marketing/coupon/v2/couponsend.htm?id=5ac1e660635f8man2", "0"
					  ];

	var rotateTimeOut = function (){
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:2160,
			duration:6000,
			callback:function (){
				alert('網絡超時，請檢查您的網絡設置！');
			}
		});
	};

	//旋轉轉盤 item:獎品位置; txt：提示語;
	var rotateFn = function (item, txt){
		var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		$('#wheelcanvas').stopRotate();
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:4000,
			callback:function (){	//回調
				// alert('恭喜中獎了');
				console.log(item);
				var result = turnplate.restaraunts[item-1];
				result = result.replace('\n', '');
				console.log(result);

				if (item == 1 || item == 3 || item == 5 || item == 7) {
					$('#youGetit h2').html('恭喜中獎<br>快幫媽媽買禮物');
					$('.btn_box').html('<a href="'+ turnplate.link[item-1] +'"><div class="btn get">點我領取</div></a>');
					// $('#youGetit h3').html(result);
					$('#youGetit h3').html(turnplate.gift[item-1]);
				} else if (item == 2 || item == 4 || item == 6 || item == 8) {
					$('#youGetit h2').html('別灰心~再來一次');
					$('#youGetit h3').html(result);
					$('#youGetit .next-btn').show();
					$('#youGetit h4, .btn_box').hide();
					$('#youGetit').addClass('lose');
				} 

		        $.magnificPopup.open({
		            items: {
		                src: '#youGetit'
		            },
		            midClick: true,
		            fixedContentPos: 'true',
					closeOnBgClick: false,
		            fixedBgPos: 'true',
		            mainClass: 'my-mfp-zoom-in',
		            type: 'inline'
		        }, 0);
			}
		});
	};

	$('.pointer').click(function (){
		if(turnplate.bRotate)return;
		turnplate.bRotate = !turnplate.bRotate;
		//獲取隨機數(獎品個數範圍內)
		var item = rnd(1,turnplate.restaraunts.length);
		//獎品數量等於10,指針落在對應獎品區域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
		rotateFn(item, turnplate.restaraunts[item-1]);
		/* switch (item) {
			case 1:
				rotateFn(252, turnplate.restaraunts[0]);
				break;
			case 2:
				rotateFn(216, turnplate.restaraunts[1]);
				break;
			case 3:
				rotateFn(180, turnplate.restaraunts[2]);
				break;
			case 4:
				rotateFn(144, turnplate.restaraunts[3]);
				break;
			case 5:
				rotateFn(108, turnplate.restaraunts[4]);
				break;
			case 6:
				rotateFn(72, turnplate.restaraunts[5]);
				break;
			case 7:
				rotateFn(36, turnplate.restaraunts[6]);
				break;
			case 8:
				rotateFn(360, turnplate.restaraunts[7]);
				break;
			case 9:
				rotateFn(324, turnplate.restaraunts[8]);
				break;
			case 10:
				rotateFn(288, turnplate.restaraunts[9]);
				break;
		} */
		console.log(item);
	});
});

function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
	
}


//頁面所有元素加載完畢後執行drawRouletteWheel()方法對轉盤進行渲染
window.onload=function(){
	drawRouletteWheel();
};

function drawRouletteWheel() {    
  var canvas = document.getElementById("wheelcanvas");    
  if (canvas.getContext) {
	  //根據獎品個數計算圓周角度
	  var arc = Math.PI / (turnplate.restaraunts.length/2);
	  var ctx = canvas.getContext("2d");



	  //在給定矩形內清空一個矩形
	  ctx.clearRect(0,0,422,422);
	  //strokeStyle 屬性設置或返回用於筆觸的顏色、漸變或模式  
	  ctx.strokeStyle = "#e42424";
	  //font 屬性設置或返回畫布上文本內容的當前字體屬性
	  ctx.font = '28px Microsoft YaHei'; 


	  for(var i = 0; i < turnplate.restaraunts.length; i++) {       
		  var angle = turnplate.startAngle + i * arc;		 
		  ctx.fillStyle = turnplate.colors[i];
		  ctx.beginPath();
		  //arc(x,y,r,起始角,結束角,繪制方向) 方法創建弧/曲線（用於創建圓或部分圓）    
		  ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
		  ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
		  ctx.stroke();  
		  ctx.fill();
		  //鎖畫布(為了保存之前的畫布狀態)
		  ctx.save();

		  //設定文字陰影
		  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
		  ctx.shadowOffsetX = 2;
		  ctx.shadowOffsetY = 2;
		  ctx.shadowBlur = 1;

		  //改變畫布文字顏色
		  var b = i+2;
		  if(b%2){
		  	 ctx.fillStyle = "#333233";
		  	 ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
		  	}else{
		  	 ctx.fillStyle = "#f3c82e";
		  	 ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
		  	};



		  //----繪制獎品開始---- 
		  	  	  
		  var text = turnplate.restaraunts[i];
		  var line_height = 22;



		  //translate方法重新映射畫布上的 (0,0) 位置
		  ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
		  
		  //rotate方法旋轉當前的繪圖
		  ctx.rotate(angle + arc / 2 + Math.PI / 2);
		  
		  /** 下面代碼根據獎品類型、獎品名稱長度渲染不同效果，如字體、顏色、圖片效果。(具體根據實際情況改變) **/
		  if(text.indexOf("\n")>0){		//判斷字符進行換行
			  var texts = text.split("\n");
			  for(var j = 0; j<texts.length; j++){
				  ctx.font = j == 0?'bold 21px Microsoft YaHei':'bold 21px Microsoft YaHei';
				  if(j == 0){
					  ctx.fillText(texts[j]+"\n", -ctx.measureText(texts[j]+"\n").width / 2, j * line_height);
				  }else{
					  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height*1.2); //調整行間距
				  }
			  }
		  }else if(text.indexOf("\n") == -1 && text.length>8){	//獎品名稱長度超過一定範圍 
			  text = text.substring(0,8)+"||"+text.substring(8);
			  var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else{
		  		
			  //在畫布上繪制填色的文本。文本的默認顏色是黑色 
			  //measureText()方法返回包含一個對象，該對象包含以像素計的指定字體寬度
			  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		  }
		  
		  //添加對應圖標
		  
		  if(text.indexOf(turnplate.restaraunts[0])>=0){
			  var img= document.getElementById("diy1-img");
			  img.onload=function(){  
				  ctx.drawImage(img,-35,20);      
			  };  
			  ctx.drawImage(img,-35,20);  
		  };
		  if(text.indexOf(turnplate.restaraunts[1])>=0){
			  var img= document.getElementById("diy1-img");
			  img.onload=function(){  
				  ctx.drawImage(img,-35,20);      
			  }; 
			  ctx.drawImage(img,-35,20);  
		  };
		  if(text.indexOf(turnplate.restaraunts[2])>=0){
			  var img= document.getElementById("diy1-img");			
			  img.onload=function(){  
				  ctx.drawImage(img,-25,35);      
			  };  
			  ctx.drawImage(img,-30,35);  
		  };
		  if(text.indexOf(turnplate.restaraunts[3])>=0){
			  var img= document.getElementById("diy1-img");
			  img.onload=function(){  
				  ctx.drawImage(img,-35,20);      
			  };  
			  ctx.drawImage(img,-35,20);  
		  };
		  if(text.indexOf(turnplate.restaraunts[4])>=0){
			  var img= document.getElementById("diy1-img");
			  img.onload=function(){  
				  ctx.drawImage(img,-30,20);      
			  };  
			  ctx.drawImage(img,-30,20);  
		  };
		  if(text.indexOf(turnplate.restaraunts[5])>=0){
			  var img= document.getElementById("diy1-img");
			  img.onload=function(){  
				  ctx.drawImage(img,-35,20);      
			  };  
			  ctx.drawImage(img,-35,20);  
		  };
		  if(text.indexOf(turnplate.restaraunts[6])>=0){
			  var img= document.getElementById("diy1-img");			  
			  img.onload=function(){  
				  ctx.drawImage(img,-30,20);      
			  };  
			  ctx.drawImage(img,-30,20);  
		  };
		  
		  if(text.indexOf(turnplate.restaraunts[7])>=0){
			  var img= document.getElementById("diy1-img");
			  img.onload=function(){  
				  ctx.drawImage(img,-35,20);      
			  };  
			  ctx.drawImage(img,-35,20);  
		  };
		  
		  
		  //把當前畫布返回（調整）到上一個save()狀態之前 
		  ctx.restore();
		  //----繪制獎品結束----
	  }     
  }
};