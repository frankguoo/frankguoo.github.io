
//EZ商品模組//
Vue.component('ez_pdbox', {
	template: '<section id="ez_pdbox"><div class="container-fluid container-default"><div class="row row-default"><div class="titlebox"><h2 class="bigtitle">{{bigtitle}}</h2><div class="smalltitle">{{smalltitle}}</div></div><div><div class="col col-xs-6 col-md-3" v-for="item in items"><div class="main_list_li"><div class="main_lipic"><a v-bind:href="item.href" target="_blank"><img v-bind:src="item.img_url" alt="item.img_name"/></a></div><div class="main_lititle"><a v-bind:href="item.href" target="_blank">{{item.maintitle}}</a></div><div class="main_litext">{{item.subtitle}}</div><div class="main_price">NT$<span>{{item.price}}</span><span class="other">{{item.other}}</span></div><a class="main_button" v-bind:href="item.href" target="_blank"><img src="images/shopping-cart.svg" width="25px">一口價</a></div></div></div></div></div><hr class="hr-20"></section>',
	props: ['bigtitle','smalltitle','items'],
})


//EZ大圖模組//
Vue.component('ez_bigphotobox', {
	template: '<section><div class="container-fluid container-default"><div class="row row_product2"><div class="titlebox"><h2 class="bigtitle">{{bigtitle}}</h2><div class="smalltitle ">{{smalltitle}}</div></div><div id="ez_bigphotobox" class="product_2"><ul><li v-for="item in items"><div class="imgbox col col-xs-12 col-md-8"><a v-bind:href="item.href" target="_blank"><img v-bind:src="item.img_url" alt="item.img_name"/></a> </div><div class="msgbox col col-xs-12 col-md-4"><h3>{{item.maintitle}}</h3><h4>{{item.brandname}}</h4><h4>{{item.productname}}</h4><div class="shopper"><p>{{item.shopper}}</p><p>{{item.content}}</p></div><a v-bind:href="item.href" target="_blank" class="btnbox"><span class="money"><b>一口價</b>$</span><span class="Price">{{item.price}}</span><span class="other">{{item.other}}</span></a></div></li></ul></div></div></div><hr class="hr-20"></section>',
	props: ['bigtitle','smalltitle','items'],
})


//EZ文章模組//
Vue.component('ez_articlebox', {
	template: '<section id="ez_articlebox"><div class="container-fluid container-default"><div class="row row-default"><div class="titlebox"><h2 class="bigtitle">{{bigtitle}}</h2><div class="smalltitle">{{smalltitle}}</div></div><div><div class="col col-xs-12 col-md-12" v-for="item in items"><div class="articlebox"><div class="main_lititle"><h3>{{item.article_title}}</h3></div><div class="main_litext" v-for="item in itemss"><div class="part">{{item.article_part}}</div></div><div class="author">{{item.shopper}}</div><div class="clearfix"><div class="imsbox" v-for="item in imgs"><img v-bind:src="item.img_url"></div></div></div></div></div></div></div><hr class="hr-20"></section>',
	props: ['bigtitle','smalltitle','items','itemss','imgs'],
})


//EZ首頁選單模組//
Vue.component('ezmainmenu', {
	template: '<header class="navbar ts-header"> <div class="container-fluid container-default"> <div class="row row-default"> <div class="header-wrap clearfix"> <ul class="nav navbar-nav"> <li class="dropdown" v-for="item in menu"> <a class="dropdown-toggle" v-bind:href="item.href"><img v-bind:src="item.img_url" alt="item.img_name"/>{{item.menu_name}}</a></li></ul> <div class="rightbar"> <span>以下內容ez易買提供 <a href="http://www.ezimport.co.jp/service_center.php?f_id=2" target="_blank">詳細說明</a> <a href="http://www.ezimport.co.jp/" target="_blank"><img src="images/auction-logo.png" alt=""/></a> </span> </div></div></div></div></header>',
	data: function() {
		return {
			menu: [
				{   
                menu_name: "首頁", 
                href: "//global.pchome.com.tw/sites/ezimport", 
                img_url: "images/home.svg", 
                img_name: "回首頁",
            	},
				{   
                menu_name: "購買3步驟", 
                href: "#P1", 
                img_url: "", 
                img_name: "",
            	},
				{   
                menu_name: "專屬優惠", 
                href: "#P2", 
                img_url: "", 
                img_name: "",
            	},
				{   
                menu_name: "代購一口價",
                href: "#P3",
                img_url: "", 
                img_name: "",
            	},

			]
        };
     }
})


