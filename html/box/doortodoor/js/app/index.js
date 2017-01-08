define(['jquery','demo','url'],function($,demo,_){
	//首先校验token
	if(localStorage.getItem('token')==null || localStorage.getItem('token')==''){
		sessionStorage.setItem('pagename','../doortodoor/index.html');
		location.href='../login/index.html';
	}
	//1、查询用户地址列表(自动填写页面信息)
	$.ajax({
		type:"get",
		url:_.url+'api/user/address/queryAddress/'+localStorage.getItem('token')+'/1',
		async:true
	}).success(function(data){
		//console.log(data)
		if(data.code==0){
			if(data.data.success==true){
				//可以执行下一步操作
				if(data.data.addressList.length>0){
					var result=data.data.addressList[0]
					$('.name input').val(result.linkName)
					$('.tel input').val(result.mobile)
					$('.detail_address textarea').val(result.address)
				}
			}else{
				if(data.data.code=="200012"){
					sessionStorage.setItem('pagename','../doortodoor/index.html');
					location.href='../login/index.html';
					
				}else{
					demo.showAlert(data.data.message)
				}				
			}
		}else{
			demo.showAlert(data.msg)
		}
	});	
	//自动弹键盘
	$('input，textarea').on('click', function () {
    		var target = this;
    		setTimeout(function(){
         	 target.scrollIntoViewIfNeeded();
         	 console.log('scrollIntoViewIfNeeded');
        },400);
    });
    //
    var sex=0;
    //标注男士女士
    $('.message .list-content .name p i').on('click',function(){
    		$(this).addClass('active').siblings().removeClass('active');
    		sex=$(this).index();
    })
	//
 	//2提交回收订单
 	$('.bottom_btn').on('click',function(){
 		var index=$(this).attr('stateId');
 		if($('.name input').val().trim()==''){
 			demo.showAlert('请输入联系人姓名');
 			return;
 		}
 		//验证手机号码
 	 	var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".tel input").val().trim()== '') {
            demo.showAlert("请输入联系人手机号");
            return;
        }
        if (!phoneReg.test($('.tel input').val())) {
            demo.showAlert("联系人手机号不正确");
            return;
        }
        //textarea详细地址
        if($('.detail_address textarea').val().trim()==''){
        		demo.showAlert("请输入详细地址");
            return;
        }
        //取货时间
        if($('.time input').val().trim()==''){
        		demo.showAlert("请选择取货时间");
            return;
        }
        //ajax下单  
        submitOrder();
 	})
//
 	function submitOrder(){
    		var linkname=$('.name input').val().trim();
		var mobile=$(".tel input").val().trim();
		var address=$('.detail_address textarea').val().trim();
 		var arr=$('.time input').val().split(' ');		
		var expectDate=new Date().getFullYear()+"-"+arr[0];
 		var expectTime=arr[2];
		var send_info = '{"linkName":"'+linkname+'","mobile":"' + mobile + '","regionId":"1","address":"'+address+'","sex":"'+sex+'","serviceType":"1","source":"1","expectDate":"'+expectDate+'","expectTime":"'+expectTime+'"}';
 		var data = {
            "methodName": "submitOrder",
            "timestamp": Date.parse(new Date()),
            "version": "1.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "wx",
            "data": send_info
       };	
       
 		$.ajax({
 			type:"post",
 			url:_.url+'api/recycle/order/submitOrder/'+localStorage.getItem('token'),
 			data:data	
 		}).success(function(data){
 			console.log(data)
 			if(data.code==0){
 				if(data.data.success==true){
 					location.href='../list/index.html'
 				}else{
 					demo.showAlert(data.data.message)
 				}
 			}else{
 				demo.showAlert(data.msg)
 			}
 			//
 		});
 	}
 	//检测信息完整性
 	function checkMessage(){
 		var linkname=$('.name input').val().trim();
	 	var mobile=$(".tel input").val().trim();
	 	var address=$('.detail_address textarea').val().trim();
	 	var sentDate=$('.time input').val().trim();
 		if(linkname!=''&&mobile!=''&&address!=''&&sentDate!=''){
 			$('.bottom_btn').addClass('active')
 		}else{
 			$('.bottom_btn').removeClass('active')
 		}
 	}
 	$('body').delegate($('.mui-active'),'tap',function(){
 		checkMessage()
 	});
   	$('.name input').on('blur input propertychange keyup focus',function(){
 		checkMessage();
   	})
   	$(".tel input").on('blur input propertychange keyup focus',function(){
   		checkMessage();
   	})
   	$('.detail_address textarea').on('blur input propertychange keyup focus',function(){
   		checkMessage();
   	})
})