$(function(){
	var key;
	function initNum(){
		key='';
		$('.finalPrice').html('?元');
		$('.junPrice span').html('均价?元');	
	}
	$('.mobileType li').on('click',function(){
		initNum();
		changeImg();
		$('.right div').eq($(this).index()).show().siblings().hide()
		var index=$(this).index()+1;
		$(this).css('background-image','url(images/'+index+index+'.png)');
		if($(this).index()==0){
			setOrder(brand1,model1,mobileIndex1+","+satisfyIndex1);	
		}else if($(this).index()==1){
			setOrder(brand2,model2,satisfyIndex2);	
		}else if($(this).index()==2){
			setOrder(brand3,model3,mobileIndex3+","+satisfyIndex3);	
		}else if($(this).index()==3){
			setOrder(brand4,model4,mobileIndex4+","+satisfyIndex4);	
		}else if($(this).index()==4){
			setOrder(brand5,model5,satisfyIndex5);	
		}else if($(this).index()==5){
			setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);	
		}
	})
	function changeImg(){
		for(i=1;i<7;i++){
			$('.mobileType li').eq(i-1).css('background-image','url(images/'+i+'.png)')	
		}
	}
//引用M版
//iphone6
var brand1='iphone';
var model1='23260';
var mobileIndex1='2023';
var satisfyIndex1='3966';
$('.up1 li').click(function(){
	initNum();
	$(this).addClass('upActive').siblings().removeClass('upActive');
	if($(this).index()==0){	
		mobileIndex1='2021';
		setOrder(brand1,model1,mobileIndex1+","+satisfyIndex1);		
	}else{
		mobileIndex1='2023';
		setOrder(brand1,model1,mobileIndex1+","+satisfyIndex1);	
	}
});
$('.down1 li').click(function(){
	initNum();
	if($(this).index()==0){
		$(this).css('background-image','url(images/kuang11.png)');
		$(this).siblings().css('background-image','url(images/kuang2.png)');
		$('.spe').css('background-image','none');
		satisfyIndex1='3966';
		setOrder(brand1,model1,mobileIndex1+","+satisfyIndex1);
	}else{
		satisfyIndex1='3969';
		$(this).css('background-image','url(images/kuang22.png)');
		$(this).siblings().css('background-image','url(images/kuang1.png)');
		$('.spe').css('background-image','none');
		setOrder(brand1,model1,mobileIndex1+","+satisfyIndex1);
	}
});
//小米
var brand2='xiaomi';
var model2='23352';
//var mobileIndex2='83751';
var satisfyIndex2='3972';
$('.down2 li').click(function(){
	initNum();
	if($(this).index()==0){
		$(this).css('background-image','url(images/kuang11.png)');
		$(this).siblings().css('background-image','url(images/kuang2.png)');
		$('.spe').css('background-image','none');
		satisfyIndex2='3972';
		setOrder(brand2,model2,satisfyIndex2);
	}else{
		satisfyIndex2='3973';
		$(this).css('background-image','url(images/kuang22.png)');
		$(this).siblings().css('background-image','url(images/kuang1.png)');
		$('.spe').css('background-image','none');
		setOrder(brand2,model2,satisfyIndex2);
	}
});
//华为
var brand3='huawei';
var model3='23350';
var mobileIndex3='2023';
var satisfyIndex3='3967';
$('.up3 li').click(function(){
	initNum();
	$(this).addClass('upActive').siblings().removeClass('upActive');
	if($(this).index()==0){	
		mobileIndex3='2022';
		setOrder(brand3,model3,mobileIndex3+","+satisfyIndex3);		
	}else{
		mobileIndex3='2023';
		setOrder(brand3,model3,mobileIndex3+","+satisfyIndex3);		
	}
});
$('.down3 li').click(function(){
	initNum();
	if($(this).index()==0){
		$(this).css('background-image','url(images/kuang11.png)');
		$(this).siblings().css('background-image','url(images/kuang2.png)');
		$('.spe').css('background-image','none');
		satisfyIndex3='3967';
		setOrder(brand3,model3,mobileIndex3+","+satisfyIndex3);	
	}else{
		satisfyIndex3='3968';
		$(this).css('background-image','url(images/kuang22.png)');
		$(this).siblings().css('background-image','url(images/kuang1.png)');
		$('.spe').css('background-image','none');
		setOrder(brand3,model3,mobileIndex3+","+satisfyIndex3);	
	}
});
//三星
var brand4='sanxing';
var model4='23351';
var mobileIndex4='2014';
var satisfyIndex4='3970';
$('.up4 li').click(function(){
	initNum();
	$(this).addClass('upActive').siblings().removeClass('upActive');
	if($(this).index()==0){
		mobileIndex4='2014';
		setOrder(brand4,model4,mobileIndex4+","+satisfyIndex4);		
	}else{
		mobileIndex4='2015';
		setOrder(brand4,model4,mobileIndex4+","+satisfyIndex4);		
	}
});
$('.down4 li').click(function(){
	initNum();
	if($(this).index()==0){
		$(this).css('background-image','url(images/kuang11.png)');
		$(this).siblings().css('background-image','url(images/kuang2.png)');
		$('.spe').css('background-image','none');
		satisfyIndex4='3970';
		setOrder(brand4,model4,mobileIndex4+","+satisfyIndex4);	
	}else{
		satisfyIndex4='3971';
		$(this).css('background-image','url(images/kuang22.png)');
		$(this).siblings().css('background-image','url(images/kuang1.png)');
		$('.spe').css('background-image','none');
		setOrder(brand4,model4,mobileIndex4+","+satisfyIndex4);	
	}
});
//相机
var brand5='jianeng';
var model5='23349';
//var mobileIndex5='83742';
var satisfyIndex5='3956';
$('.down5 li').click(function(){
	initNum();
	if($(this).index()==0){
		$(this).css('background-image','url(images/kuang11.png)');
		$(this).siblings().css('background-image','url(images/kuang2.png)');
		$('.spe').css('background-image','none');
		satisfyIndex5='3956';
		setOrder(brand5,model5,satisfyIndex5);	
	}else{
		satisfyIndex5='3957';
		$(this).css('background-image','url(images/kuang22.png)');
		$(this).siblings().css('background-image','url(images/kuang1.png)');
		$('.spe').css('background-image','none');
		setOrder(brand5,model5,satisfyIndex5);		
	}
});
//mac
var brand6='mac';
var model6='23348';
var mobileIndex6='3961';
var satisfyIndex6='3954';
$('.up6 li').click(function(){
	initNum();
	$(this).addClass('upActive').siblings().removeClass('upActive');
	if($(this).index()==0){	
		mobileIndex6='3958';
		setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);		
	}else if($(this).index()==1){
		mobileIndex6='3959';
		setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);			
	}else if($(this).index()==2){
		mobileIndex6='3960';
		setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);			
	}else{
		mobileIndex6='3961';
		setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);			
	}
});
$('.down6 li').click(function(){
	initNum();
	if($(this).index()==0){
		$(this).css('background-image','url(images/kuang11.png)');
		$(this).siblings().css('background-image','url(images/kuang2.png)');
		$('.spe').css('background-image','none');
		satisfyIndex6='3954';
		setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);		
	}else{
		satisfyIndex6='3955';
		$(this).css('background-image','url(images/kuang22.png)');
		$(this).siblings().css('background-image','url(images/kuang1.png)');
		$('.spe').css('background-image','none');
		setOrder(brand6,model6,mobileIndex6+","+satisfyIndex6);		
	}
});