//EZ內頁選單模組//
Vue.component('ezmenu', {
	template: '<header class="navbar ts-header"> <div class="container-fluid container-default"> <div class="row row-default"> <div class="header-wrap clearfix"> <ul class="nav navbar-nav"> <li class="dropdown" v-for="item in menu"> <a class="dropdown-toggle" v-bind:href="item.href"><img v-bind:src="item.img_url" alt="item.img_name"/>{{item.menu_name}}</a></li></ul> <div class="rightbar"> <span>以下內容ez易買提供 <a href="http://www.ezimport.co.jp/service_center.php?f_id=2" target="_blank">詳細說明</a> <a href="http://www.ezimport.co.jp/" target="_blank"><img src="images/auction-logo.png" alt=""/></a> </span> </div></div></div></div></header>',
	data: function() {
		return {
			menu: [
				{   
                menu_name: "首頁", 
                href: "//global.pchome.com.tw/sites/ezimport", 
                img_url: "images/home.svg", 
                img_name: "回首頁",
            	},
				{   
                menu_name: "購買3步驟", 
                href: "//global.pchome.com.tw/sites/ezimport/index.html#P1", 
                img_url: "", 
                img_name: "",
            	},
				{   
                menu_name: "專屬優惠", 
                href: "//global.pchome.com.tw/sites/ezimport/index.html#P2", 
                img_url: "", 
                img_name: "",
            	},
				{   
                menu_name: "代購一口價",
                href: "//global.pchome.com.tw/sites/ezimport/index.html#P3",
                img_url: "", 
                img_name: "",
            	},

			]
        };
     }
})

