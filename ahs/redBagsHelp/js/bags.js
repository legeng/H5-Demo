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
		 
//success
$('.successClose').on('click',function(){
	$(this).parent().css('display','none')
	$('.mengCeng').css('display','none')
})
$('.mengCeng').on('click',function(){
	$(this).css('display','none');
	$('.successTicket').css('display','none');
})
















