//定义一些公共函数
define(['jquery'] , function($){
 
	var __baseUrl = 'http://m.mk.test.aiweixiu.com/'; //基础链接

	//蒙层
  var master = function() {
      	$('body').append('<div id="overlay"></div>');
      	$('#overlay').height($(document.body).height())
      	.css({
      		'display': 'block',
      		'opacity': .8,
      		'position': 'fixed',
      		'top': 0,
          'left': 0,
          'bottom':0,
          'right':0,
          'margin':'auto',
      		'background-color': '#000000',
      		'width': '100%',
      		'height': '100%',
          'overflow':'hidden',
          'filter':'alpha(opacity=80)',
      		'z-index':300
      	});
    };

    //提示框
    var showAlert = function(msg) {
    	$("#message").remove();
      	$('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
      	$('#message')
      	.css({
      		'display': 'block',
      		'position': 'fixed',
      		'top': 0,
          'left': 0,
          'bottom':0,
          'right':0,
          'margin':'auto',
      		'background-color': 'rgba(0,0,0,0.65)',
      		'width': '250px',
      		'height': '32px',
      		'font-size':'16px',
      		'color': '#fff',
      		'line-height': '32px',
      		'text-align': 'center',
      		'border-radius': '3px',
      		'padding': '10px 20px',
      		'z-index':99999999
      	});
      	setTimeout(function () {
      		$("#message").remove();
      	}, 1800);
    }

    //根据值返回数组下标
    var getIndex = function(arr , value){
    	var len = arr.length;
    	for (var i = 0; i < len; i++) {
    		if(arr[i] == value){
    			return i;
    		}
    	}
    	return -1;
    }
 	
 	//返回所有查询参数的键值对
    var urlParams = function() {
		var args = new Object();
        var query = location.search.substring(1);//获取查询串
        var pairs = query.split("&");//在逗号处断开
        for (var i = 0; i < pairs.length; i++) {
        	var params = pairs[i].split('=');
        	if (params.length < 2)continue;
        	args[params[0]] = params[1];
        }
        return args;
    }

    //通过键返回查询参数值
    var parseUrl = function(e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = new RegExp("[\\?&]" + e + "=([^&#]*)"), //[\\?&] 匹配第一个？号或&分割，[^&#]*匹配&分割和#(页面hash)
             a = t.exec(location.search);
        return null === a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
    }

    //手机号隐藏 从frontLen开始 隐藏endLen位
    var plusXing = function(str,frontLen,endLen) { 
          var len = str.length-frontLen-endLen;
          var xing = '';
          for (var i=0;i<len;i++) {
              xing+='*';
          }
          return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
    }

    var getAction = function(){
    	return localStorage.getItem('activityCode');
    }

    return {
    	master:master,
    	showAlert:showAlert,
    	getIndex:getIndex,
    	urlParams:urlParams,
    	parseUrl:parseUrl,
    	plusXing:plusXing,
    	getAction:getAction,
    	__baseUrl:__baseUrl
    }
})