(function(w,d){
	var loc = w.location;
    de = d.documentElement;
    var yqf = {
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
	            setCookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {  
	                var sCookie = sName + '=' + encodeURIComponent(sValue);  
	                if (oExpires) {  
	                    var date = new Date();  
	                    date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);  
	                    sCookie += '; expires=' + date.toUTCString();  
	                }  
	                if (sPath) {  
	                    sCookie += '; path=' + sPath;  
	                }  
	                if (sDomain) {  
	                    sCookie += '; domain=' + sDomain;  
	                }  
	                if (bSecure) {  
	                    sCookie += '; secure';  
	                }  
	                d.cookie = sCookie;  
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
	    		if( yqf.Cookies.isSupportCookies() ){
				 var urlStr = yqf.urlParamStr();
				 console.log(urlStr);
				 var erverCookie = yqf.Cookies.getCookie("aihuishou_source_act");
			 	if(urlStr!=""){
			 		yqf.Cookies.setCookie("aihuishou_source_act",urlStr,15,"/","aihuishou.com");//yqf.Cookies.setCookie("sName",yqf_pram,0.02,"/","aihuishou.com");		 
			 	}
				 
	    		}else{
	    			console.log("亲，您的cookies禁用喽！");
	    		}
		}
	 };
    yqf.init();
    if( !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) ){
    		setTimeout(function(){window.location.href="http://m.aihuishou.com/?utm_source=xqd_yqf"},300)
    }else{
    		setTimeout(function(){window.location.href="http://www.aihuishou.com/?utm_source=xqd_yqf"},300)
    }
})(window,document);
