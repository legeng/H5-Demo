$(function(){
	var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
	init();
	function init(){
		isToken();
	}
	
	$(".header_right").html($("title").html()) //header标题
		function is_weixin() {
	        var ua = navigator.userAgent.toLowerCase();
	        if (ua.match(/MicroMessenger/i) == "micromessenger") {
	             $(".mobile_Header").hide()
	        }else{
	           $(".mobile_Header").show();
	        }
	}
	is_weixin();
	function setUUID(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 32; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		var uuid = s.join("");
		return uuid;
	}
	//倒计时
	 var smsClicked = 1;
    var timer = null;
    var sec = 120;
    function count() {
        sec--;
        if (sec < 10) {
            sec = '0' + sec;
        }
        $('.phone-yzm').html(sec + '秒后重发');
        if (sec == 0) {
            clearInterval(timer);
            $('.phone-yzm').html('获取验证码');
            $('.phone-yzm').removeClass("phone-yzm-gray");
            sec = 120;
            smsClicked = 1;
        }
    }
    $(".gz").click(function(){
    		$(".shuoming").css("display","block");
    		master();
    		$("#overlay").click(function(){
             $(this).css("display","none");
              $("html,body").css({"height": "100%","overflow":"auto"});
              $(".shuoming").css("display","none");
         });
    });
    $(".sm_title li").each(function(i,elem){
    		var index = i;
    		$(elem).click(function(){
    			if(index==0){
    				$(".le").css("display","block");
    				$(".wan").css("display","none");
    				$(".chi").css("display","none");
    				 $(".slider").animate({left: '0.4rem'}, 150);
    			}
    			if(index==1){
    				$(".le").css("display","none");
    				$(".wan").css("display","block");
    				$(".chi").css("display","none");
    				$(".slider").animate({left: '4rem'}, 150);
    			}
    			if(index==2){
    				$(".le").css("display","none");
    				$(".wan").css("display","none");
    				$(".chi").css("display","block");
    				$(".slider").animate({left: '8rem'}, 150);
    			}
    		});
    });
    $(".three").click(function(){
    		master();
    		$(".shuoming").css("display","block");
    		$(".le").css("display","none");
    		$(".wan").css("display","none");
    		$(".chi").css("display","block");
    		$(".slider").animate({left: '8rem'}, 150);
    		$("#overlay").click(function(){
             $(this).css("display","none");
              $("html,body").css({"height": "100%","overflow":"auto"});
              $(".shuoming").css("display","none");
         });
    });
    $(".dl").click(function(){
    		var txt = $(this).html();
    		console.log("txt:"+txt);
    		if(txt == "登录"){
    			$(".login_pop").css({"display":"block"});
    			master();
    			$("#overlay").click(function(){
    				$(".login_pop").css({"display":"none"});
             	$(this).css("display","none");
              	$("html,body").css({"height": "100%","overflow":"auto"});
              	
         	});
    		}else{
    			loginOut();
    		}
    		
    });
    //获取手机验证码
    $("#yzh").click(function(){
    		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($("#tel").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('#tel').val())) {
            showAlert("联系手机号不正确");
            return;
       }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        getSmsButton = $(this);
        var phoneJson = $('#tel').val();    		
        console.log(phoneJson);
       	imgLogin();
    });
     $("#yzh01").click(function(){
    		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($("#tel").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('#tel').val())) {
            showAlert("联系手机号不正确");
            return;
        }
        if ($("#certCode").val() == '') {
            showAlert("请输入图片验证码");
            return;
        }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        getSmsButton = $(this);
        var phoneJson = $('#tel').val();    		
        console.log(phoneJson);
       	imgLogin();
    });
    
	$("#login").click(function(){
		login();
	});
	$("#login_img").click(function(){
		login();
	});
	 //获取图片验证码
	 var currentId = [];
    function pictureYzm() {
        var uuid = setUUID();
        currentId.length = 0;
        currentId.push(uuid);
        console.log(url + "/getCertCode?uuid=" + currentId[0]);
        $("img#portrait").attr("src", url + "/getCertCode?uuid=" + currentId[0]);
    }
    //登入
    function checkLogin(tokenValue){
    		 var dataJson = '{"token": "'+tokenValue+'"}';
    		 console.log(dataJson);
        $.post(url + "/checkLogin", {
            "methodName": "checkLogin",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
                if(data.body.valid == true){
                		$('.dl').html('登出');
                }else{
                		localStorage.removeItem("token");
                		$(".login_pop").css("block","none");
                		master();
                		$("#overlay").click(function(){
			      		$(this).css("display","none");
			      		$("html,body").css({"height": "100%","overflow":"auto"});
			      		$(".login_pop").css("display","none");
			      		$(".login_pop_img").css("display","none");
			      	});
                }
            }
        });
    }
    //登出
    function loginOut(){
    		var dataJson = '{"token": "'+localStorage.getItem("token")+'"}';
        $.post(url + "/userLoginOut", {
            "methodName": "userLoginOut",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
           	 	showAlert("登出成功");
                  $('.dl').html("登录");
                  //$(".wraning").css("display","none");
                 $("#overlay").remove();
            		 $("html,body").css({"height": "100%","overflow":"auto"});
                  localStorage.removeItem("token");
                  //登出制空
                  $("#verifyCode").html("");
                  $("#verifyCode01").html("");
                  $("#certCode").html("");
                  //倒计时
                  	clearInterval(timer);
		            $('.phone-yzm').html('获取验证码');
		            $('.phone-yzm').removeClass("phone-yzm-gray");
		            sec = 120;
		            smsClicked = 1;
            }else{
            		showAlert(data.msg);
            		//$(".wraning").css("display","none");
                $("#overlay").remove();
            		$("html,body").css({"height": "100%","overflow":"auto"});
            		//倒计时
                  	clearInterval(timer);
		            $('.phone-yzm').html('获取验证码');
		            $('.phone-yzm').removeClass("phone-yzm-gray");
		            sec = 120;
		            smsClicked = 1;
            }
        });
    }
    //登录
    function login(){
    		var flag = $(".login_pop_img").css("display");
    		var verifyCode = "";
    		if(flag=="block"){
    			verifyCode = $("#verifyCode01").val();
    		}else{
    			verifyCode = $("#verifyCode").val();
    		}
		var phoneJson = '{"mobile":"' + $('#tel').val() + '","verifyCode":"' + verifyCode + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_627_THREE"}';    		
        $.post(url + "/userLogin", {
            "methodName": "userLogin",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": phoneJson
        }).success(function (data) {
            if(data.code == 0){
            		showAlert("登录成功");
                localStorage.setItem("token",data.body.token);
                $('.login_pop').css("display","none");
                 $('.login_pop_img').css("display","none");
                $('.dl').html("登出");
                smsClicked = 1;
                $(".phone-yzm").html('获取验证码');
                clearInterval(timer);
                 $("#overlay").remove();
            		$("html,body").css({"height": "100%","overflow":"auto"});
            		//制空
                  $("#verifyCode").html("");
                  $("#verifyCode01").html("");
                  $("#certCode").html("");
            }else{
            		showAlert(data.msg);
            }
        });
    }
    //带有图片验证码方式获取手机验证码  code=-1   body.certCode=true显示获取图形验证码
    function imgLogin(){
    		var phoneJson = '{"mobile":"' + $('#tel').val() + '","certCode":"' + $("#certCode").val() + '","singleCode":"'+currentId[0]+'"}';    		
        $.post(url + "/sendVerifyCode", {
            "methodName": "sendVerifyCode",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": phoneJson
        }).success(function (data) {
            if(data.code == 0){
                getSmsButton.text('120秒后重发');
                 getSmsButton.addClass("phone-yzm-gray");
                timer = setInterval(count, 1000);
            }else {
            		 clearInterval(timer);
                 smsClicked = 1;
                 if(data.body.certCode==true){
                 	$(".img").css("display","block");
                 	$(".login_pop").css("display","none");
                 	var phoneValue = $(".login_pop #tel").val();
                 	console.log("phoneValue:"+phoneValue);
                 	$(".login_pop_img #tel").val(phoneValue);
                 	$(".login_pop_img").css("display","block");
                 	$("#overlay").click(function(){
			      		$(this).css("display","none");
			      		$("html,body").css({"height": "100%","overflow":"auto"});
			      		$(".login_pop").css("display","none");
			      		$(".login_pop_img").css("display","none");
			      	});
                 	pictureYzm();
                 }
             }
        });
    }
    $("#oneBtn").click(function(e){
    		e.preventDefault();
    		var tok = localStorage.getItem("token");
        if(tok==null){
        		$(".login_pop").css("display","block");
        		master();
    			$("#overlay").click(function(){
          		$(this).css("display","none");
          		$("html,body").css({"height": "100%","overflow":"auto"});
          		$(".login_pop").css("display","none");
          		$(".login_pop_img").css("display","none");
          	});
        		return;
        }else{
    			window.location.href="http://m.aihuishou.com/shouji?act=bg&act_activityCode=ACT_627_THREE";
        }
    });
    //抽奖
    $(".two").click(function(e){
    		e.preventDefault();
    		var tok = localStorage.getItem("token");
        console.log(tok);
        if(tok==null){
        		$(".login_pop").css("display","block");
        		master();
    			$("#overlay").click(function(){
          		$(this).css("display","none");
          		$("html,body").css({"height": "100%","overflow":"auto"});
          		$(".login_pop").css("display","none");
          		$(".login_pop_img").css("display","none");
          	});
        		return;
        }
        $.post(getUrl()+"api/activity/ahs/common/getPrizeByRandom", {
            "methodName": "getPrizeByRandom",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token":tok,
            "sign": "",
            "channelCode": "",
            "clientType": "mobile"
        }).success(function (data) {
            if(data.code == 0){
              	var prizeType = data.body.prizeType;
              	var result = data.body.result;
              	if(result == '谢谢参与'){
              		 $(".pop_fail").css("display","block");
              	}else{
              		$(".pop_success").css("display","block");
              	}
              	master();
              	$("#overlay").click(function(){
              		$(this).css("display","none");
              		$("html,body").css({"height": "100%","overflow":"auto"});
              		$(".pop_success").css("display","none");
              		$(".pop_fail").css("display","none");
              	});
            }else {
                  showAlert(data.msg);
             }
        });
    });
    //close
    $(".close").click(function(){
    		$(".login_pop").css("display","none");
    		$(".login_pop_img").css("display","none");
    		$(".shuoming").css("display","none");
    		$(".pop_success").css("display","none");
    		$(".pop_fail").css("display","none");
    		$("#overlay").remove();
        $("html,body").css({"height": "100%","overflow":"auto"});
         	clearInterval(timer);
            $('.phone-yzm').html('获取验证码');
            $('.phone-yzm').removeClass("phone-yzm-gray");
            sec = 120;
            smsClicked = 1;
    });
	function isToken(){
		var tokenValue = localStorage.getItem("token");
		console.log(tokenValue +"=tokenValue");
	   if((tokenValue=="")||(tokenValue==null)){
		 	//login();
		 	$(".login").css({"display":"block"});
	   }else{
	   		checkLogin(tokenValue);
	   }
	}
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
	function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '8rem',
                'height': '1.5rem',
                'z-index': 10,
                'font-size':'0.8rem',
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem',
                'z-index':"320"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
	function master() {
        $("html,body").css({"height": "100%","overflow":"hidden"});
        var docHeight = $(document.body).height();
        $('body').append('<div id="overlay"></div>');
        $('#overlay').height(docHeight)
            .css({
                'display': 'block',
                'opacity': .8,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': '#000000',
                'width': '100%',
                'height': '100%',
                'z-index':100
            });
    };
    var startX,//触摸时的坐标   
            startY;
   		$(document).on("touchstart", function (event) {
            var touch = event.originalEvent.targetTouches[0]; 
            startY = touch.pageY;
        });
        $(document).on("touchmove", function (event) {
             var touch = event.originalEvent.targetTouches[0];
             y = touch.pageY - startY;
            if(y<0){
            		$(".arrow").css("display","none");
            }else{
            		//alert(touch.pageY<520);
            		// if(touch.pageY<520){
            		//	$(".arrow").css("display","block");
            		//}
            }
           
        });

        $(document).on("touchend", function (event) {
            //event.preventDefault();
             var touch = event.originalEvent.targetTouches[0];
        });
    
});