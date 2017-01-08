define(['jquery','demo','url'],function($,demo,_){
$(function(){
		//兑换成功弹窗 操作
		$('#doclose').on('click',function(){
			$(this).parent().parent().hide()
		});
		//
		//判断是刚刚兑换完成的页面   还是查看老的兑换记录
		if(demo.urlParams().exchangeorder==1){
			$('.exchange_success').show();
		}
		$('.content_ p').on('click',function(){
			$(this).parent().parent().hide();
			$('.go_share').show()
		})
		//新兑换的页面  有弹窗 显示分享
		$('.go_share').on('click',function(){
			$(this).hide()
		})
		//需要从下单页面、list页面带两个参数 goodsId orderId
		var goodsId=demo.urlParams().goodsId;
		var orderId=demo.urlParams().orderId;
		//①获取商品详情
		$.ajax({
			type:"GET",
			url:_.url+'api/mall/goods/queryInfo/'+goodsId,
			async:true
		}).success(function(data){
			console.log(data)
			if(data.code==null){
				if(data.data.success==true){
					//商品名称、描述、图片、下面富文本
					$('.goodsname').html(data.data.goodsInfo.goodsName);
					$('.goodstitle').html(data.data.goodsInfo.description);
				}else{
					demo.showAlert(data.data.message)
				}
			}else{
				demo.showAlert(data.msg)
			}
		});		
		//②获取订单详情
		$.ajax({
			type:"GET",
			url:_.url+'api/mall/order/queryInfo/'+localStorage.getItem('token')+'/'+orderId,
			async:true
		}).success(function(data){
			console.log(data);
			if(data.code==0){
				if(data.data.code==0){
					//有效期、兑换码code
					$('.goodstime').html('有效期：'+data.data.orderInfo.validDate);
					$('#true_code').html(data.data.orderInfo.codeList[0].code)
				}else{
					//是否有token失效 重新登录问题
					demo.showAlert(data.data.message)
				}
			}else{
				demo.showAlert(code.msg)
			}
		});
		
		
		
})
})