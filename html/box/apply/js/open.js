$(function(){
	function getOpenId(){
		var params = commonObj.urlParam();
		if(params['openId'] != undefined){
			openId = params['openId'];
			$('.open_page').show();
			localStorage.setItem("openId",openId);
		}else{
			var url = "http://www.angellg.com/api/wx/redirect?redirectUrl=http://www.angellg.com/apply/open.html";
			commonObj.getOpenId(url);
		}
	}
	
	var openId = localStorage.getItem("openId");
	if(openId ==null || openId == ""){
		//去地址栏获取openId
		getOpenId();
	}else{
		$(".open_page").show();
	}
	
	$('.group_btn span').click(function(){
		var len = $(".open_info .name").val().length;
		len > 0 ? $(this).addClass('on').siblings().removeClass('on'):"";

	});
	$(".open_info .name").bind("input propertychange",function(){
		var len = $(this).val().length;
		len > 0 ? $('.group_btn span').eq(0).addClass('on') : $('.group_btn span').removeClass('on');
		var phoneLen = $(".open_info .phone").val().length;
		var addressLen = $(".open_info .address").val().length;
		(len > 0 & phoneLen > 0 & addressLen > 0) ? $('.submit').addClass('active') : $('.submit').removeClass('active');
	});
	$(".open_info .phone").bind("input propertychange",function(){
		var len = $(this).val().length;
		var nameLen = $(".open_info .name").val().length;
		var addressLen = $(".open_info .address").val().length;
		(len > 0 & nameLen > 0 & addressLen > 0) ? $('.submit').addClass('active') : $('.submit').removeClass('active');
	});
	$(".open_info .address").bind("input propertychange",function(){
		var len = $(this).val().length;
		var phoneLen = $(".open_info .phone").val().length;
		var nameLen = $(".open_info .name").val().length;
		(len > 0 & nameLen > 0 & phoneLen > 0) ? $('.submit').addClass('active') : $('.submit').removeClass('active');
	});
	//提交
	$('.submit').click(function(){
		var sexValue = $('.group_btn span.on').attr('data-sex');
		var nameValue = commonObj.trim($(".open_info .name").val());
		var phoneValue = commonObj.trim($(".open_info .phone").val());
		var addressVlaue = commonObj.trim($(".open_info .address").val());
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
          	$(".open_info .phone").val("");
            return;
        }
		if(addressVlaue == "" || addressVlaue == null){
			commonObj.tips("请输入详细地址");
			return;
		}
		var info = '{"linkName":"'+nameValue+'","mobile":"' + phoneValue + '","address":"'+addressVlaue+'","sex":"'+sexValue+'"}';
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
		commonObj.ax(commonObj.production()+"api/common/apply/region/"+openId,dataInfo,true,"post",null, function(data){dataSuccess(data)}, function(){dataError()});
	});
	function dataSuccess(data){
		if(data.code == '0'){
			if(data.data.success == true){
				$(".open_info .name").val("");
				$(".open_info .phone").val("");
				$(".open_info .address").val("");
				window.location.href = "submit.html";
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
