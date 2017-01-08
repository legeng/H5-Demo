
$(".sell1").on("click",function(){
	window.location='http://m.mk.aihuishou.com/ahs/pricePromotion/promotion.html?utm_source=portal&utm_medium=M_banner&utm_campaign=618'
})


//多动
	$(".zhuLi1").addClass("zhuLi")
//uuid
	 var uuid=function() {
	 var s = [];
	 var hexDigits = "0123456789";
	 for (var i = 0; i < 12; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 10), 1);
	  }
	  var uuid = s.join("");
	      return uuid;  
	  }
	 var uuidCode;
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
	
//MD5获取url的MD5
 function urlParams() {
        var args = new Object();
        var query = location.search.substring(1);//获取查询串
        var pairs = query.split("？");//在逗号处断开
        for (var i = 0; i < pairs.length; i++) {
            var params = pairs[i].split('=');
            if (params.length < 2)continue;
            args[params[0]] = params[1];
        }
        return args;
   }
	MD5code=((urlParams().MD5).substr(0,32)).toLocaleLowerCase()
	console.log(MD5code)
	var isNull=(urlParams().MD5).substr(0,4)
	console.log(isNull)
	//MD5code="33b8657b53521e76bff5de06996fae30"

//帮助他赢飞机
	$(".zhuLi1").on("click",function(){
		$(this).removeClass("zhuLi")
		$(".iWant1").addClass("iWant")
		if(isNull=='null'){
			showAlert('助力链接已失效');
			
		}else{
				if(window.localStorage.getItem("uuid")!=null&&window.localStorage.getItem("uuid")!=""){
				var countZ = '{ "uuid": "'+window.localStorage.getItem("uuid") +'","mobileMD5": "' + MD5code + '"}';
			console.log(countZ)
	        $.post(getUrl()+'api/activity/ahs/common/addUserChance', {
	                "methodName": "addUserChance",
	                "timestamp": Date.parse(new Date()),
	                "version": "2.0",
	                "token": "",
	                "sign": "",
	                "channelCode": "",
	                "clientType": "MOBILE",
	                "data": countZ
	           }).success(function (data) {
	           		console.log(data)
	           		//助力成功存储uuid
	            		if(data.code == 0){
	            			showAlert("助力成功")
	            			//window.localStorage.setItem("uuid",window.localStorage.getItem("uuid"))
	            		}else{
	            			showAlert('你已助力过了哟')
	            		}
	            }); 
			
		}else{
			uuidCode=uuid();
			var countZ = '{ "uuid": "'+uuidCode +'","mobileMD5": "' + MD5code + '"}';
		console.log(countZ)
        $.post(getUrl()+'api/activity/ahs/common/addUserChance', {
                "methodName": "addUserChance",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "MOBILE",
                "data": countZ
           }).success(function (data) {
           		console.log(data)
           		//助力成功存储uuid
            		if(data.code == 0){
            			showAlert("助力成功")
            			window.localStorage.setItem("uuid",uuidCode)
            		}else{
            			showAlert('你已助力过了哟')
            		}
            }); 
		}
	
		}

	})

//我也要免费飞机
	$(".iWant1").on("click",function(){
		window.location='http://m.mk.aihuishou.com/ahs/unmannedPlane/unmannedPlane.html'
		$(this).removeClass("iWant")
	})
	function showAlert(msg) {
        $('body').append($("<div id='message'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '30%',
                'background-color': 'black',
                'width': '40%',
                'font-size':'12px',
                'height': '1.5rem',
                'z-index': 60000,
                'color': 'white',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
	
