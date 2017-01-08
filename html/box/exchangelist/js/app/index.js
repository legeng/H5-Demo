define(['jquery','demo','url'],function($,demo,_){
	$(function(){
		//token
				var result='';
				$.ajax({
	                type: 'GET',
	                url:_.url+'api/mall/order/queryList/'+localStorage.getItem('token'),
	                dataType: 'json',
	                success: function(data){
	                	   console.log(data)
	                	   if(data.code==0){
	                	   		if(data.data.success==true){
	                	   			var arrLen=data.data.orderList.length;
	                	   			if(arrLen>0){
			                        for(var i=0; i<arrLen; i++){
			                            result +=
											'<li class="exchange_item" orderId="'+data.data.orderList[i].orderId+'" goodsId="'+data.data.orderList[i].goodsId+'">'
												+'<div><img src="images/avatar.png"/></div>'
												+'<div class="detail_msg">'
													+'<p>'+data.data.orderList[i].goodsName+'</p>'
													+'<span>有效期：'+data.data.orderList[i].validDate+'</span>'
													+'<i>'+data.data.orderList[i].pointsPrice+'回收币</i>'
												+'</div>'
											+'</li>'										
			                        }	                	   				
	                	   			}else{
	                	   			   	 //一条数据没有的话
	                	   			   	 $('.exchange_empty').show();
	                	   			   	 $('.exchange_list').remove();
	                	   			} 
	                	   			$('.exchange_list').append(result);
	                	   		}else{
	                	   			//token失效了 需要跳转登录页面登录
	                	   			demo.showAlert(data.data.message)
	                	   		}
	                	   }else{
	                	   		demo.showAlert(data.msg)
	                	   }
	                }
	            });
	 	//点击列表进入详情页面
	 	$('.exchange_list').delegate('li','click',function(){
	 		window.location='../exchangedetails/index.html?goodsId='+$(this).attr('goodsId')+'&orderId='+$(this).attr('orderId');
	 		console.log($(this).attr('goodsId')+'------'+$(this).attr('orderId'))
	 	})
	})
})