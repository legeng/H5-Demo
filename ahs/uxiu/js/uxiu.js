(function(w,d){
	var loc = w.location;
    de = d.documentElement;
    var uxiu = {
    		urlParamStr:function(){
    			return location.search.substring(1);
    		},
    		urlParam:function() {
	        var args = new Object();
	        var query = location.search.substring(1);
	        var pairs = query.split("&");
	        for (var i = 0; i < pairs.length; i++) {
	            var params = pairs[i].split('=');
	            if (params.length < 2)continue;
	            args[params[0]] = params[1];
	        }
	        return args;
	    },
	    currentUrl:function(){
	    		return loc.href;
	    },
		Cookies : { 
				isSupportCookies:function(){
	    				if(navigator.cookieEnabled){
	    					return true;
	    				}else{
	    					return false;
	    				}
	   			 },
	            setCookie : function(cname, cvalue, exdays) {
			    		var d = new Date();
			  		d.setTime(d.getTime() + (exdays*24*60*60*1000));
			        var expires = "expires="+d.toUTCString();
			        document.cookie = cname + "=" + cvalue + "; " + expires+";path=/;domain=aihuishou.com";
				},  
	            getCookie : function (sName) {  
	                var name = sName + "=";
			   		var ca = document.cookie.split(';');
			    		for(var i=0; i<ca.length; i++) {
				        var c = ca[i];
				        while (c.charAt(0)==' ') c = c.substring(1);
				     	if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
				    }
				    return ""; 
	            },  
	            removeCookie : function (sName, sPath, sDomain) {  
	                this.setCookie(sName, '', new Date(0), sPath, sDomain);  
	            },  
	            clearAllCookie : function () {  
	                var cookies = d.cookie.split(";");  
	                var len = cookies.length;  
	                for (var i = 0; i < len; i++) {  
	                    var cookie = cookies[i];  
	                    var eqPos = cookie.indexOf("=");  
	                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;  
	                    name = name.replace(/^\s*|\s*$/, "");  
	                    d.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";  
	                }  
	            }  
	       },
		init:function(){
			var param = uxiu.urlParam();
	    		if( uxiu.Cookies.isSupportCookies() ){
				var erverCookie = uxiu.Cookies.getCookie("ahs_source");
		 		var jsonValue="{\"sourceType\":64,\"agentType\":6778}";
		 		$.post("http://m.mk.aihuishou.com/api/activity/ahs/common/utils/getAESTrans", {
		            "methodName": "getAESTrans",
		            "timestamp": Date.parse(new Date()),
		            "version": "2.0",
		            "token": "",
		            "sign": "",
		            "channelCode": "",
		            "clientType": "PC",
		            "data": jsonValue
		        }).success(function (data){
		        		uxiu.Cookies.setCookie('ahs_source', data.body, 0.005);
		        		setTimeout(function(){window.location.href="http://www.aihuishou.com/?utm_source=uxiu"},1000)
		        }) 
	    		}else{
	    			console.log("亲，您的cookies禁用喽！");
	    		}
		}
	 };
    uxiu.init();
})(window,document);
