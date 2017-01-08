   //马上我知道了
$(".sellphone01").on("click",function(){
	//先验证手机号正则
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".phoneText01").val() == '') {
        		$(".phoneText01").attr("placeholder","请输入手机号");
            return;
        }
       if (!phoneReg.test($('.phoneText01').val())) {
       	$(".phoneText01").val("");
       	$(".phoneText01").attr("placeholder","手机号不正确");
            return;
        }

	var valuePhone=$(".phoneText01").val()
	//data传参
	var dataT='{"activityCode": "6","singleCode": "' + valuePhone + '"}';
	$.post(getUrl()+"api/activity/ahs/common/enjoyActivity", {
            "methodName": "enjoyActivity",
            "timestamp": Date.parse(new Date()),
            "version": "1.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "m",
            "data": dataT
        }).success(function (data) {
       	 	if(data.code == 0){
					$(".phoneNum01").css("display","none")
            			showAlert(data.msg);
            			$(".phone01").css("display",'none')
            			setTimeout(function(){
            				window.location.href="http://m.aihuishou.com/shouji";
            			},200);
            		}else{
            			$(".phoneText01").val("");
            			showAlert(data.msg);
            		} 
        });		
})
//自定义弹窗
 function showAlert(msg) {
        $('body').append($("<div id='message'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '8rem',
                'height': '1.5rem',
                'z-index': 60000,
                'color': '#fff',
                'line-height': '0.2rem',
                'text-align': 'center',
                'border-radius': '0.1rem'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
 
//弹出框
$(".gewaraData").on("click",function(){
	$(".mengceng").css("display","block")
	$(".chuang").css("display","block")
})
$(".mengceng").on("click",function(){
	$(this).css("display","none")
	$(".chuang").css("display","none")
	$(".phoneText01").val("")
})