//EZ fatfooter模組//
Vue.component('fatfooter', {
	template: '<section class="fatfootersection"><div class="container-fluid container-default"> <div class="row row-default"> <div class="fatfooterbox_big_title col-md-12"> <h2 v-html="bigtitle"></h2> <h4>{{smalltitle}}</h4> </div><div class="col-md-12"><div class="fatfooterbox" v-for="item in countries1"><div class="title"><h4>{{item.country}}</h4></div><div class="buttonbox"><a v-for="item in buttons1" v-bind:href="item.href" target="_blank">{{item.button_name}}</a></div></div><div class="fatfooterbox" v-for="item in countries2"><div class="title"><h4>{{item.country}}</h4></div><div class="buttonbox"><a v-for="item in buttons2" v-bind:href="item.href" target="_blank">{{item.button_name}}</a></div><div class="small_notice"><span>{{small_notice}}</span></div></div></div></div><hr class="hr-20"></section>',
	data: function() {
		return {
		bigtitle: "代購一口價<br>出國必買人氣商品！",
		smalltitle: "價差大？買不到？代購獨享一口價！ 多種國外限量款輕鬆入手！",
		small_notice: "＊一口價已含所有代購費用：商品金額、國際運費、服務費、國外匯款手續費、國外當地運費。",
		countries1: [
		{
			country: "日本",
		},		
		],	
		buttons1: [
		{   
			href: "index_01.html", 
			button_name: "日本7-11人氣零嘴",
		},		
		{   
			href: "index_02.html", 
			button_name: "7-11獨家保養fancl/Kose聯名限定",
		},
		{   
			href: "index_03.html", 
			button_name: "煤油電暖爐",
		},
		{   
			href: "index_04.html", 
			button_name: "kakaku家電網評選 除溼機TOP8",
		},
		{   
			href: "index_05.html", 
			button_name: "名店拉麵",
		},
		{   
			href: "index_06.html", 
			button_name: "多功能聚餐神器",
		},
		{   
			href: "index_08.html", 
			button_name: "日本電子鍋",
		},
		{   
			href: "index_07.html", 
			button_name: "嬰幼用品與居家清掃好物",
		},
		{   
			href: "index_09.html", 
			button_name: "桌上的美術館-公仔收藏",
		},
		{   
			href: "index_10.html", 
			button_name: "美顏保健與美體按摩",
		},
		{   
			href: "index_11.html", 
			button_name: "日本空氣清淨機",
		},
		{   
			href: "http://www.ezimport.co.jp/buy/oneprice_edm.php?cate=24", 
			button_name: "美髮家電",
		},
		],
			
		countries2: [
		{
			country: "美國USA",
		},		
		],	
		buttons2: [
		{   
			href: "index_13.html", 
			button_name: "美國8大品牌服飾價差特選",
		},		

		{   
			href: "http://bibian.ezimport.co.jp/adidas/2150", 
			button_name: "adidas 潮鞋",
		},		
		{   
			href: "http://bibian.ezimport.co.jp/Outlet/Poloshirt/1302?brand=ralphlauren", 
			button_name: "Ralph Lauren 必買POLO衫",
		},
		{   
			href: "http://bibian.ezimport.co.jp/victoriassecret/2082", 
			button_name: "Victoria´s Secret 維多莉亞的秘密",
		},
		{   
			href: "http://bibian.ezimport.co.jp/category_brand.php?brand=superdry&id=1911", 
			button_name: "Superdry",
		},
		{   
			href: "http://bibian.ezimport.co.jp/%E7%94%B7%E8%A3%9D/%E4%B8%8A%E8%BA%AB%E9%A1%9E/%E5%B8%BDTee/1199?brand=underarmour", 
			button_name: "Under Armour",
		},
		{   
			href: "http://bibian.ezimport.co.jp/arcteryx/2284", 
			button_name: "Arc´teryx",
		},
		{   
			href: "http://bibian.ezimport.co.jp/carters/1888", 
			button_name: "Carter´s 童裝",
		},
		],
        };
     }
})

//EZ footer模組//
Vue.component('footerr', {
	template: '<section class="ts-columns ts-columns--3 footersection"><div class="container-fluid container-default"><div class="row footer_row"><div class="col col-xs-12 col-md-1"><img src="images/auction-logo2.png" alt=""/></div><div class="col col-xs-12 col-md-11"><div class="footer_top"><p>1.本活動內容係由「易買」所提供。2.未盡事宜請詳閱易買網站<a href="http://www.ezimport.co.jp/service_center.php?f_id=182" target="_blank">(會員權益)</a>說明。</p><p>3.PChome線上購物對於易買提供內容資料之正確性或合法性， (包括圖片、文字、數字、圖形) ，均不負任何責任。</p></div></div></div><div class="footer_bottom col col-xs-12 col-md-12">本活動頁商品規格、顏色、價位、贈品如與銷售網頁不符，以ez易買網頁標示為準<br>網路家庭版權所有Copyright PChome Online版權所有，轉載必究</div></div></section>',
	delimiters: ['${', '}'],
}) 

//EZ fixedbar模組//
Vue.component('fixedbar', {
	template: '<div><div class="gotop"></div><a href="//global.pchome.com.tw/sites/ezimport/index.html#pchome_only_box" class="fixedbar shadow_effect2"><img src="images/pchome.svg" alt="" width="75"/><h4>結帳優惠碼</h4><h4>立即領取</h4></a></div>',
	delimiters: ['${', '}'],
})













	
