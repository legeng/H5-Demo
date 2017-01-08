define(['jquery','url','demo','lazyload'],function($,_,demo){
	//① 查询用户信息
	if(localStorage.getItem('token')){
		$.ajax({
			type:"get",
			url:_.url+'api/user/queryUserInfo/'+localStorage.getItem('token'),
			async:true,
		}).success(function(data){
			if(data.code==0){
				if(data.data.success ==true){
					$('.logined').show();$('.no-login').hide();
					$('.user_name').html(data.data.userInfo.mobile);
					$('.user_message p').html(data.data.userInfo.balance+'回收币')
				}else{
					demo.showAlert(data.data.message);
				}
			}else{
				demo.showAlert(data.msg);				
			}
		});	
	}else{

	}
	//
	//②查询推荐商品（banner图位置信息）
	var hotCateId=1;
	$.ajax({
		type:"get",
		url:_.url+'api/mall/goods/queryHotList/'+hotCateId,
		async:true,
	}).success(function(data){
		//console.log(data)
		if(data.code==0){
			if(data.data.success==true){
				if(data.data.cateList.length>0){
					//取出唯一特惠banner图片
					//data.data.cateList[0].goodsList[0].goodsImg
					$('.mall-banner img').attr('data-original','images/bannerGroup.png');
					//懒加载
					$("img.bannerlazy").lazyload({  
				            effect: "fadeIn",
				            //event : "sporty"
					        event: 'click'
				            //threshold: 200,
					});	
					//详情
					$('.banner_details').show()
					//特惠商品id  
					$('.mall-banner').attr('goodsId',data.data.cateList[0].goodsList[0].goodsId)
					//goodsName
					$('.banner_title').html(data.data.cateList[0].goodsList[0].goodsName)
					//pointsPrice
					$('.banner_pointsPrice').html(data.data.cateList[0].goodsList[0].pointsPrice+'回收币')
					//marketPrice/100
					$('.banner_marketPrice').html('原价￥'+parseInt(data.data.cateList[0].goodsList[0].marketPrice)/100)
					//description	
					$('.banner_description').html(data.data.cateList[0].goodsList[0].description)
				}
			}else{
				demo.showAlert(data.data.message);
			}
		}else{
			demo.showAlert(data.msg)
		}
	});
	//点击本周特惠
	$('.mall-banner').click(function(){
		var index=$(this).attr('goodsId')
		if(index!=''){
			window.location='../goodsdetails/index.html?goodsId='+index;
		}	
	})
})