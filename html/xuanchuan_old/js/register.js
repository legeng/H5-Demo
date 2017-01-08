$(function(){
	var locUrl = "http://m.mk.aiweixiu.com/api/activity/bd/getCompanyOrder";
	$(".txt").on("click",function(){
		var company = $(".company").val();
		var username = $(".username").val();
		var tel = $(".tel").val();
		var are = $(".are").val();
		if(company==""){
			$(".company_label").html("请填写公司名称！");
			return false;
		}else{
			$(".company_label").html("");
		}
		if(username==""){
			$(".username_label").html("请填写联系人姓名！");
			return false;
		}else{
			$(".username_label").html("");
		}
		if(tel==""){
			$(".tel_label").html("请填写联系电话！");
			return false;
		}else{
			var phoneReg = /1[3,4,5,7,8]\d{9}/;
	        if ( phoneReg.test(tel) ) {
	            $(".tel_label").html("");
	        } else {
	            $(".tel_label").html("联系电话格式不正确！");
				$(".tel").val("");
				return false;
	        }
		}
		var dataJson = '{"companyName":"' + company +'","linkmanName":"'+username+'","linkmanMobile":"'+tel+'","notes":"'+are+'"}';
		$.post(locUrl,{
    			"methodName": "getCompanyOrder",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "PC",
            "data": dataJson
    		}).success(function(data){
    			if(data.code == 0){
    				$(".company").val("");
				$(".username").val("");
				$(".tel").val("");
				$(".are").val("");
				$(".sub_info").html("提交信息成功，我们将尽快与您联系！");
    			}else{
    				$(".sub_info").html(data.msg);
    			}
    		});
    		
		
	});
});
