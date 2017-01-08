(function($){
    var commonObj = new Object();
    commonObj.tips = function(msg){
    		clearTimeout(timer);
		$(".showAlert").remove();
        $('body').append($("<div class='showAlert'>" + msg + "</div>"));
        var timer = setTimeout(function () {
          $(".showAlert").remove();
        }, 1000);
    };
    commonObj.master = function(){
    		$('body').append($("<div class='master'></div>"));
    		$('.master').bind('touchmove',function(e){
    			e.preventDefault();
    		});
    };
    commonObj.closeMaster = function(){
    		$(".master").on("click",function(){
    			$(this).unbind('touchmove');
    			$(this).remove();
    		});
    };
    commonObj.useAgent = function(){
    		var u = navigator.userAgent; 
 		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
  		if(isAndroid){
  			return 'android';
  		}
  		if(isiOS){
  			return 'ios';
  		}
    }
    commonObj.production = function(){
    		var flag = location.hostname.indexOf('test.aihuishou.com') > -1 ? false : location.hostname.indexOf('aihuishou.com') > -1;
    		return flag ? 'http://m.mk.aihuishou.com/' : 'http://bj.test.aihuishou.com:8093/';
    }
    commonObj.setUUID = function(){
    		var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        var uuid = s.join("");
        return uuid;
    };
    
    commonObj.urlParamStr = function(){
    		return location.search.substring(1);
    };
     commonObj.trim = function(s){
	    return s.replace(/(^\s*)|(\s*$)/g, "");
	};
    commonObj.hidePhoneNum = function(str,frontLen,endLen) { 
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
            xing+='*';
        }
        return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
    }
    /**
     * 截取url查询参数
     */
    commonObj.urlParam = function(){
    		var args = new Object();
        var query = location.search.substring(1);
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var params = pairs[i].split('=');
            if (params.length < 2)continue;
            args[params[0]] = params[1];
        }
        return args;
    };
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     * $.ax(getRootPath()+"/test/ajax.html", null,null, null,null, function(data){alert(data.code);}, function(){ alert("出错了");});
     */
    commonObj.ax = function(url, data, async, type, dataType, successfn, errorfn) {
        async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: type,
            async: async,
            data: data,
            url: url,
            dataType: dataType,
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    commonObj.postAjax = function(url, data, successfn, errorfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };

    /**
     * 初始化微信api参数
     */
   commonObj.wxInit = function(){
        var dataJson = '{ "localUrl": "'+ window.location.href +'"}';
        $.post(commonObj.production() + "api/wx/generateConfig", {
            "methodName": "generateConfig",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "WX",
            "data": dataJson
        }).success(function (data) {
	        	if(data.code == "0"){
	        		 wx.config({
	                debug : data.data.debug,
	                appId : data.data.appId,
	                timestamp : data.data.timestamp,
	                nonceStr :data.data.nonceStr,
	                signature : data.data.signature,
	                jsApiList : data.data.jsApiList
	            });
	        	}
        });
    };
   
	commonObj.wxShare = function(etitle,elink,eimgUrl,edesc,quanurl,friendurl){
			wx.ready(function () {
		        //分享朋友圈
		        wx.onMenuShareTimeline({
		            title: etitle,
		            link: quanurl,
		            imgUrl: eimgUrl,
		            success: function (res) {
		               $('.master').remove(); 
		            }
		        });
		        //分享给朋友
		        wx.onMenuShareAppMessage({
		            title: etitle,
		            link: friendurl,
		            imgUrl: eimgUrl,
		            desc:edesc,
		            success: function (res) {
		                $('.master').remove();
		            },
		            cancel: function (res) {
		               console.log(1111);
		            }
		        });
		        //分享到qq
		        wx.onMenuShareQQ({
		            title: etitle,
		            link: elink,
		            imgUrl: eimgUrl,
		            desc: edesc
		        });
		        wx.onMenuShareQZone({
		            title: etitle,
		            link: elink,
		            imgUrl: eimgUrl,
		            desc: edesc,
		            success: function (res) {
		                
		            },
		            cancel: function (res) {
		               
		            }
		        });
	    });
	}
    window['commonObj'] = commonObj;
})(jQuery)
