var swiper = new Swiper('.swiper-container', {
 
        direction: 'vertical',
        preloadImages: true,
      //  lazyLoading: true,
//      lazyLoadingInPrevNext : true,
		onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper);  
		    swiperAnimate(swiper);
		 }, 
 		 onSlideChangeEnd: function(swiper){ 
    				swiperAnimate(swiper); 
  		 }      
    });
//rules
$('.digitalRules').on('click',function(){
	$('.blackDemo').css('display','block')
	$('.guizeWindow').css('display','block')
})
$('.rulesClose').on('click',function(){
	$(this).parent().css('display','none');
	$('.blackDemo').css('display','none')
})
$('.blackDemo').on('click',function(){
	$(this).css('display','none')
	$('.guizeWindow').css('display','none')
	$('.getRewards').css('display','none')
	$('.shareGuide').css('display','none')
})


$('.rewardClose').on('click',function(){
	$(this).parent().css('display','none');
	$('.blackDemo').css('display','none')
})

//share
$('.btnFriendsUp').on('click',function(){
	$('.blackDemo').css('display','block')
	$('.shareGuide').css('display','block')
})
$('.shareGuide').on('click',function(){
	$(this).css('display','none');
	$('.blackDemo').css('display','none');
})

 //session_id
    			function setCookie(cname, cvalue, exdays) {
		    		var d = new Date();
		  		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		        var expires = "expires="+d.toUTCString();
		        document.cookie = cname + "=" + cvalue + "; " + expires;
		   }
		   function getCookie(cname) {
	   		 var name = cname + "=";
	   		 var ca = document.cookie.split(';');
	    		for(var i=0; i<ca.length; i++) {
	       		 var c = ca[i];
	       		 while (c.charAt(0)==' ') c = c.substring(1);
		    		 if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		    }
		    return "";
		}
		 var dataCookie=function() {
			 var s = [];
			 var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
			 for (var i = 0; i < 25; i++) {
			        s[i] = hexDigits.substr(Math.floor(Math.random() * 30), 1);
			  }
			  var uuid = s.join("");
			      return uuid;  
		  }
		 if((getCookie('session_id')=="")||(getCookie('session_id')==null)){
		 	     setCookie('session_id', dataCookie(), 30)
		 }
		 
//判断是否为微信
	function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
             $(".move_back").hide()
        }else{
           $(".move_back").show();
        }
    }
    is_weixin();

$('.rewardKonw').on('click',function(){
	window.location='http://m.aiweixiu.com/first-confirm.html?utm_source=ACT_722_DEPSS&utm_medium=M&utm_campaign=weixiu_xunjia&piwik_kwd=weixiu_xunjia&act=bg&act_activityCode=ACT_722_DEPSS'
})

















