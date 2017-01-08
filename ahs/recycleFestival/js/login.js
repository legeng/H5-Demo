var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
var urlThis='http://m.mk.aiweixiu.com';
 function urlParams() {
        var args = new Object();
        var query = location.search.substring(1);//获取查询串
        var pairs = query.split("&");//在逗号处断开
        for (var i = 0; i < pairs.length; i++) {
            var params = pairs[i].split('=');
            if (params.length < 2)continue;
            args[params[0]] = params[1];
        }
        return args;
  }
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
		var phoneJson = '{"mobile":"' + $('#tel').val() + '","verifyCode":"' + verifyCode + '","source":"activity","client":"mobile","type":"popup","activityCode":"ACT_101_RECYCLE"}';    		
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
//          		showAlert("登录成功");
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
					//=======
					singleRecords('ACT_102_RECYCLE',0);
					singleRecords('ACT_103_RECYCLE',1);
					singleRecords('ACT_104_RECYCLE',2);
				if(indexRecycle==0){
					recycle.getPrize('ACT_102_RECYCLE',(indexRecycle*2)+1);
				}else if(indexRecycle==1){
					recycle.getPrize('ACT_103_RECYCLE',(indexRecycle*2)+1);
				}else{
					recycle.getPrize('ACT_104_RECYCLE',(indexRecycle*2)+1);
				};
					//登录成功刷新分享
					 getWX();
					 var title = "爱回收手机回收节来袭，现金券iPhone大放送";
					 var desc = "多款手机高价收，分期iPhone年年换，呼朋唤友同享乐";
					 var pyq = "http://m.mk.aihuishou.com/ahs/recycleFestival/index.html";
					 var py = "http://m.mk.aihuishou.com/ahs/recycleFestival/index.html";
					 var elseUrl = "http://m.mk.aihuishou.com/ahs/recycleFestival/index.html";
					 var imgUrl = "http://m.mk.aiweixiu.com/ahs/luckyWheel/img/share.png";
					 share(title,elseUrl,imgUrl,desc,pyq,py);
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
    //
    var indexRecycle;
	    	$(".section03 li").on('click',function(e){
				indexRecycle=$(this).index()
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
			//----------------------------------------------领券
			if(indexRecycle==0){
				recycle.getPrize('ACT_102_RECYCLE',(indexRecycle*2)+1);
			}else if(indexRecycle==1){
				recycle.getPrize('ACT_103_RECYCLE',(indexRecycle*2)+1);
			}else{
				recycle.getPrize('ACT_104_RECYCLE',(indexRecycle*2)+1);
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

	function singleRecords(code,index){
		var tokenSingle=localStorage.getItem('token');
		var activityCodeSingle=code;
		var dataSingle='{"token":"'+tokenSingle+'","activityCode":"'+activityCodeSingle+'"}'
	    $.post(urlThis+'/api/activity/common/queryPrizeCode', {
            "methodName": "queryPrizeCode",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": dataSingle
     }).success(function (data) {
            if(data.code == 0){
            		if(data.body.length > 0){
            			$('.section03 li').eq(index).addClass('active');	
            		}
            }else{
           
            }
        });		
	}
singleRecords('ACT_102_RECYCLE',0);
singleRecords('ACT_103_RECYCLE',1);
singleRecords('ACT_104_RECYCLE',2);
//ACT_102_RECYCLE
//ACT_103_RECYCLE
//ACT_104_RECYCLE
//分享加次
  function getWX(){
        var dataJson = '{ "localUrl": "'+ window.location.href+'"}';
        $.post(getUrl() + "api/v2/common/sdk/generateConfig", {
            "methodName": "generateConfig",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
            wx.config({
                debug : data.body.debug,
                appId : data.body.appId,
                timestamp : data.body.timestamp,
                nonceStr :data.body.nonceStr,
                signature : data.body.signature,
                jsApiList : data.body.jsApiList
            });
        });
    }
	function share(etitle,elink,eimgUrl,edesc,quanurl,friendurl){
		wx.ready(function () {
        //分享朋友圈
        wx.onMenuShareTimeline({
            title: etitle,
            link: quanurl,
            imgUrl: eimgUrl,
            success: function (res) {
                //
                addTime();
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: etitle,
            link: friendurl,
            imgUrl: eimgUrl,
            desc:edesc,
            success: function (res) {
                //
                addTime();
            }
        });
        //分享到qq
        wx.onMenuShareQQ({
            title: etitle,
            link: elink,
            imgUrl: eimgUrl,
            desc: edesc
        });
        wx.onMenuShareQZone({
            title: etitle,
            link: elink,
            imgUrl: eimgUrl,
            desc: edesc,
            success: function (res) {
                
            },
            cancel: function (res) {
               
            }
        });
    });
}   

		 getWX();
		 var title = "爱回收手机回收节来袭，现金券iPhone大放送";
		 var desc = "多款手机高价收，分期iPhone年年换，呼朋唤友同享乐";
		 var pyq = "http://m.mk.aihuishou.com/ahs/recycleFestival/index.html";
		 var py = "http://m.mk.aihuishou.com/ahs/recycleFestival/index.html";
		 var elseUrl = "http://m.mk.aihuishou.com/ahs/recycleFestival/index.html";
		 var imgUrl = "http://m.mk.aiweixiu.com/ahs/luckyWheel/img/share.png";
		 share(title,elseUrl,imgUrl,desc,pyq,py); 


//分享架次的接口
function addTime(){
			var triggerCode="wechat_bind";
	        var source=urlParams().utm_source;
	        var medium=urlParams().utm_medium;
	        var campaign=urlParams().utm_campaign;
	        var sendType='pages';
	        var activityCode = 'ACT_101_RECYCLE';
		    var rangeNum ='1';
	        var tokenOutRed = localStorage.getItem("token");   
	        var data='{"token":"'+tokenOutRed+'","activityCode":"'+activityCode+'","rangeNum":"'+rangeNum+'","triggerCode":"'+triggerCode+'","source":"'+source+'","medium":"'+medium+'","campaign":"'+campaign+'","sendType":"'+sendType+'"}'; 
			$.post(urlThis+"/api/activity/common/hsjTemporary", {
				            "methodName": "hsjTemporary",
				            "timestamp": Date.parse(new Date()),
				            "version": "1.0",
				            "token":"",
				            "sign": "",
				            "channelCode": "",
				            "clientType": "mobile",
				            "data": data
			     }).success(function (data) {
						
			       	 })								
};




