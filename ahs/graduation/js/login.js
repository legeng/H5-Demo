$(function(){
	var url = getUrl()+"api/activity/ahs/common/login";
	init();
	function init(){
		var qwe1 = localStorage.getItem("qwertyuiopasdfghjkl1");
		var qwe2 = localStorage.getItem("qwertyuiopasdfghjkl2");
		var qwe3 = localStorage.getItem("qwertyuiopasdfghjkl3");
		if(qwe1!=null){
			$(".quan_list span").eq(0).css({"background":"url(images/quan_btn_05.png) no-repeat","background-size":"100% 100%"});
		}
		if(qwe2!=null){
			$(".quan_list span").eq(1).css({"background":"url(images/quan_btn_05.png) no-repeat","background-size":"100% 100%"});
		}
		if(qwe3!=null){
			$(".quan_list span").eq(2).css({"background":"url(images/quan_btn_05.png) no-repeat","background-size":"100% 100%"});
		}
	}
	var id;
	$(".quan_list span").each(function(i,elem){
		var index = i;
		$(elem).tap(function(){
			id = $(this).attr("data-id");
			isToken();
		});
	});
	function getResult(codeBrach){
		var tokenValue = localStorage.getItem("token");
		var dataJson = '{"token":"'+tokenValue+'","codeBrach":'+codeBrach+'}';
		$.post(getUrl()+"api/activity/ahs/common/getGraduationPrize",{
			"methodName": "getGraduationPrize",
	        "timestamp": Date.parse(new Date()),
	        "version": "2.0",
	        "token": "",
	        "sign": "",
	        "channelCode": "",
	        "clientType": "mobile",
	        "data": dataJson
		},function(data,status){
			if(status=="success"){
				var json = $.parseJSON(data);
				if(json.code==0){
					showAlert("领取成功");
					localStorage.setItem("qwertyuiopasdfghjkl"+codeBrach,codeBrach);
					$(".quan_list span").eq(codeBrach-1).css({"background":"url(images/quan_btn_05.png) no-repeat","background-size":"100% 100%"});
				}else{
					showAlert(json.msg);
					if(json.msg=="该券您已经领过了"){
						$(".quan_list span").eq(codeBrach-1).css({"background":"url(images/quan_btn_05.png) no-repeat","background-size":"100% 100%"});
					}
				}
			}
		});
	}
	function setUUID(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 32; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		var uuid = s.join("");
		return uuid;
	}
	function isToken(){
		var tokenValue = localStorage.getItem("token");
		   if((tokenValue=="")||(tokenValue==null)){
			 	$(".pop").css({"display":"block"});
			 	master();
			 	$("#overlay").tap(function(){
		      		$(this).css({"display":"none"});
		      		$("html,body").css({"height": "100%","overflow":"auto"});
		      		$(".pop").css({"display":"none"});
			      });
		   }else{
		   		checkLogin(tokenValue);
		   }
	}
	 function checkLogin(tokenValue){
    		 var dataJson = '{"token": "'+tokenValue+'"}';
        $.post(url + "/checkLogin", {
            "methodName": "checkLogin",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": dataJson
        },function (data,status) {
        		if(status=='success'){
        			var json = $.parseJSON(data);
	        		if(json.code == 0){
	                if(json.body.valid == true){
	                		getResult(id);
	                }
	            }else{
	        			localStorage.removeItem("token");
	            		$(".pop").css("display","block");
	            		master();
	            		$("div#overlay").tap(function(){
	            			location.reload();
			      		$(this).css({"display":"none"});
			      		$("html,body").css({"height": "100%","overflow":"auto"});
			      		$(".pop").css({"display":"none"});
			      		
			      	});
	            }
        		}
          
        });
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
    $("#yzm_label").click(function(){
    		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".phone").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('.phone').val())) {
            showAlert("联系手机号不正确");
            return;
       }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        getSmsButton = $(this);
        var phoneJson = $('.phone').val();    		
       	imgLogin();
    });
	  //登录
    function login(){
		var phoneJson = '{"mobile":"' + $('.phone').val() + '","verifyCode":"' + $(".yzm").val() + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_706_GRADUATION"}';    		
        $.post(url + "/userLogin", {
            "methodName": "userLogin",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": phoneJson
        },function (data,status) {
        		if(status=="success"){
        			var json = $.parseJSON(data);
        			if(json.code == 0){
	            		showAlert("登录成功");
	                localStorage.setItem("token",json.body.token);
	                $('.pop').css("display","none");
	                smsClicked = 1;
	                $(".phone-yzm").html('获取验证码');
	                clearInterval(timer);
	                 $("#overlay").remove();
	            		$("html,body").css({"height": "100%","overflow":"auto"});
	            		//制空
	                  $(".phone").html("");
	                  $(".yzm").html("");
	                  $(".picture").html("");
	           }else{
	           		showAlert(json.msg);
	           }
        		}  
        });
    }
     //获取图片验证码
	var currentId = [];
    function pictureYzm() {
        var uuid = setUUID();
        currentId.length = 0;
        currentId.push(uuid);
        $("img#portrait").attr("src", url + "/getCertCode?uuid=" + currentId[0]);
    }
	//带有图片验证码方式获取手机验证码  code=-1   body.certCode=true显示获取图形验证码
    function imgLogin(){
    		var phoneJson = '{"mobile":"' + $('.phone').val() + '","certCode":"' + $("#certCode").val() + '","singleCode":"'+currentId[0]+'"}';    		
        $.post(url + "/sendVerifyCode", {
            "methodName": "sendVerifyCode",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": phoneJson
        },function (data,status) {
	        	if(status=="success"){
	        		var json = $.parseJSON(data);
	        		if(json.code == 0){
	                getSmsButton.text('120秒后重发');
	                getSmsButton.css({"background":"#999","color":"#000"});
	                timer = setInterval(count, 1000);
	            }else {
	            		 clearInterval(timer);
	                 smsClicked = 1;
	                 if(json.body.certCode==true){
	                 	$(".sec_bor").css("display","block");
	                 	$("#overlay").click(function(){
				      		$(this).css("display","none");
				      		$("html,body").css({"height": "100%","overflow":"auto"});
				      		$(".pop").css("display","none");
				      	});
	                 	pictureYzm();
	                 }else{
	                 	showAlert(json.msg);
	                 }
	             }
	        	} 
        });
    }
    $("#login").on("click",function(){
    		login();
    });
    $(".close").tap(function(){
    		$("#overlay").css("display","none");
    		$(".pop").css("display","none");
    		$("html,body").css({"height": "100%","overflow":"auto"});
    });
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
                'z-index':"2000"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
	function master() {
       $("html,body").css({"height": "100%","overflow":"hidden"});
        var docHeight = $(document.body).height();
        $('body').append('<div id="overlay"></div>');
        $('#overlay').height(docHeight)
            .css({
                'display': 'block',
                'opacity': .8,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': '#000000',
                'width': '100%',
                'height': '100%',
                'z-index':100
            });
    }; 
});