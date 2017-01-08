$(function(){

	var __isProduction = (function(){
        return location.hostname.indexOf('test.aihuishou.com') > -1 ? false : location.hostname.indexOf('aihuishou.com') > -1;
    })();

    var __baseUrl = __isProduction ? 'http://m.mk.aihuishou.com/' : 'http://bj.test.aihuishou.com:7182/';
    init();
	function init(){
		//ACT_1212_TWELVE_20活动码
		singleRecords('ACT_RONGZI_50',0);
		singleRecords('ACT_RONGZI_70',1);
		singleRecords('ACT_RONGZI_100',2);
	}
	//查询个人中奖记录（登录后是否已经领券改变状态）
 	function singleRecords(code,index){
		var tokenSingle=localStorage.getItem('token');
		var activityCodeSingle=code;
		if(tokenSingle != null && tokenSingle != ""){
			var dataSingle='{"token":"'+tokenSingle+'","activityCode":"'+activityCodeSingle+'"}'
		    $.post(__baseUrl+'/api/activity/common/queryPrizeCode', {
	            "methodName": "queryPrizeCode",
	            "timestamp": Date.parse(new Date()),
	            "version": "2.0",
	            "token": "",
	            "sign": "",
	            "channelCode": "",
	            "clientType": "PC",
	            "data": dataSingle
	     }).success(function (data){
	            if(data.code == 0){
	            		if(data.body.length > 0){
	            			$('.code_list img.on').eq(index).css("display","none");
	            			$('.code_list img.after').eq(index).css("display","block");	
	            		}
	            }
	        });	
	    }
	}
	var id = 1;
	$(".code_list li").each(function(i,elem){
		var index = i;
		$(elem).on("click",function(){
			id = $(this).attr("data-id");
			isToken();
		});
	});
	function getResult(codeValue){
		var activityCode;
		if(codeValue ==  1){
			activityCode = "ACT_RONGZI_50";
		}else if(codeValue == 2){
			activityCode = "ACT_RONGZI_70";
		}else{
			activityCode = "ACT_RONGZI_100";
		}
		var tokenValue = localStorage.getItem("token");
		var data='{"token":"'+tokenValue+'","activityCode":"'+activityCode+'","rangeNum":"3","triggerCode":"quick_receive","source":"eleven","medium":"","campaign":"","sendType":"pages","action":"send_coupons"}'; 
		$.post(__baseUrl+"api/activity/common/newReceiveCoupon",{
			"methodName": "newReceiveCoupon",
	        "timestamp": Date.parse(new Date()),
	        "version": "2.0",
	        "token": "",
	        "sign": "",
	        "channelCode": "",
	        "clientType": "mobile",
	        "data": data
		}).success(function(data){
			if(data.code==0){
				$("img.on").eq(codeValue-1).css("display","none");
		     	$("img.after").eq(codeValue-1).css("display","block");
				//showAlert("领取成功");
				$(".successAlert p").html("您的优惠码为："+data.body.rewardCode);
				$(".successAlert").css("display","block");
				master();
				$("div#overlay").click(function(){
		      		$(this).css({"display":"none"});
		      		$("html,body").css({"height": "100%","overflow":"auto"});
		      		$(".successAlert").css("display","none");	
		      });
		      $(".successAlert").click(function(){
		      	$("div#overlay").trigger("click");
		      });
		     
			}else{
			  showAlert(data.msg);
			  if(codeValue == 1){
		      	singleRecords('ACT_RONGZI_50',0);
		      }else if(codeValue == 2){
				singleRecords('ACT_RONGZI_70',1);
		      }else{
				singleRecords('ACT_RONGZI_100',2);
		      } 
			}
			
		});
	}
	function setUUID(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 32; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		var uuid = s.join("");
		return uuid;
	}
	function isToken(){
		var tokenValue = localStorage.getItem("token");
		   if((tokenValue=="")||(tokenValue==null)){
			 	$(".pop").css({"display":"block"});
			 	//重新登录时清空领券存储
			 	localStorage.removeItem("qwertyuiopasdfghjkl1");
        			localStorage.removeItem("qwertyuiopasdfghjkl2");
        			localStorage.removeItem("qwertyuiopasdfghjkl3");
  
			 	master();
			 	$("#overlay").on("click",function(){
		      		$(this).css({"display":"none"});
		      		$("html,body").css({"height": "100%","overflow":"auto"});
		      		$(".pop").css({"display":"none"});
			      });
		   }else{
		   		checkLogin(tokenValue);
		   }
	}
	 function checkLogin(tokenValue){
    		 var dataJson = '{"token": "'+tokenValue+'"}';
        $.post(__baseUrl + "api/activity/ahs/common/login/checkLogin", {
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
                		init();
                		getResult(id);
                }
            }else{
        			localStorage.removeItem("token");
        			//重新登录时清空领券存储
        			localStorage.removeItem("qwertyuiopasdfghjkl1");
        			localStorage.removeItem("qwertyuiopasdfghjkl2");
        			localStorage.removeItem("qwertyuiopasdfghjkl3");
            		$(".pop").css("display","block");
            		master();
            		$("div#overlay").click(function(){
            			location.reload();
		      		$(this).css({"display":"none"});
		      		$("html,body").css({"height": "100%","overflow":"auto"});
		      		$(".pop").css({"display":"none"});
		      		
		      	});
            }      
        });
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
	//获取手机验证码
    $("#yzm_label").click(function(){
    		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".phone").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('.phone').val())) {
            showAlert("联系手机号不正确");
            return;
       }
       if($('#certCode').val()==''){
       		showAlert("请输入图片验证码");
       		return;
       }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        getSmsButton = $(this);
        var phoneJson = $('.phone').val();    		
       	imgLogin();
    });
	  //登录
    function login(){
		var phoneJson = '{"mobile":"' + $('.phone').val() + '","verifyCode":"' + $(".yzm").val() + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_RONGZI_100"}';    		
        $.post(__baseUrl + "api/activity/ahs/common/login/userLogin", {
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
            		//showAlert("登录成功");
                localStorage.setItem("token",data.body.token);
                $('.pop').css("display","none");
                $(".phone-yzm").html('获取验证码');
                clearInterval(timer);
                sec = 120;
                getSmsButton.removeClass("phone-yzm-gray");
                smsClicked = 1;
                 $("#overlay").remove();
            		$("html,body").css({"height": "100%","overflow":"auto"});
            		//制空
                  $(".phone").val("");
                  $(".yzm").val("");
                  $(".picture").val("");
                  init();
                  //领券
                  getResult(id);     
           }else{
           		showAlert(data.msg);
           }
        });
    }
     //获取图片验证码
	var currentId = [];
    function pictureYzm() {
        var uuid = setUUID();
        currentId.length = 0;
        currentId.push(uuid);
        $("img#portrait").attr("src", __baseUrl + "api/activity/ahs/common/login/getCertCode?uuid=" + currentId[0]);
    }
    pictureYzm();
    $('#portrait').click(function(){
    		 pictureYzm();
    });
	//带有图片验证码方式获取手机验证码  code=-1   body.certCode=true显示获取图形验证码
    function imgLogin(){
    		var phoneJson = '{"mobile":"' + $('.phone').val() + '","certCode":"' + $("#certCode").val() + '","singleCode":"'+currentId[0]+'"}';    		
        $.post(__baseUrl + "api/activity/ahs/common/login/sendVerifyCode", {
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
	                 getSmsButton.removeClass("phone-yzm-gray");
	                 sec = 120;
	                 showAlert(data.msg);
//	                 if(data.body.certCode==true){
//	                 	$(".sec_bor").css("display","block");
//	                 	$("#overlay").click(function(){
//				      		$(this).css("display","none");
//				      		$("html,body").css({"height": "100%","overflow":"auto"});
//				      		$(".pop").css("display","none");
//				      	});
//	                 	//pictureYzm();
//	                 }else{
//	                 	showAlert(data.msg);
//	                 }
	             }
	       
        });
    }
    $("#login").on("click",function(){
    		login();
    });
    $(".close").on("click",function(){
    		$("#overlay").css("display","none");
    		$(".pop").css("display","none");
    		$("html,body").css({"height": "100%","overflow":"auto"});
    });
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
                'z-index':"2000"
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
});