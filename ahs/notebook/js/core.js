$(function(){

	$("#zhuan .item a").on('click' , function(){
		$("#zhuan .item a").removeClass('active');
		$(this).addClass('active');
	 	$("html,body").animate({scrollTop:$('#'+$(this).data("href")).offset().top-35},300);
	})

	var mySwiper = new Swiper('.swiper-container',{
			  freeMode : true,
			  slidesPerView : '3',			
		 });
		$(".pre").click(function(){
		   	mySwiper.swipePrev();
		});
	    $(".next").click(function(){
	    	mySwiper.swipeNext();
	    });

	var nav_height = $(".header").outerWidth(true);

	window.onscroll = function(){ 
		var top_div = $( ".cat_list" ); 
		//var a = "number" == typeof window.innerHeight ? window.innerHeight: document.documentElement.clientHeight;
	    //var t = document.documentElement.scrollTop || document.body.scrollTop;
	    var t =$(document).scrollTop();
	    
	    if( nav_height - t <= 20) { 
	        top_div.css({
	        	"position": "fixed",
				"top":0,
				"left": 0,
				"background-color": "#fff",
				"z-index": 9999
	        })
	    } else { 
	        top_div.css({
	        	"position": "static",
	        })
	    }
	}
     

	/********业务开始*********/

	var url = "http://m.mk.aiweixiu.com/api/activity/ahs/act/getNoteBookPrice";
	//var url = "http://192.168.1.100:8081/api/activity/ahs/act/getNoteBookPrice";
	//var url = "http://www.bd.com/mobile/ahs/notebook/test.php";

	var good_apple = [{
		categoryId:5,//笔记本
		brandId:52, //苹果
		goodsId:[21024, 17718, 17707, 17985, 17720, 17984, 17721, 17980, 17970, 17974]
	}];

	var good_lenovo = [{
		categoryId:5,//笔记本
		brandId:18,//联想
		goodsId:[6061, 20814, 17151, 17150, 20792, 20794, 6062, 9355, 6075, 20763]
	}];

	var goodInfo =[{
				categoryId:5,//笔记本
				brandId:103,//华硕
				goodsId:[6305, 17014, 19751, 19469, 6301, 19408, 20734, 19849, 19457, 19776]
			},{
				categoryId:64,//智能手表
				brandId:9,//华为
				goodsId:[22470]
			},{
				categoryId:64,//智能手表
				brandId:52,//苹果
				goodsId:[17513, 17518]
			},{
				categoryId:64,//智能手表
				brandId:7,//三星
				goodsId:[23225, 23180, 20496]
			},{
				categoryId:65,//游戏机
				brandId:17,//索尼
				goodsId:[1801, 1802, 17301, 17302]
			},{
				categoryId:6,//平板电脑
				brandId:52,//苹果
				goodsId:[9640, 8757, 9641, 1795]
			},{
				categoryId:6,//平板电脑
				brandId:375,//Kindle
				goodsId:[22863, 22866, 22865, 22861, 22860, 19461]
			}];

	$.ajax({
		url: url,
		type: "post",
		data: {
			"data" : '{"goodsInfo" :  '+JSON.stringify(good_apple)+'}'
		},
		dataType:'json'
	}).done(function(e){
		if(e.code == '0'){
			var len = e.body.length;
			var html = '';
			if(len > 0){
				for (var i = 0; i < len; i++) {
					html += '<li class="special-item"><p class="good-picture"><img src="image/apple/apple-'+e.body[i].goodId+'.png"></p><p class="good-price">￥<span class="money">'+e.body[i].goodPrice+'</span></p><p class="good-link"><a href="http://m.aihuishou.com/product/'+e.body[i].goodId+'.html?utm_source=m_ahs&utm_medium=m_ahs_banner&utm_campaign=m_highprice_notebooknew">&nbsp;</a></p></li>';
				}

				$("#apple-special .special-list").html(html);
			}
		}
	})

	$.ajax({
		url: url,
		type: "post",
		data: {
			"data" : '{"goodsInfo" :  '+JSON.stringify(good_lenovo)+'}'
		},
		dataType:'json'
	}).done(function(e){
		if(e.code == '0'){
			var len = e.body.length;
			var html = '';
			if(len > 0){
				for (var i = 0; i < len; i++) {
					html += '<li class="special-item"><p class="good-picture"><img src="image/lenovo/lenovo-'+e.body[i].goodId+'.png"></p><p class="good-price">￥<span class="money">'+e.body[i].goodPrice+'</span></p><p class="good-link"><a href="http://m.aihuishou.com/product/'+e.body[i].goodId+'.html?utm_source=m_ahs&utm_medium=m_ahs_banner&utm_campaign=m_highprice_notebooknew">&nbsp;</a></p></li>';
				}

				$("#lenovo-special .special-list").html(html);
			}
		}
	})
	
	$.ajax({
		url: url,
		type: "post",
		data: {
			"data" : '{"goodsInfo" :  '+JSON.stringify(goodInfo)+'}'
		},
		dataType:'json'
	}).done(function(e){
		if(e.code == '0'){
			var len = e.body.length;
			if (len > 0) {
				var asus_special = [],
					watch_game_special = [],
					flat_special = [];

				for (var i = 0; i< len; i++) {
					if(5 == e.body[i].categoryId && 103 == e.body[i].brandId){
						e.body[i].picture = 'image/asus/asus-'+e.body[i].goodId+'.png';
						e.body[i].url = 'http://m.aihuishou.com/product/'+e.body[i].goodId+'.html?utm_source=m_ahs&utm_medium=m_ahs_banner&utm_campaign=m_highprice_notebooknew';
						asus_special.push(e.body[i]);
					}
					if(64 == e.body[i].categoryId || 65 == e.body[i].categoryId){
						e.body[i].picture = 'image/watch-game/watch-game-'+e.body[i].goodId+'.png';
						e.body[i].url = 'http://m.aihuishou.com/product/'+e.body[i].goodId+'.html?utm_source=m_ahs&utm_medium=m_ahs_banner&utm_campaign=m_highprice_notebooknew';
						watch_game_special.push(e.body[i]);
					}
					if(6 == e.body[i].categoryId){
						e.body[i].picture = 'image/flat/flat-'+e.body[i].goodId+'.png';
						e.body[i].url = 'http://m.aihuishou.com/product/'+e.body[i].goodId+'.html?utm_source=m_ahs&utm_medium=m_ahs_banner&utm_campaign=m_highprice_notebooknew';
						flat_special.push(e.body[i]);
					}
				}

				var html = '';

				for (var i = 0 , len = asus_special.length; i<len ; i++) {
					html += '<li class="special-item"><p class="good-picture"><img src="'+asus_special[i].picture+'"></p><p class="good-price">￥<span class="money">'+asus_special[i].goodPrice+'</span></p><p class="good-link"><a href="'+asus_special[i].url+'">&nbsp;</a></p></li>';
				}
				$(" #asus-special .special-list").html(html);

				html = '';
				for (var i = 0 , len = watch_game_special.length; i<len ; i++) {
					html += '<li class="special-item"><p class="good-picture"><img src="'+watch_game_special[i].picture+'"></p><p class="good-price">￥<span class="money">'+watch_game_special[i].goodPrice+'</span></p><p class="good-link"><a href="'+watch_game_special[i].url+'">&nbsp;</a></p></li>';
				}
				$(" #watch-game-special .special-list").html(html);

				html = '';
				for (var i = 0 , len = flat_special.length; i<len ; i++) {
					html += '<li class="special-item"><p class="good-picture"><img src="'+flat_special[i].picture+'"></p><p class="good-price">￥<span class="money">'+flat_special[i].goodPrice+'</span></p><p class="good-link"><a href="'+flat_special[i].url+'">&nbsp;</a></p></li>';
				}
				$(" #flat-special .special-list").html(html);
			}
		}
	}).fail(function(){
		//code...
	})

	/********业务结束*********/

})