$(function(){
	
	var token = localStorage.getItem("token");
	if(token == null || token == ""){
		sessionStorage.setItem("pagename","../list/index.html");
		window.location.href="../login/index.html";
	}
	
	init();
	
	function init(){
		//分享弹窗
		var params = commonObj.urlParam();
		if(params['flag'] != undefined){
			commonObj.master();
			var popDom = "<div class=share-pop>"+
				"<div class=pop-bor>"+
					"<img src='images/success.png' class=suc>"+
					"<p class='title'>预约成功！</p>"+
					"<p>请等待爱回收小哥</p>"+
					"<p>上门取货</p>"+
					"<span>分享给好友</span>"+
				"</div>"+
				"<img src='images/close.png' class='close'/>"+
			"</div>";
			$(".master").append($(popDom));
			commonObj.wxInit();
			 var title = "旧手机卖出好价钱，就找爱回收";
			 var desc = "爱回收完成D轮融资，超高额现金券，限量疯抢!";
			 var pyq = "http://www.angellg.com/apply/index.html";
			 var py = "http://www.angellg.com/apply/index.html";
			 var elseUrl = "http://www.angellg.com/apply/index.html";
			 var imgUrl = "http://www.angellg.com/apply/images/box.png";
			commonObj.wxShare(title,elseUrl,imgUrl,desc,pyq,py);
		}
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
		commonObj.ax(commonObj.production()+"api/recycle/order/queryOrderList/"+token,dataInfo,true,"get",null, function(data){dataSuccess(data)}, function(){dataError()});
	};
	function creatDom(orderId,createDt,status,priceOrDateTime){
		return item = "<li class=item data-orderid="+orderId+">"+
				"<div class=item-title>"+
					"<span class=left>下单时间："+createDt+"</span>"+
					"<span class=right>"+status+"</span>"+
				"</div>"+
				"<div class=clearfix></div>"+
				"<div class=item-bot>"+
					"<div>"+
						"<img src='images/box.png'/>"+
					"</div>"+
					"<div class=info><div class=bor>"+priceOrDateTime+"</div></div>"+
				"</div>"+
				"<div class=clearfix></div>"+
				"</li>";
	}
	function dataSuccess(data){
		if(data.code == "0"){
			if(data.data.success == true){
				$('.list ul').remove("li");
				var dataList = data.data.orderList;
				var len = dataList.length;
				if(len == 0 || dataList == null){
					$('.empty').show();
				}else{
					$('.empty').hide();
					for(var i = 0; i< len;i++){
						var orderId = dataList[i].orderId;
						var dateTime = dataList[i].date;
						var time = dataList[i].time;
						var createDt = dataList[i].createDt;
						var status = dataList[i].status;
						var price = dataList[i].price;
						var liDom = "";
						if(status == "已完成"){
							liDom = creatDom(orderId,createDt,status,"订单价格："+price+"回收币");
						}else{
							liDom = creatDom(orderId,createDt,status,"预期完成："+dateTime+"<br/><span>"+time+"</span>");
						}
						$('.list ul').append(liDom);
					}
				}
				
			}else{
				$('.empty').show();
			}
		}else{
			commonObj.tips(data.msg);
		}
	};
	function dataError(){
		commonObj.tips("出错喽！");
	};
	$('.list ul').delegate("li","click",function(){
		var orderId = $(this).attr("data-orderid");
		window.location.href = "detail.html?orderId="+orderId;
	});
	$("body").delegate(".master","touchstart",function(){
		commonObj.closeMaster();
	});
	$("body").delegate(".pop-bor","touchstart",function(e){
		e.stopPropagation();
	});
	$("body").delegate(".pop-bor span","touchstart",function(e){
		e.stopPropagation();
		$(".share-pop").remove();
		$('.master').append($('<div style=position:absolute;right:8px;top:8px;><span style=color:#F6E627;font-size:18px;margin-right:5px;>点击分享</span><img src="images/icon.png" style=height:60px;width:42px;/></div>'));
	});
})
