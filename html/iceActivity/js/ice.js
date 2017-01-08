var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
//showAlert;
var numCode=1;
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
    				'font-size': '0.7rem',
    				'color': '#fff',
    				'line-height': '1.5rem',
    				'text-align': 'center',
    				'border-radius': '0.1rem',
    				'z-index': "1002"
    			});
    		setTimeout(function() {
    			$("#message").css({
    				'display': 'none'
    			});
    			$("#message").remove();
    		}, 1500);
 }
//login start----初始化
	$(function() {
		init();
		function init() {
			if(localStorage.getItem("successState")==1){
				$('.getNow').css('background-image','url(images/getTicket2.png)');
				numCode=2;
			}
			
			isToken();
			sessionStorage.setItem("num", 0);
		}
	})
	var tokenFlag = 0;
	function isToken(){
		var tokenValue = localStorage.getItem("token");
	   if((tokenValue=="")||(tokenValue==null)){
		 	//login();
		 	tokenFlag = -1;
		 	//$(".login").css({"display":"block"});
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
     //登录 ------修改活动码
    function login(){
    		var flag = $(".login_pop_img").css("display");
    		var verifyCode = "";
    		if(flag=="block"){
    			verifyCode = $("#verifyCode01").val();
    		}else{
    			verifyCode = $("#verifyCode").val();
    		}
		var phoneJson = '{"mobile":"' + $('#tel').val() + '","verifyCode":"' + verifyCode + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_708_WEIXIU"}';    		
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
                $('.login_pop').css("display","none");
                 $('.login_pop_img').css("display","none");
                smsClicked = 1;
                $(".phone-yzm").html('获取验证码');
                clearInterval(timer);
                 $("#overlay").remove();
            		$("html,body").css({"height": "100%","overflow":"auto"});
            		//制空
                  $("#verifyCode").html("");
                  $("#verifyCode01").html("");
                  $("#certCode").html("");
                  //------22222222222222222222222222222
                  		var tokenOut = localStorage.getItem("token");
						$.post(getUrl()+"api/activity/awx/common/weiXiuSendCoupon", {
							"methodName": "weiXiuSendCoupon",
							"timestamp": Date.parse(new Date()),
							"version": "2.0",
							"token":tokenOut,
							"sign": "",
							"channelCode": "",
							"clientType": "mobile"
						    }).success(function (data) {
						    		if(data.code==0){
						    			$('.getNow').css('background-image','url(images/getTicket2.png)');
						    			numCode=2;
						    			$('.mengceng').css('display','block');
						    			$("html,body").css({"height": "100%","overflow":"hidden"});
						    			$('.successTicket').css('display','block');
						    			localStorage.setItem("successState",1)
						    		}else{
						    			if(data.msg=='用户区域不支持该活动'||data.msg=='IP地址异常'){
						    				$('.getNow').css('background-image','url(images/getTicket2.png)');
						    				numCode=2;
						    				showAlert(data.msg);
						    			}
						    			if(data.body==1){
						    				$('.getNow').css('background-image','url(images/getTicket2.png)');
						    				numCode=2;
						    				localStorage.setItem("successState",1)
						    				showAlert(data.msg);	
						    			}else{
						    				numCode=3;
						    				showAlert(data.msg);
						    			}	
						    		}
						    			    	   	    	   	
							 }) 	
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
    //
   	 //1马上领券2马上维修
	 $(".getNow").on('click',function(e){
		if(numCode==2){
			window.location='http://m.aiweixiu.com/first-confirm.html?act=bg&act_activityCode=ACT_708_WEIXIU'
			return;
		}else if(numCode==3){
						var tokenOut2 = localStorage.getItem("token");
						$.post(getUrl()+"api/activity/awx/common/weiXiuSendCoupon", {
							"methodName": "weiXiuSendCoupon",
							"timestamp": Date.parse(new Date()),
							"version": "2.0",
							"token":tokenOut2,
							"sign": "",
							"channelCode": "",
							"clientType": "mobile"
						    }).success(function (data) {
						    		if(data.code==0){
						    			$('.getNow').css('background-image','url(images/getTicket2.png)');
						    			numCode=2;
						    			$('.mengceng').css('display','block');
						    			$("html,body").css({"height": "100%","overflow":"hidden"});
						    			$('.successTicket').css('display','block');
						    			
						    		}else{
						    			if(data.msg=='用户区域不支持该活动'||data.msg=='IP地址异常'){
						    				$('.getNow').css('background-image','url(images/getTicket2.png)');
						    				numCode=2;
						    				showAlert(data.msg);
						    			}
						    			if(data.body==1){
						    				$('.getNow').css('background-image','url(images/getTicket2.png)');
						    				numCode=2;
						    				showAlert(data.msg);	
						    			}else{
						    				numCode=3;
						    				showAlert(data.msg);
						    			}	
						    		}
						    			    	   	    	   	
							 })
			
		}
	    			e.preventDefault();
	    			var tok = localStorage.getItem("token");
		        if(tok==null){
		        		$(".login_pop").css("display","block");
		        		master();
		    			$("#overlay").click(function(){
		    				//
		    					$('.secd').val('')
				         	clearInterval(timer);
				            $('.phone-yzm').html('获取验证码');
				            $('.phone-yzm').removeClass("phone-yzm-gray");
				            sec = 120;
				            smsClicked = 1;
		    				//
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
		})		
function getTicket(){
	var tokenOut = localStorage.getItem("token");
	$.post(getUrl()+"api/activity/awx/common/weiXiuSendCoupon", {
		"methodName": "weiXiuSendCoupon",
		"timestamp": Date.parse(new Date()),
		"version": "2.0",
		"token":tokenOut,
		"sign": "",
		"channelCode": "",
		"clientType": "mobile"
	    }).success(function (data) {
		     console.log(data)
		       	   	    	   	
		 }) 	
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
		
//判断是否为微信
	function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
             $(".move_back").hide()
        }else{
           $(".move_back").show();
        }
    }
    is_weixin();
    
//rules
Zepto(".rules").tap(function(){
	Zepto('.mengceng').css('display','block')
	$("html,body").css({"height": "100%","overflow":"hidden"});
	Zepto('.activityRules').css('display','block')
})
Zepto('.mengceng').on('tap',function(){
	//closeWin();
	Zepto('.successTicket').css('display','none');
	Zepto(this).css('display','none')
	Zepto('.activityRules').css('display','none')
	Zepto('.activityProcessFather').css('display','none')
	$("html,body").css({"height": "100%","overflow":"auto"});
})
Zepto('.activityRules').on('tap',function(){
	Zepto(this).css('display','none')
	Zepto('.mengceng').css('display','none')
})
//process
Zepto(".process").tap(function(){
	
	Zepto('.mengceng').css('display','block')
	Zepto('.activityProcessFather').css('display','block')
})
$('.nowGo').on('click',function(){
	window.location='http://m.aiweixiu.com/first-confirm.html?act=bg&act_activityCode=ACT_708_WEIXIU'
})
Zepto('.activityProcess').on('tap',function(){
	Zepto(this).parent().css('display','none');
	
	Zepto('.mengceng').css('display','none')
})
//抽券弹窗
	 //close
    function closeWin(){
    		$(".login_pop").css("display","none");
    		$(".login_pop_img").css("display","none");
    		$("#overlay").remove();
         	clearInterval(timer);
            $('.phone-yzm').html('获取验证码');
            $('.phone-yzm').removeClass("phone-yzm-gray");
            sec = 120;
            smsClicked = 1;
    }
  //查看门店
   $(".downBtn").on("click",function(){
        master();
        $(".md").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".md").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
    $(".closepopup").on("click",function(){
        $(".md").css({"display":"none"});
        $("#overlay").css("display","none");
        	$("html,body").css({"height": "100%","overflow":"auto"});
    });
 var id = 1;
    $(".city").delegate("li","click",function(i,elem){
            $(this).addClass("active").siblings().removeClass();
            id =  $(this).attr("data-cid");
            getCityRegion(id);
    });
    getCity();
    getCityRegion(id);
     function getCity() {
        var dataJson = '{"serviceTypeId": "2"}';
        $.post(getUrl() + "api/v2/common/address/queryCityList", {
            "methodName": "queryStoreList",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "PC",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
                var arrayCity = data.body;
                var length = data.body.length;
                var parList = $(".city");
          		  $(".city li").remove();
                for (var i = 0; i < length; i++) {
                    var childLi = $("<li data-cid=" + arrayCity[i].id + ">" + arrayCity[i].name + "</li>");
                    parList.append(childLi);
                }
                 $(".city li").eq(0).addClass("active");
            }
        });
    }
    function getCityRegion(id) {
        var dataJson = '{ "serviceTypeId": "2","cityId": "'+id+'"}';
        $.post(getUrl() + "api/v2/common/address/queryCityRegion", {
            "methodName": "queryCityRegion",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
           if(data.code == "0"){
               var arrayCity = data.body;
               var length = data.body.length;
               if(length>0) {
                   var parList = $("#county");
                   $("#county li").remove();
                   var childLi;
                   for (var i = 0; i < length; i++) {
                       childLi = $("<li data-id="+arrayCity[i].id+">" + arrayCity[i].name + "</li>");
                       parList.append(childLi);
                   }
                   $("#county li").eq(0).addClass("active");
                   getDoor(id,arrayCity[0].id);
               }
           }
        });
    }

    $("#county").delegate("li","click",function(){
        var cid = $(this).attr("data-id");
        $(this).addClass("active").siblings().removeClass();
        getDoor(id,cid);
    });
    function getDoor( cid,regionId) {
        var dataJson = '{"cityId":' + cid + ',"regionId": ' + regionId + '}';
        $.post(getUrl() + "api/v2/common/address/queryStoreList", {
            "methodName": "queryStoreList",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
            var arrayCity = data.body;
            var length = data.body.length;
            var parList = $("#door");
            $("#door li").remove();
            //添加门店数据
            for (var i = 0; i < length; i++) {
                var childLi = $("<li data-storeid="
                    + arrayCity[i].storeId + " data-storeName=" + arrayCity[i].storeName + "><div><span>"
                    + arrayCity[i].storeName + "</span><p class='address'>"
                    + arrayCity[i].storeAddress + "</p></div></li>");
                parList.append(childLi);
            }
        });
    }



