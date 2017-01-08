define(['jquery','demo','url'],function($,demo,_){
$(function(){
	//商品id
	var goodsId=demo.urlParams().goodsId;
	//订单id(提交订单后返回)
	var orderId=1;
	//商品价格
	var goodsPrice;
	//我的积分
	var myPoints;
	//
	//①获取用户的信息（主要是获取积分）
	if(localStorage.getItem('token')){
		$.ajax({
			type:"get",
			url:_.url+'api/user/queryUserInfo/'+localStorage.getItem('token'),
			async:true,
		}).success(function(data){
			console.log(data)
			if(data.code==0){
				if(data.data.success ==true){
					//用户积分
					myPoints=parseInt(data.data.userInfo.balance);
					//判断
					if(goodsPrice<=myPoints){
						$('#exchange').addClass('active').html('立即兑换').attr('exchangeState','more');
					}else{
						$('#exchange').removeClass('active').html('回收币不足').attr('exchangeState','less');
					}
				}else{
					//token失效（登录失效 重新登录）
					$('#exchange').addClass('active').html('登录后兑换').attr('exchangeState','no');
					demo.showAlert(data.data.message);
				}
			}else{
				demo.showAlert(data.msg);				
			}
		});	
	}else{
		$('#exchange').addClass('active').html('登录后兑换').attr('exchangeState','no');
	}
	//②商品信息(根据商品id查询商品信息goodsId)
	$.ajax({
		type:"GET",
		url:_.url+'api/mall/goods/queryInfo/'+goodsId,
		async:true
	}).success(function(data){
		//console.log(data)
		if(data.code==0){
			if(data.data.success==true){
				//操作数据 呈现数据data.data.goodsInfo.
				$('.goodsname').html(data.data.goodsInfo.goodsName);
				$('.goodstitle').html(data.data.goodsInfo.description);
				$('.goodstime').html('有效期：'+data.data.goodsInfo.validDate);
				//富文本
				//下部价格
				$('.nowprice').html(data.data.goodsInfo.pointsPrice+'回收币');
			    goodsPrice=parseInt(data.data.goodsInfo.pointsPrice);
				$('.oldprice').html('原价'+parseInt(data.data.goodsInfo.marketPrice)/100)
			}else{
				demo.showAlert(data.data.message)
			}
		}else{
			demo.showAlert(data.msg)
		}
	});
	
	//③进行兑换（需要验证token）
	$('#exchange').on('click',function(){
		var state=$(this).attr('exchangeState');
		if(state=='more'){
			$('#success_message').show();
		}else if(state=='less'){
			demo.showAlert('您的回收币不足')
		}else{
			//未登录跳转登录页面
			//window.location=''
		}
		
	});	
	//取消兑换---
	$('.makecancle').click(function(){
		$(this).parent().parent().hide()
	})
	//确定兑换---
	$('.makesure').click(function(){
		//提交兑换
		$.ajax({
			type:"post",
			url:_.url+'api/mall/order/submit/'+localStorage.getItem('token'),
			async:true,
			data:{
				"goodsId": 1,
				"pointsPrice": 200,
				"rmbPrice": 0,
				"goodsNum": 1
			}
		}).success(function(data){
			if(data.code==0){
				if(data.data.success==true){
					console.log(data)
					//返回值里面尚未添加订单id 写死的orderId=1
					window.location='../exchangedetails/index.html?exchangeorder=1&goodsId='+goodsId+'&orderId='+orderId;
				}else{
					demo.showAlert(data.data.message)
				}
			}else{
				demo.showAlert(data.msg)
			}
		});
		//跳转兑换详情页面
		//window.location=''
	});	
})
})