$(function(){
	var token = localStorage.getItem("token");
	if(token == null || token == ""){
		sessionStorage.setItem("pagename","../list/detail.html");
		window.location.href = "../login/index.html";
	}else{
		var params = commonObj.urlParam();
		if(params['orderId'] != undefined){
			var dataInfo = {
	            "methodName": "region",
	            "timestamp": Date.parse(new Date()),
	            "version": "1.0",
	            "token": "",
	            "sign": "",
	            "channelCode": "",
	            "clientType": "wx",
	            "data": ""
	       };
		commonObj.ax(commonObj.production()+"api/recycle/order/queryOrderInfo/"+token+"/"+params['orderId'],dataInfo,true,"get",null, function(data){dataSuccess(data)}, function(){dataError()});
	    	//界面逻辑
		$(".bot").delegate(".cancel","click",function(){
			commonObj.master();
			var popDom = "<div class=cause-pop>"+
					"<p class=cause-title>请告诉我们取消的原因？</p>"+
					"<ul>"+
						"<li>暂时不需要了</li>"+
						"<li>更改上门时间</li>"+
						"<li>回收价格原因</li>"+
						"<li>服务态度问题</li>"+
					"</ul>"+
					"<p class=close-pop>点错了，不取消</p>"+
				"</div>";
			$('.master').append($(popDom));
		});
		//取消订单
	    	$("body").delegate(".master ul li","touchstart",function(e){	
			var info = '{"reasonId":"'+$(this).index()+'","reason":"' + $(this).html() + '"}';
			var dataInfo = {
		            "methodName": "cancelOrder",
		            "timestamp": Date.parse(new Date()),
		            "version": "1.0",
		            "token": "",
		            "sign": "",
		            "channelCode": "",
		            "clientType": "wx",
		            "data": info
		       };
			commonObj.ax(commonObj.production()+"api/recycle/order/cancelOrder/"+token+"/"+params['orderId'],dataInfo,true,"get",null, function(data){cancelSuccess(data)}, function(){dataError()});	
		});
		
		}
	}
	function cancelSuccess(data){
		console.log(data);
		if(data.code == '0'){
			if(data.data.success == true){
				commonObj.tips(data.data.message);
				setTimeout(function(){
					window.location.href = "index.html";
				},1200);
			}else{
				commonObj.tips(data.data.message);
			}
		}else{
			commonObj.tips(data.msg);
		}
	};
	function dataSuccess(data){
		console.log(data);
		if(data.code == '0'){
			if(data.data.success == true){
				var orderNo = data.data.orderInfo.orderNo;
				var statusName = data.data.orderInfo.statusName;
				var price = data.data.orderInfo.price;
				var createDt = data.data.orderInfo.createDt;
				var address = data.data.orderInfo.address;
				var linkName = data.data.orderInfo.linkName;
				var mobile = data.data.orderInfo.mobile;
				var sex = data.data.orderInfo.sex == '0'?"先生":"女士";
				var expectDate = data.data.orderInfo.expectDate+"&nbsp;"+data.data.orderInfo.expectTime;
				var linkPeople = linkName + "&nbsp;"+sex;
				$(".status").html(statusName);
				if(statusName == "已确认"){
					$(".content img").attr("src","images/icon01.png");
					$(".statusIfo").html("您的预约已确认，我们正在为您安排回收小哥");
					$(".bot").append($('<a href="#" class="cancel">取消订单</a><a href="tel:15726672655" class="tel"><i></i>联系客服</a>'));
				}else if(statusName == "已完成"){
					$(".content img").attr("src","images/icon03.png");
					$(".statusIfo").html("您本次回收价格为<span style=color:#ED6700;font-size:14px>"+price+"回收币</span>，感谢您对我们的信任与支持");
					$(".bot").append($('<a href="#" class="on">分享订单</a><a href="tel:15726672655"><i></i>联系客服</a>'));
				}else if(statusName == "上门中"){
					$(".content img").attr("src","images/icon02.png");
					$(".statusIfo").html("回收小哥正在火速赶往您的地址途中，请耐心等待");
					$(".bot").append($('<a href="tel:15726672655" class="tel"><i></i>联系客服</a>'));
				}else{
					$(".content img").attr("src","images/icon04.png");
					$(".statusIfo").html("我们正在对您的货物进行分类处理中，预计还需8小时");
					$(".bot").append($('<a href="tel:15726672655" class="tel"><i></i>联系客服</a>'));
				}
				$(".orderId").html(orderNo);
				$(".expectDate").html(expectDate);
				$("#address").html(address);
				$(".creatTime").html(createDt);
				$("#linkPeople .pInfo").html(linkPeople);
				$("#linkPeople .shouji").html(commonObj.hidePhoneNum(mobile,3,2));
			}else{
				window.location.href = "../login/index/html";
			}
		}else{
			commonObj.tips(data.msg);
		}
	};
	function dataError(){
		commonObj.tips("出错啦！");
	};
	$(".bot").delegate("a.on","touchstart",function(){
		commonObj.master();
		$('.master').append($('<div style=position:absolute;right:8px;top:8px;><span style=color:#F6E627;font-size:18px;margin-right:5px;>点击分享</span><img src="images/icon.png" style=height:60px;width:42px;/></div>'));
	});
	$("body").delegate(".close-pop","touchstart",function(){
		commonObj.closeMaster();
	});
	$("body").delegate(".master","touchstart",function(){
		commonObj.closeMaster();
	});
});
