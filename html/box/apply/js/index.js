$(function(){
	var openId = localStorage.getItem("openId");
	if(openId ==null || openId == ""){
		//去地址栏获取openId
		getOpenId();
	}else{
		$('.page').show();
	}
	
	function getOpenId(){
		var params = commonObj.urlParam();
		if(params['openId'] != undefined){
			openId = params['openId'];
			localStorage.setItem("openId",openId);
			$('.page').show();
		}else{
			var url = "http://www.angellg.com/api/wx/redirect?redirectUrl=http://www.angellg.com/apply/index.html";
			commonObj.getOpenId(url);
		}
	}
	//安卓移动input
	var userAgent = commonObj.useAgent();
	$('input').on("click",function(){
		if(userAgent == 'android'){
			var target = $(this);
		    setTimeout(function(){
		        target.scrollIntoViewIfNeeded();
		      },400);
		}
	});
	
	$('.group_btn span').click(function(){
		var len = $(".content_bor .name").val().length;
		len > 0 ? $(this).addClass('on').siblings().removeClass('on'):"";

	});
	$(".content_bor .name").bind("input propertychange",function(){
		var len = $(this).val().length;
		console.log(len)

		len > 0 ? $('.group_btn span').eq(0).addClass('on') : $('.group_btn span').removeClass('on');
		var phoneLen = $(".content_bor .phone").val().length;
		var addressLen = $(".content_bor .address").val().length;
		(len > 0 & phoneLen > 0 & addressLen > 0) ? $('.btn').addClass('active') : $('.btn').removeClass('active');
	});
	$(".content_bor .phone").bind("input propertychange",function(){
		var len = $(this).val().length;
		var nameLen = $(".content_bor .name").val().length;
		var addressLen = $(".content_bor .address").val().length;
		(len > 0 & nameLen > 0 & addressLen > 0) ? $('.btn').addClass('active') :  $('.btn').removeClass('active');
	});
	$(".content_bor .address").bind("input propertychange",function(){
		var len = $(this).val().length;
		var phoneLen = $(".content_bor .phone").val().length;
		var nameLen = $(".content_bor .name").val().length;
		(len > 0 & nameLen > 0 & phoneLen > 0) ? $('.btn').addClass('active') :  $('.btn').removeClass('active');
	});
	$('.btn').on("click",function(){
		if( !$(this).is('.active') ){
			return;
		}
		var sexValue = $('.group_btn span.on').attr('data-sex');
		var nameValue = commonObj.trim( $(".content_bor .name").val() );
		var phoneValue = commonObj.trim( $(".content_bor .phone").val() );
		var addressVlaue = commonObj.trim( $(".content_bor .address").val() );
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
		if(nameValue == "" || nameValue == null){
			commonObj.tips("请输入用户名");
			return;
		}
		if(phoneValue == "" || phoneValue == null){
			commonObj.tips("请输入手机号");
			return;
		}
		if ( !phoneReg.test(phoneValue) ) {
            commonObj.tips("手机号不正确");
            $(".content_bor .phone").val("");
            return;
        }
		if(addressVlaue == "" || addressVlaue == null){
			commonObj.tips("请输入详细地址");
			return;
		}
		var info = '{"linkName":"'+nameValue+'","mobile":"' + phoneValue + '","regionId":"1","address":"'+addressVlaue+'","sex":"'+sexValue+'"}';
		var dataInfo = {
            "methodName": "region",
            "timestamp": Date.parse(new Date()),
            "version": "1.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "wx",
            "data": info
       };
		commonObj.ax(commonObj.production()+"api/common/apply/box/"+openId,dataInfo,true,"post",null, function(data){dataSuccess(data)}, function(){dataError()});
	});
	function dataSuccess(data){
		if(data.code == '0'){
			if(data.data.success == true){
				$(".content_bor .name").val("");
				$(".content_bor .phone").val("");
				$(".content_bor .address").val("");
				window.location.href="success.html";
			}else{
				commonObj.tips(data.data.message);
			}
		}else{
			if(data.data.code == '200005'){
				getOpenId();
			}else{
				commonObj.tips(data.msg);
			}
		}
	};
	function dataError(){
		commonObj.tips("出错喽！");
	};
});