//回收
$('.gohuishou').on('click',function(){
	window.location='http://www.aihuishou.com/userinquiry/'+key;
});					 
var myurl='http://mk.aiweixiu.com';
//接口(下单)
function setOrder(brandId,modelId,attrs){
		var data='{"brandId":"'+brandId+'","modelId":"'+modelId+'","attrs":"'+attrs+'"}'
	    $.post(myurl+'/api/activity/common/inquiry', {
            "methodName": "inquiry",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": data
        }).success(function (data) {
            if(data.code == 0){
            		key=data.body.inquiryKey;
            		$('.finalPrice').html(data.body.price+'元');
            		var yuan=Math.floor(parseInt(data.body.price)-Math.sqrt(parseInt(data.body.price)/5)*10);
            		if(yuan>0){
            			$('.junPrice span').html('均价'+yuan+'元');
            		}else{
             		$('.junPrice span').html('均价'+data.body.price+'元');           			
            		}
            }else{
           
            }
        });	
}
setOrder(brand1,model1,mobileIndex1+","+satisfyIndex1);	
//订阅接口
function subscribe(mobile){
		var activityCode='ACT_905_YKJ';
		var data='{"mobile":"'+mobile+'","activityCode":"'+activityCode+'"}'
	    $.post(myurl+'/api/activity/common/subscribe', {
            "methodName": "subscribe",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": data
        }).success(function (data) {
            if(data.code == 0){
           	 	$('html,body').css({'height':'100%','overflow':'auto'});
           	 	$('.blackOne').hide();
           	 	$('.winDing').hide();
            		showAlert('订阅成功');
            }else{
           		showAlert(data.msg);
            }
        });
}
//订阅弹窗
$('.dingyue').click(function(){
	$('.blackOne').show();
	$('.winDing').show();
	$('html,body').css({'height':'100%','overflow':'hidden'});
})
$('.dingClose').click(function(){
	$('.blackOne').hide();
	$(this).parent().hide();
	$('html,body').css({'height':'100%','overflow':'auto'});
})
$('.blackOne').click(function(){
	$(this).hide();
	$('.winDing').hide();
	$('html,body').css({'height':'100%','overflow':'auto'});
})
$('.goDing').click(function(){
	    var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($('.yourMobile').val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('.yourMobile').val())) {
            showAlert("联系手机号不正确");
            return;
        }
	    subscribe($('.yourMobile').val());
})













 function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '50%',
                'margin-left':'-190px',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '380px',
                'height': '72px',
                'z-index': '999999',
                'font-size':'24px',
                'color': '#fff',
                'line-height': '72px',
                'text-align': 'center',
                'border-radius': '5px',
                'z-index':"9999999"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }	
	
	
	











		
})
