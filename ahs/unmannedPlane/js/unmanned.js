$(function(){
	 var swiper = new Swiper('.swiper-container', {
		  pagination: '.swiper-pagination',
		  paginationClickable: true,
		  direction: 'vertical'
	});
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
//规则点击事件
$(".activityRule").on("click",function(){
	$(".rule_win").css("display","block")
	$(".black1").css("display","block")
})	
$(".win_up").on("click",function(){
	$(".rule_win").css("display","none")
	$(".black1").css("display","none")
})	
//获奖弹窗关闭
$(".prize5_up").on("click",function(){
	$(".prize5").css("display","none")
	$(".black1").css("display","none")
})	
$(".prize4_up").on("click",function(){
	$(".prize4").css("display","none")
	$(".black1").css("display","none")
})	
$(".prize3_up").on("click",function(){
	$(".prize3").css("display","none")
	$(".black1").css("display","none")
})	
$(".prize2_up").on("click",function(){
	$(".prize2").css("display","none")
	$(".black1").css("display","none")
})	
$(".prize1_up").on("click",function(){
	$(".prize1").css("display","none")
	$(".black1").css("display","none")
})	
//手机号弹窗关闭
$(".phone_up").on("click",function(){
	$(".phone").css("display","none")
	$(".black1").css("display","none")
	clearInterval(timer)
	$(".phoneCode").html('发送验证码')	
	var pp=document.getElementsByClassName("phoneCode")[0]
	pp.style.backgroundColor="#f34c49";
	$(".phone_Up").attr("placeholder","请输入手机号");
	numP=0;
	$(".phone_Up").val('')
	$(".phone_Down").val('');
	$(".phone_Down").attr("placeholder","");
})			
//验证码
	var timer;
	var numP=0;
	var _this;
	$(".phoneCode").click(function(){
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".phone_Up").val() == '') {
        		$(".phone_Up").attr("placeholder","请输入手机号");
            return;
        }
       if (!phoneReg.test($('.phone_Up').val())) {
       	$(".phone_Up").val("");
       	$(".phone_Up").attr("placeholder","手机号不正确");
            return;
       }
		if(numP==0){
			numP=1;	
			 var dataJson = $(".phone_Up").val();
			        $.post(getUrl()+'api/activity/ahs/common/sendVirifyCode', {
			            "methodName": "sendVirifyCode",
			            "timestamp": Date.parse(new Date()),
			            "version": "2.0",
			            "token": "",
			            "sign": "",
			            "channelCode": "",
			            "clientType": "MOBILE",
			            "data": dataJson
			        }).success(function (data) {
			            if(data.code == 0){
			            		
			            }else{
			           	 	$(".phone_Down").attr("placeholder","验证码发送失败");
			            }
			        });
			this.style.background="none"
			_this=this;
			$(this).html("120s后重发")
			var endTime=120;
			timer=setInterval(function(){
				endTime=endTime-1
				$(".phoneCode").html(endTime+"s后重发")
				if(endTime==0){
					clearInterval(timer)
				}
			},1000)
			setTimeout(function(){
				_this.style.backgroundColor="#f34c49"
				$(".phoneCode").html('发送验证码')	
				numP=0;
			},121000);
		}else{
			return
		}	
	})
var MD5;
//确认无误并且提交
	$(".phoneBtn").on("click",function(){
		var phoneReg2 = /\d{6}/;
        if ($(".phone_Down").val() == '') {
        		$(".phone_Down").attr("placeholder","请输入验证码");
            return;
        }
       if (!phoneReg2.test($('.phone_Down').val())) {
       	$(".phone_Down").val("");
       	$(".phone_Down").attr("placeholder","验证码格式错误");
            return;
        }
		//post传参数---手机号码&短信验证码
		var count = '{ "mobile": "'+$(".phone_Up").val() +'","verifyCode": "' + $(".phone_Down").val() + '"}';

        $.post(getUrl()+'api/activity/ahs/common/initUserChance', {
                "methodName": "initUserChance",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "MOBILE",
                "data": count
          }).success(function (data) {
            		if(data.code == 0){
            			MD5=data.body.mobileMD5;
            			clickNum=data.body.result;
            			$(".chanceCont").html(clickNum);//传次数
            			//存储localstorage
            			window.localStorage.setItem("MMD5",MD5)
            			window.localStorage.setItem("phoneNumber",$(".phone_Up").val())
            			setCookie('phoneNumber', $(".phone_Up").val(), 0.02)
					setCookie('verifyCode', $(".phone_Down").val(), 0.02)
					
            			setTimeout(function(){
            				$(".phone").css("display","none")
						$(".black1").css("display","none")
            			},200);
            		}else{
            			$(".phone_Down").attr("placeholder","验证码错误");
            			$(".phone_Down").val("");
            		}
            });
	
	})
	
	//点击进入助力页面
	 $(".prizeBtn").on("click",function(){
	 	 $(".prize5").css("display","none")
	 	 $(".prize4").css("display","none")
	 	 $(".prize3").css("display","none")
	 	 $(".prize2").css("display","none")
	 	 $(".prize1").css("display","none")
		 $(".black1").css("display","none")
	 	 $(".fenxiang").show()
	 })	
	  $(".fenxiang").on("click",function(){
	  	$(this).css("display","none")
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
//初始化页面
	var dataN01=getCookie('phoneNumber')
	var dataN02=getCookie('verifyCode')
	console.log(dataN01)
	console.log(dataN02)
	if((dataN01!=null)&&(dataN02!=null)){
		var countFir = '{ "mobile": "'+dataN01 +'","verifyCode": "' + dataN02 + '"}';
        $.post(getUrl()+'api/activity/ahs/common/initUserChance', {
                "methodName": "initUserChance",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "MOBILE",
                "data": countFir
          }).success(function (data) {
            		if(data.code == 0){
            			MD5=data.body.mobileMD5;
            			clickNum=data.body.result;
            			$(".chanceCont").html(clickNum);//传次数
            			//存储localstorage
            			window.localStorage.setItem("MMD5",MD5)
            			window.localStorage.setItem("phoneNumber",$(".phone_Up").val())
            			setTimeout(function(){
            				$(".phone").css("display","none")
						$(".black1").css("display","none")
            			},200);
            		}else{
            			$(".phone_Down").attr("placeholder","验证码错误");
            			$(".phone_Down").val("");
            		}
            });
	}
	
   
	
})