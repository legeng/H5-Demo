var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
var index;
 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: false,
        preventLinksPropagation : false,
        centeredSlides: true,
    		slidesPerView: 1.5,
    		initialSlide :8,
    		loop:true,
    		loopAdditionalSlides:100,
        coverflow: {
            rotate: 0,
            stretch: 80,
            depth: 150,
            modifier: 1.5,
            slideShadows : false
        },
        onTouchStart: function(swiper,even){
      		//$(".swiper-slide").removeClass("active")
     		index=swiper.activeIndex;
   		 },
        onSlideChangeEnd: function(swiper){
     		
		
    		}
   });
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
                'z-index':"320"
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
		var phoneJson = '{"mobile":"' + $('#tel').val() + '","verifyCode":"' + verifyCode + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_704_EUROCUP"}';    		
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
            		showAlert("登录成功");
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
    var i=0
    var clickNum=1;
	    	$(".swiper-slide").on('click',function(e){
	    		
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
	    		if(clickNum==1){
	    			clickNum=0;
				var indexD=$(this).index();
				var obj=$(this);
				if(indexD==index){
					 $(this).addClass('swiper-no-swiping').siblings().addClass('swiper-no-swiping')
					//调借口
					var tokenOut = localStorage.getItem("token");
					$.post(getUrl()+"api/activity/ahs/common/getEurocupPrize", {
			            "methodName": "getEurocupPrize",
			            "timestamp": Date.parse(new Date()),
			            "version": "2.0",
			            "token":tokenOut,
			            "sign": "",
			            "channelCode": "",
			            "clientType": "mobile"
		       	   }).success(function (data) {
		       	   		console.log(data)
		            if(data.code == -1){
		            		//console.log($('.swiper-no-swiping').eq(indexD))
		              	showAlert(data.msg) ;
		              	$('.swiper-no-swiping').removeClass('swiper-no-swiping')
		              	clickNum=1;
		            }else {
		               	if(data.body.drawResult==0){
		               		//未中奖
		               		showAlert(data.body.prizeType) ;
		               		$('.swiper-no-swiping').removeClass('swiper-no-swiping')
		       
		               		clickNum=1;
		               	}else if(data.body.drawResult==1){
		               		$(".backImg").css('display','block')
		               		$(".backImg").css("background-image",'url(images/chenggong2.png)')//闪电购
							obj.addClass("active");
							//clickNum=1;
		               	}else if(data.body.drawResult==2){
		               		//data.body.prizeType
		               		$('.passWord').html(data.body.prizeType)	
		               		$(".backImg").css('display','block')
		               		$(".backImg").css("background-image",'url(images/chenggong1.png)')//10元券
							obj.addClass("active");
							//clickNum=1;
		               	}  
		             }
		        });   
		        
	
				}else{
					clickNum=1;
				}	    			
	    		}else{
		
	    		}
		
		})		

//中奖我知道了
	
	$('.konwAnd').on('click',function(e){
		e.stopPropagation();
		$('.passWord').html('')
		$(".backImg").css('display','none')
		$(this).parent().parent().removeClass("active")
		$(this).parent().parent().removeClass('swiper-no-swiping').siblings().removeClass('swiper-no-swiping')
		clickNum=1;
		
	})

//活动规则 
$(".btnLeft").on("click",function(){
	$(".mengceng").css("display","block")
	$(".guizeBtn").css("display","block")
})
$(".mengceng").on("click",function(){
	$(this).css('display','none')
	$(".guizeBtn").css("display","none")
	$('.prizeList').css("display",'none');	
})
$(".guizeBtn").on("click",function(){
	$(this).css('display','none')
	$(".mengceng").css("display","none")
})
//中奖名单
$(".btnRight").on("click",function(){
	$('.mengceng').css("display",'block');
	$('.prizeList').css("display",'block');	
})
$(".prizeList").on("click",function(){
	$(this).css('display','none')
	$(".mengceng").css("display","none")
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


