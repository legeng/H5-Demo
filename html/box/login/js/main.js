$(function(){
	
	var userAgent = commonObj.useAgent();
	var openId = localStorage.getItem("openId");
	if(openId ==null || openId == ""){
		//去地址栏获取openId
		getOpenId();
	}
	function getOpenId(){
		var params = commonObj.urlParam();
		if(params['openId'] != undefined){
			openId = params['openId'];
			localStorage.setItem("openId",openId);
		}else{
			var url = "http://www.angellg.com/api/wx/redirect?redirectUrl=http://www.angellg.com/login/index.html";
			commonObj.getOpenId(url);
		}
	}
	$('.header ul li').click(function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		index == 0 ? $('.header i').removeClass(): $('.header i').addClass("on");
		$('.login_bor ul').eq(index).show().siblings().hide();
		$('.btn').show();
		index == 0 ? $('.login_bor p').show() : $('.login_bor p').hide();
		index == 0 ? $('.banner01').show() : $('.banner01').hide();
		index == 1 ? $('.banner02').show() : $('.banner02').hide();
	});
	
	$(".phone_login .phone").bind("input propertychange",function(){
		var len = $(this).val().length;
		len > 0 ? $('.phone_login li').eq(0).addClass('active') : $('.phone_login li').eq(0).removeClass('active');
		len == 11 ? $('.phone_login li').eq(0).find('span').addClass('on'):$('.phone_login li').eq(0).find('span').removeClass('on');
		var code_len = $(".phone_login .code").val().length;
		if(len == 11 && code_len == 6){
			$('.phone_login .btn').addClass('on');
		}else{
			$('.phone_login .btn').removeClass('on');
		}
	});
	$(".code_login .phone").bind("input propertychange",function(){
		var len = $(this).val().length;
		len > 0 ? $('.code_login li').eq(0).addClass('active') : $('.code_login li').eq(0).removeClass('active');
		len > 0 ? $('.code_login i.close').show() : $('.code_login i.close').hide();
		var code_len = $(".code_login .code").val().length;
		if(len == 11 && code_len == 6){
			$('.code_login .btn').addClass('on');
		}else{
			$('.code_login .btn').removeClass('on');
		}
	});
	$(".phone_login .code").bind("input propertychange",function(){
		var len = $(this).val().length;
		len > 0 ? $('.phone_login li').eq(1).addClass('active') : $('.phone_login li').eq(1).removeClass('active');
		var code_len = $(".phone_login .phone").val().length;
		if(len == 6 && code_len == 11){
			$('.phone_login .btn').addClass('on');
		}else{
			$('.phone_login .btn').removeClass('on');
		}
	});
	$('input').on("click",function(){
		if(userAgent == 'android'){
			var target = $(this);
		    setTimeout(function(){
		        target.scrollIntoViewIfNeeded();
		      },400);
		}
	});
	$(".code_login .code").bind("input propertychange",function(){
		var len = $(this).val().length;
		len > 0 ? $('.code_login li').eq(1).addClass('active') : $('.code_login li').eq(1).removeClass('active');
		var code_len = $(".code_login .phone").val().length;
		if(len == 6 && code_len == 11){
			$('.code_login .btn').addClass('on');
		}else{
			$('.code_login .btn').removeClass('on');
		}
	});
	$('.code_login i.close').on("click",function(){
		$(this).hide();
		$(".code_login .phone").val('');
		$(".code_login .phone").focus();
		$(".code_login li").eq(0).removeClass('active');
	});
	//获取手机验证码
	var num = "";
    var smsClicked = 1;
    var timer = null;
    var sec = 60;

    function count() {
        sec--;
        if (sec < 10) {
            sec = '0' + sec;
        }
        $('.getCode').html(sec + 's');
        if (sec == 0) {
            clearInterval(timer);
            $('.getCode').html('重新获取');
            $('.getCode').removeClass("gray");
            $('.getCode').addClass('on');
            sec = 60;
            smsClicked = 1;
        }
    }
    //获取图片验证码
    var currentId = [];
    function getImgCode(){
        currentId.length = 0;
        currentId.push(commonObj.setUUID());
        $('.pop img').attr("src",commonObj.production()+"api/common/login/queryCertCode/"+currentId[0]);//currentId[0]
    }
    //点击图片刷新验证码
    $('.imgCode').click(function(){
    		getImgCode();
    });
    //getCode btn
    $('.getCode').on('click',function(){
		if( !$(this).is('.on') ){
			return;
		}
		getImgCode();
		commonObj.master();
		setTimeout(function(){
			$('.pop').show();
		},300);
	});
	//pop confirm btn
	$('span.confirm').on("click",function(){
		if($(".verfiy").val().trim() == "" || $(".verfiy").val() == null){
			commonObj.tips("图片验证码不能为空");
			return;
		}
		$('.pop').hide();
		commonObj.closeMaster();
		getCodeMethod();
	});
	//pop resize btn
	$('span.resize').on("click",function(){
		$('.pop').hide();
		commonObj.closeMaster();
		return btnFlag =  false;
	});
	//调取手机验证码接口
	function getCodeMethod(){
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
			var phoneValue = '';
			$('.login_bor ul').each(function(i,ele){
				var index = i;
				if( $(ele).css("display") == 'block' ){
					phoneValue = $(this).find('.phone').val();
				}
			});
			if(phoneValue=="" || phoneValue==null){
				commonObj.tips("请填写手机号");
	            return;
			}
			 if (!phoneReg.test(phoneValue)) {
	            commonObj.tips("手机号不正确");
	            $('.phone_login .phone').val("");
	            $(".verfiy").val("");
	            $(".phone_login li").eq(0).removeClass("active");
	            $(".getCode").removeClass("on");
	            $("span.btn").removeClass("on");
	            return;
	        }
			//phoneValue = "13988889999"; 
			var certCode = $(".verfiy").val();

			var info = '{"mobile":"' + phoneValue + '","openId":"'+openId+'","certCode":"'+certCode+'"}';
			var data = {
	            "methodName": "getVerifyCode",
	            "timestamp": Date.parse(new Date()),
	            "version": "1.0",
	            "token": "",
	            "sign": "",
	            "channelCode": "",
	            "clientType": "wx",
	            "data": info
	       	};
			commonObj.ax(commonObj.production()+"api/common/login/getVerifyCode/"+currentId[0],data,true,"post",null, function(data){sendVerify(data)}, function(){ commonObj.tips("出错了！")});
	}

	function sendVerify(sendData){
		if(sendData.code == "0"){
			if(sendData.data.success == true){
				timer = setInterval(count, 1000);//发送验证码成功，倒计时
				$('.getCode').removeClass('on');
				$('.getCode').addClass('gray');
				$(".verfiy").val("");//制空验证码输入框
				commonObj.tips("验证码已发送");
			}else{
				commonObj.tips(sendData.data.message);
				clearInterval(timer);
				//调整按钮
                sec = 60;
                $('.getCode').removeClass('gray');
				$('.getCode').addClass('on');
			}
		}else{
			commonObj.tips(sendData.msg);
		}
	}
	//账号密码登录方式
	$('.code_login .btn').on('click',function(){
		if( !$(this).is('.on') ){
			return;
		}
		var phoneValue = $('.code_login .phone').val();
		var codeValue = $('.code_login .code').val();
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
		if(phoneValue == ''){
			commonObj.tips('请输入手机号');
			return;
		}
		 if ( !phoneReg.test(phoneValue) ) {
            commonObj.tips("请输入正确手机号");
            return;
        }
		if(codeValue == ''){
			commonObj.tips('请输入密码');
			return;
		}
		var info = '{"mobile":"' + phoneValue + '","password":"' + codeValue + '","openId":"'+openId+'"}';
		var dataInfo = {
            "methodName": "verify",
            "timestamp": Date.parse(new Date()),
            "version": "1.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "wx",
            "data": info
       };
        commonObj.ax(commonObj.production()+"api/common/login/password",dataInfo,true,"post",null, function(data){zhanghaoSuccess(data)}, function(){dataError()});		
	});
	function zhanghaoSuccess(data){
		if(data.code == "0"){
			if(data.data.success == true){
				commonObj.tips(data.data.message);
				var token =  data.data.token;
				localStorage.setItem("token",token);//登录成功，存储token				
				//self.location = document.referrer;返回上一个页面
				var pageName = sessionStorage.getItem("pagename");
				window.location.href = pageName;
			}else{
				commonObj.tips(data.data.message);
				setTimeout(function(){
					$('.header ul li').eq(0).trigger('click');
				},500);
			}
		}else{
			commonObj.tips(data.msg);
		}
	}
	//手机号码密码登录方式
	$('.phone_login .btn').on('click',function(){
		if( !$(this).is('.on') ){
			return;
		}
		var phoneValue = $('.phone_login .phone').val();
		var codeValue = $('.phone_login .code').val();
		//var index = 0;
//		$('.login_bor ul').each(function(i,ele){
//			var flag = i;
//			if( $(ele).css("display") == 'block' ){
//				phoneValue = $(this).find('.phone').val();
//				codeValue = $(this).find('.code').val();
//				index = flag;
//			}
//		});
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
		if(phoneValue == ''){
			commonObj.tips('请输入手机号');
			return;
		}
		 if ( !phoneReg.test(phoneValue) ) {
            commonObj.tips("请输入正确手机号");
            return;
        }
		if(codeValue == ''){
			commonObj.tips('请输入密码');
			return;
		}
//		if(index == 0){
			var info	 = '{"mobile":"' + phoneValue + '","verifyCode":"' + codeValue + '","openId":"'+openId+'"}';
//		}else{
			//info = '{"mobile":"' + phoneValue + '","password":"' + codeValue + '","openId":"'+openId+'"}';
		//}
		var dataInfo = {
            "methodName": "verify",
            "timestamp": Date.parse(new Date()),
            "version": "1.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "wx",
            "data": info
       };
      // if(index == 0){//手机号登录
       		commonObj.ax(commonObj.production()+"api/common/login/verify",dataInfo,true,"post",null, function(data){loginSuccess(data)}, function(){dataError()});	
      // }else{//账号密码登录
       		//commonObj.ax(commonObj.production()+"api/common/login/password",dataInfo,true,"post",null, function(data){loginSuccess(data)}, function(){dataError()});	
      // }
	});
	
	function loginSuccess(data){
		if(data.code == "0"){
			if(data.data.success == true){
				commonObj.tips(data.data.message);
				var token =  data.data.token;
				localStorage.setItem("token",token);//登录成功，存储token
								
				//self.location = document.referrer;
				var pageName = sessionStorage.getItem("pagename");
				window.location.href = pageName;
				
			}else{
				commonObj.tips(data.data.message);
			}
		}else{
			commonObj.tips(data.msg);
		}
	};
	function dataError(){
		commonObj.tips("出错喽！");
	};
	
})

