var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
var index;
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
	//login start
	 $(function(){
    		init();
		function init(){
		
			isToken();
			sessionStorage.setItem("num",0);
		}
    })
	 var tokenFlag = 0;
	function isToken(){
		var tokenValue = localStorage.getItem("token");
	   if((tokenValue=="")||(tokenValue==null)){
		 	//login();
		 	tokenFlag = -1;
		 	$(".login").css({"display":"block"});
	   }else{
	   		checkLogin(tokenValue);
	   }
	}
	//检查token
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
        }).success(function (data) {
            if(data.code == 0){
                if(data.body.valid == true){
                }else{
                		localStorage.removeItem("token");
                		$(".login_pop").css("display","block");
                		master();
                		$("#overlay").click(function(){
			      		$(this).css("display","none");
			      		$("html,body").css({"height": "100%","overflow":"auto"});
			      		$(".login_pop").css("display","none");
			      		$(".login_pop_img").css("display","none");
			      	});
                }
            }else{
            		if(data.body.valid == false){
            			localStorage.removeItem("token");
            		}else{
            			showAlert(data.msg)
            		}
            }
        });
    }
    	var checkFlag = -1;
     //登录
    function login(){
    		var flag = $(".login_pop_img").css("display");
    		var verifyCode = "";
    		if(flag=="block"){
    			verifyCode = $("#verifyCode01").val();
    		}else{
    			verifyCode = $("#verifyCode").val();
    		}
		var phoneJson = '{"mobile":"' + $('#tel').val() + '","verifyCode":"' + verifyCode + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_708_RECYCLEHUSBAND"}';    		
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
            if(data.code == 0){
            	  sessionStorage.setItem("num",1)
            		checkFlag = 0;
         	  //showAlert("登录成功");
                localStorage.setItem("token",data.body.token);
              //  $('.login_pop').css("display","none");
              //   $('.login_pop_img').css("display","none");
                smsClicked = 1;
                $(".phone-yzm").html('获取验证码');
                clearInterval(timer);
                // $("#overlay").remove();
            		//$("html,body").css({"height": "100%","overflow":"auto"});
            		//制空
                  $("#verifyCode").html("");
                  $("#verifyCode01").html("");
                  $("#certCode").html("");
                  //接口
                  	var tokenOutHus = localStorage.getItem("token");
					$.post(getUrl()+"api/activity/ahs/common/getHusbandPrize", {
			            "methodName": "getHusbandPrize",
			            "timestamp": Date.parse(new Date()),
			            "version": "2.0",
			            "token":tokenOutHus,
			            "sign": "",
			            "channelCode": "",
			            "clientType": "mobile"
		       	   }).success(function (data) {
		       	   		if(data.code==0){
		       	   			$('.showContent').html(data.msg);
		       	   			$('.showContent1').html(data.msg);
		       	   			localStorage.setItem("husIndex",1);
		       	   			setTimeout(function(){
		       	   				window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		       	   			},1500)
		       	   		}else{
		       	   			if(data.body==1){
		       	   				$('.showContent').html(data.msg);
		       	   				$('.showContent1').html(data.msg);
		       	   				localStorage.setItem("husIndex",1);
		       	   				setTimeout(function(){
		       	   					window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		       	   				},1500)
		       	   			}else{
		       	   				localStorage.setItem("husIndex",2)
		       	   				$('.showContent').html(data.msg);
		       	   				$('.showContent1').html(data.msg);
		       	   				setTimeout(function(){
		       	   					window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		       	   				},1500)
		       	   			}
		       	   		}
		       	   
		       	   })
                  
                  
                  
                  
               //   
            }else{
            		showAlert(data.msg);
            		//checkFlag = -1;
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
        	console.log(data)
            if(data.code == 0){
                getSmsButton.text('120秒后重发');
                 getSmsButton.addClass("phone-yzm-gray");
                timer = setInterval(count, 1000);
            }else {
            		 clearInterval(timer);
                 smsClicked = 1;
                 if(data.body.certCode==true){
                 	$(".img").css("display","block");
                 	$(".login_pop").css("display","none");
                 	var phoneValue = $(".login_pop #tel").val();
                 	$(".login_pop_img #tel").val(phoneValue);
                 	$(".login_pop_img").css("display","block");
                 	$("#overlay").click(function(){
			      		$(this).css("display","none");
			      		$("html,body").css({"height": "100%","overflow":"auto"});
			      		$(".login_pop").css("display","none");
			      		$(".login_pop_img").css("display","none");
			      	});
                 	pictureYzm();
                 }
             }
        });
    }
    $("#login").click(function(){
		login();
	});
	$("#login_img").click(function(){
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
  
	    	$(".stepTbottom").on('click',function(e){	    		
	    			//login start
	    			var tok = localStorage.getItem("token");
		        if(tok==null){
		        		$(".login_pop").css("display","block");
		        		master();
		    			$("#overlay").click(function(){
		          		$(this).css("display","none");
		          		$("html,body").css({"height": "100%","overflow":"auto"});
		          		$(".login_pop").css("display","none");
		          		$(".login_pop_img").css("display","none");
		          	});
	    			}
        			function flag(){
        				if(tok== null&&sessionStorage.getItem("num")==0){
	        				if(tokenFlag = -1){
			        			return false;
				        }
				        if(checkFlag = -1){
				        		return false;
				        }
        				}else{
        					return true;
        				}
        			}
        			if(!flag()){
        				return;
        			} 	
		    //login end
		    if(localStorage.getItem("husIndex")==1){
		    		window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		    }else{
		    			var tokenOut = localStorage.getItem("token");
					$.post(getUrl()+"api/activity/ahs/common/getHusbandPrize", {
			            "methodName": "getHusbandPrize",
			            "timestamp": Date.parse(new Date()),
			            "version": "2.0",
			            "token":tokenOut,
			            "sign": "",
			            "channelCode": "",
			            "clientType": "mobile"
		       	   }).success(function (data) {
		       	   		if(data.code==0){
		       	   			localStorage.setItem("husIndex",1)
		       	   			showAlert(data.msg);	
		       	   			setTimeout(function(){
		       	   				window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		       	   			},1500)
		       	   		}else{
		       	   			if(data.body==1){
		       	   				localStorage.setItem("husIndex",1)
		       	   				showAlert(data.msg);
		       	   				setTimeout(function(){
		       	   					window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		       	   				},1500)
		       	   			}else{
		       	   				localStorage.setItem("husIndex",2)
		       	   				showAlert(data.msg);
		       	   				setTimeout(function(){
		       	   					window.location='http://m.aihuishou.com/shouji?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
		       	   				},1500)
		       	   			}
		       	   		}
		       	   
		       	   })
		    }
		
		})		


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
	 //close
    $(".close").click(function(){
    		$(".login_pop").css("display","none");
    		$(".login_pop_img").css("display","none");
    		$(".shuoming").css("display","none");
    		$(".pop_success").css("display","none");
    		$(".pop_fail").css("display","none");
    		$("#overlay").remove();
        $("html,body").css({"height": "100%","overflow":"auto"});
         	clearInterval(timer);
            $('.phone-yzm').html('获取验证码');
            $('.phone-yzm').removeClass("phone-yzm-gray");
            sec = 120;
            smsClicked = 1;
    });
    //session_id
    			function setCookie(cname, cvalue, exdays) {
		    		var d = new Date();
		  		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		        var expires = "expires="+d.toUTCString();
		        document.cookie = cname + "=" + cvalue + "; " + expires;
		   }
		   function getCookie(cname) {
	   		 var name = cname + "=";
	   		 var ca = document.cookie.split(';');
	    		for(var i=0; i<ca.length; i++) {
	       		 var c = ca[i];
	       		 while (c.charAt(0)==' ') c = c.substring(1);
		    		 if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		    }
		    return "";
		}
		 var dataCookie=function() {
			 var s = [];
			 var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
			 for (var i = 0; i < 25; i++) {
			        s[i] = hexDigits.substr(Math.floor(Math.random() * 30), 1);
			  }
			  var uuid = s.join("");
			      return uuid;  
		  }
		 if((getCookie('session_id')=="")||(getCookie('session_id')==null)){
		 	     setCookie('session_id', dataCookie(), 30)
		 }
		 


