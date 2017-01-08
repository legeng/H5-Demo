var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
    //showAlert
    	function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '8rem',
                'height': '1.5rem',
                'z-index': 10,
                'font-size':'0.8rem',
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem',
                'z-index':"2000000"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }

     //登录
    function login(){
    	    var verifyCode = "";
    		var flag = $(".pageTwo").css("display");
    		if(flag=="block"){
    			verifyCode = $("#verifyCode01").val();
    		}else{
    			verifyCode = $("#verifyCode").val();
    		}
		var phoneJson = '{"mobile":"' + $('#tel').val() + '","verifyCode":"' + verifyCode + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_715_REDPACKETS"}';    		
        $.post(url + "/userLogin", {
            "methodName": "userLogin",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": phoneJson
        }).success(function (data) {
        	console.log(data)
            if(data.code == 0){    
         	  // showAlert("登录成功");
         	   localStorage.setItem("token",data.body.token);
                smsClicked = 1;
                $('.phone-yzm').removeClass("phone-yzm-gray");
                $(".phone-yzm").html('获取验证码');
                clearInterval(timer);
            	  //制空
                  $("#verifyCode").val("");
                  $("#verifyCode01").val("");
                  //$("#certCode").val("");
              //接口
                    var trigger="ONCE_GET";
              	    var source="fangtianxia";
              	    var medium="fangtianxia";
              	    var campaign="715_REDPACKETS";
              	    var sendType='pages';
                    var activityCode = 'ACT_715_REDPACKETS';
				    var rangeNum ='1';
                  	var tokenOutRed = localStorage.getItem("token");   
                  	var data='{"token":"'+tokenOutRed+'","activityCode":"'+activityCode+'","rangeNum":"'+rangeNum+'","trigger":"'+trigger+'","source":"'+source+'","medium":"'+medium+'","campaign":"'+campaign+'","sendType":"'+sendType+'"}' 
                
					$.post("http://mk.aiweixiu.com/api/activity/common/receiveCoupon", {
			            "methodName": "receiveCoupon",
			            "timestamp": Date.parse(new Date()),
			            "version": "1.0",
			            "token":"",
			            "sign": "",
			            "channelCode": "",
			            "clientType": "mobile",
			            "data": data
		       	   }).success(function (data) {
		       	   		if(data.code==0){
		       	   			$('.mengCeng').css('display','block');
		       	   			$('.successB').html(data.body.rewardCode)
		       	   			$('.successTicket').css('display','block');
		       	   		}else{
		       	   				showAlert(data.msg);	       	   			
		       	   		}		       	   
		       	   }) 
		      	   
            }else{
            		showAlert(data.msg);
         
            }
        });
    }
    //带有图片验证码方式获取手机验证码  code=-1   body.certCode=true显示获取图形验证码
    function imgLogin(){
    		var phoneJson = '{"mobile":"' + $('#tel').val() + '","certCode":"' + $("#certCode").val() + '","singleCode":"'+currentId[0]+'"}';    		
        $.post(url + "/sendVerifyCode", {
            "methodName": "sendVerifyCode",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": phoneJson
        }).success(function (data) {
            if(data.code == 0){
                getSmsButton.text('120秒后重发');
                 getSmsButton.addClass("phone-yzm-gray");
                timer = setInterval(count, 1000);
            }else {
            		 clearInterval(timer);
                 smsClicked = 1;
                 if(data.body.certCode==true){
                 	//$(".img").css("display","block");
                 	$(".pageOne").css("display","none");
                 	var phoneValue = $(".login_pop #tel").val();
                 	$(".login_pop_img #tel").val(phoneValue);
                 	$(".pageTwo").css("display","block");
                 	pictureYzm();
                 }
             }
        });
    }
    $("#login").click(function(){
    		if($('.oneNum').val()==""||$('.oneCode').val()==""){
    			return
    		}
		login();
	});
	$("#login_img").click(function(){
		if(($('.twoNum').val()=="")||($('.twoImgCode').val()=="")||($('.twoCode').val()=="")){
			return
		}
		login();
	});
	function setUUID(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 32; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		var uuid = s.join("");
		return uuid;
	}
	//倒计时
	 var smsClicked = 1;
    var timer = null;
    var sec = 120;
    function count() {
        sec--;
        if (sec < 10) {
            sec = '0' + sec;
        }
        $('.phone-yzm').html(sec + '秒后重发');
        if (sec == 0) {
            clearInterval(timer);
            $('.phone-yzm').html('获取验证码');
            $('.phone-yzm').removeClass("phone-yzm-gray");
            sec = 120;
            smsClicked = 1;
        }
    }
	 //获取手机验证码
    $("#yzh").click(function(){
    		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($("#tel").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('#tel').val())) {
            showAlert("联系手机号不正确");
            return;
       }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        getSmsButton = $(this);
        var phoneJson = $('#tel').val();    		
       	imgLogin();
    });
     $("#yzh01").click(function(){
    		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($("#tel").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('#tel').val())) {
            showAlert("联系手机号不正确");
            return;
        }
        if ($("#certCode").val() == '') {
            showAlert("请输入图片验证码");
            return;
        }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        getSmsButton = $(this);
        var phoneJson = $('#tel').val();    		
       	imgLogin();
    });
	 //获取图片验证码
	 var currentId = [];
    function pictureYzm() {
        var uuid = setUUID();
        currentId.length = 0;
        currentId.push(uuid);
        $("img#portrait").attr("src", url + "/getCertCode?uuid=" + currentId[0]);
    }
	//login end
  
	
		 


