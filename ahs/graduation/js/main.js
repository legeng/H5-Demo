$(function(){
	 mySwiper = new Swiper('.swiper-container',{
			  freeMode : true,
			  slidesPerView : 'auto',
//			  nextButton: ".swiper-button-next",
//			  prevButton: ".swiper-button-prev",
			  onInit: function(swiper){
				  swiper.swipeNext();
			}
		 });
	   $(".pre").tap(function(){
	   		mySwiper.swipePrev();
	   });
	    $(".next").tap(function(){
	    		mySwiper.swipeNext();
	    });
	$(".bor_nav div.swiper-slide").each(function(i,elem){
		var index = i;
		$(this).tap(function(event){
			event.preventDefault();
			$(this).addClass("active").siblings().removeClass("active");
			$(".phone-list a").css("display","none");
			if(index == 0){
				$(".phone-list a").eq(0).css("display","block");
				$(".phone-list a").eq(1).css("display","block");
				$(".phone-list a").eq(2).css("display","block");
				$(".phone-list a").eq(3).css("display","block");
			}
			if(index == 1){
				$(".phone-list a").eq(4).css("display","block");
				$(".phone-list a").eq(5).css("display","block");
				$(".phone-list a").eq(6).css("display","block");
				$(".phone-list a").eq(7).css("display","block");
			}
			if(index == 2){
				$(".phone-list a").eq(8).css("display","block");
				$(".phone-list a").eq(9).css("display","block");
			}
			if(index == 3){
				$(".phone-list a").eq(10).css("display","block");
				$(".phone-list a").eq(11).css("display","block");
				$(".phone-list a").eq(12).css("display","block");
				$(".phone-list a").eq(13).css("display","block");
			}
			if(index == 4){
				$(".phone-list a").eq(14).css("display","block");
				$(".phone-list a").eq(15).css("display","block");
			}
			if(index == 5){
				$(".phone-list a").eq(16).css("display","block");
				$(".phone-list a").eq(17).css("display","block");	
			}
			if(index == 6){
				$(".phone-list a").eq(18).css("display","block");
				$(".phone-list a").eq(19).css("display","block");
			}
			if(index == 7){
				$(".phone-list a").eq(20).css("display","block");
				$(".phone-list a").eq(21).css("display","block");
				$(".phone-list a").eq(22).css("display","block");
				$(".phone-list a").eq(23).css("display","block");
			}
		});
	})
	
	//cookie
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
	 
});
