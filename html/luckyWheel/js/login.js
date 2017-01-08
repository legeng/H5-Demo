var url = "http://m.mk.aiweixiu.com"+"/api/activity/ahs/common/login";
var urlSpecial='http://m.mk.aiweixiu.com';
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
				getLuckyWheel();	
				getTimes();
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
var prizeDeg;//中奖参数
var prizeName;
var prizeCode;
var prizeLevel;
function getLuckyWheel(){
			var triggerCode="quick_receive";
	        var source=urlParams().utm_source;
	        var medium=urlParams().utm_medium;
	        var campaign=urlParams().utm_campaign;
	        var sendType='pages';
	        var activityCode = 'ACT_101_RECYCLE';
		    var rangeNum =1;
	        var tokenOutRed = localStorage.getItem("token");   
	        var data='{"token":"'+tokenOutRed+'","activityCode":"'+activityCode+'","rangeNum":"'+rangeNum+'","triggerCode":"'+triggerCode+'","source":"'+source+'","medium":"'+medium+'","campaign":"'+campaign+'","sendType":"'+sendType+'"}'; 
			$.post(urlSpecial+"/api/activity/common/newReceiveCoupon", {
				            "methodName": "newReceiveCoupon",
				            "timestamp": Date.parse(new Date()),
				            "version": "1.0",
				            "token":"",
				            "sign": "",
				            "channelCode": "",
				            "clientType": "mobile",
				            "data": data
			      }).success(function (data) {
			      				getTimes();
			       	   		if(data.code==0){
								if(data.body[0].code=='SUCCESS'){
									//奖品名字 
									prizeName=data.body[0].rewardName;
									//中奖码   
									prizeCode=data.body[0].rewardCode;
									//  等级  
									prizeLevel=data.body[0].rewardLevel;
									//角度
									if(prizeName=='20M流量'){
										prizeDeg=0;
									}else if(prizeName=='40M流量'){
										prizeDeg=36;
									}else if(prizeName=='100M流量'){
										prizeDeg=72;
									}else if(prizeName=='iPhone7'){
										prizeDeg=108;
									}else if(prizeName=='10元A码'){
										prizeDeg=144;
									}else if(prizeName=='20元A码'){
										prizeDeg=180;
									}else if(prizeName=='30元A码'){
										prizeDeg=216;
									}else if(prizeName=='30元口袋券'){
										prizeDeg=252;
									}else if(prizeName=='100元口袋券'){
										prizeDeg=288;
									}else if(prizeName=='150元口袋券'){
										prizeDeg=324;
									}
									KinerLottery.goKinerLottery(prizeDeg);
								}else{
									showAlert(data.body[0].msg);
								}

			       	   		}else{
			       	   			showAlert(data.msg);
			       	   		}
			       	  })							
	
};
//转盘实例化运用
    var whichAward = function(deg) {
	if(deg==0){
		$('.liuType').html('20M流量');
		$('.windBlack').show();
		$('.myLiu').show();
	}else if(deg==36){
		$('.liuType').html('40M流量');
		$('.windBlack').show();
		$('.myLiu').show();
	}else if(deg==72){
		$('.liuType').html('100M流量');
		$('.windBlack').show();
		$('.myLiu').show();
	}else if(deg==108){
		$('.phoneCode').html('中奖码'+prizeCode);//prizeCode
		$('.windBlack').show();
		$('.myPhone').show();
	}else if(deg==144){
		$('.codeType').html('10元A码');
		$('.aCode').html('中奖码：'+prizeCode)
		$('.windBlack').show();
		$('.myCode').show();
		$('.goUse').attr('href','http://m.aihuishou.com/shouji');
	}else if(deg==180){
		$('.codeType').html('20元A码');
		$('.aCode').html('中奖码：'+prizeCode)
		$('.windBlack').show();
		$('.myCode').show();
		$('.goUse').attr('href','http://m.aihuishou.com/shouji');
	}else if(deg==216){
		$('.codeType').html('30元A码');
		$('.aCode').html('中奖码：'+prizeCode)
		$('.windBlack').show();
		$('.myCode').show();
		$('.goUse').attr('href','http://m.aihuishou.com/shouji');
	}else if(deg==252){
		$('.codeType').html('30元口袋券');
		$('.aCode').html('中奖码：'+prizeCode)
		$('.windBlack').show();
		$('.myCode2').show();
		$('.goUse').attr('href','http://m.aiershou.com/prodlist/mobile');
	}else if(deg==288){
		$('.codeType').html('100元口袋券');
		$('.aCode').html('中奖码：'+prizeCode)
		$('.windBlack').show();
		$('.myCode2').show();
		$('.goUse').attr('href','http://m.aiershou.com/prodlist/mobile');
	}else if(deg==324){
		$('.codeType').html('150元口袋券');
		$('.aCode').html('中奖码：'+prizeCode)
		$('.windBlack').show();
		$('.myCode2').show();
		$('.goUse').attr('href','http://m.aiershou.com/prodlist/mobile');
	}

   };
    var KinerLottery = new KinerLottery({
        rotateNum: 8, //转盘转动圈数
        body: "#box", //大转盘整体的选择符或zepto对象
        direction: 0, //0为顺时针转动,1为逆时针转动
        disabledHandler: function(key) {

            switch (key) {
                case "noStart":
                    alert("活动尚未开始");
                    break;
                case "completed":
                    alert("活动已结束");
                    break;
            }

        }, //禁止抽奖时回调

        clickCallback: function() {
        	  _paq.push(['trackEvent', 'luckyWheel', '幸运大转盘', '获取验证码']);///监控
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
			//----------------------------------------------抽奖--------------------------
				getLuckyWheel();	
				//this.goKinerLottery(prizeDeg);

        }, //点击抽奖按钮,再次回调中实现访问后台获取抽奖结果,拿到抽奖结果后显示抽奖画面

        KinerLotteryHandler: function(deg) {

             whichAward(360-deg);


            } //抽奖结束回调
    });


//查询中奖名单接口
	function lunbo(){
		var initHeight=$('.listConBox').height();
		if(initHeight<=80){			
		}else{
			$(".listConBox li").clone().prependTo(".listConBox");
				timerLunbo=setInterval(function(){
					if(initHeight<=-$('.listConBox').position().top){
						$('.listConBox').css('top','0')
					}else{
						$('.listConBox').css('top',$('.listConBox').position().top-0.5+'px')
					}
				
				},25)			
		}
	};
	//手机号码加****
	function plusXing (str,frontLen,endLen) { 
          var len = str.length-frontLen-endLen;
          var xing = '';
          for (var i=0;i<len;i++) {
              xing+='*';
          }
          return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
     }
    function allRecords(){
		var dataAll='{"activityCode":"ACT_101_RECYCLE"}'
	    $.post(urlSpecial+'/api/activity/common/queryPrizeCodeAll', {
            "methodName": "queryPrizeCodeAll",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": dataAll
      }).success(function (data) {
            if(data.code == 0){
            		for(i=0;i<data.body.length;i++){
            			//data.body[i].userMobile;
            			//data.body[i].codeEndTime;
            			//data.body[i].codeName;           									
            			$('.listConBox').append("<li><span>"+plusXing(data.body[i].userMobile,3,4)+"</span><span>"+data.body[i].codeName+"</span></li>");
            		
            		}
            }else{
           
            }
        });		
	}
 //中奖信息滚动
    $(".listCon").myScroll();		
    allRecords();
    setInterval(function(){
        allRecords();
    } , 300000)
//抽奖次数
	function getTimes(){
		var token=localStorage.getItem('token');
		var activityCode='ACT_101_RECYCLE';
		var data='{"token":"'+token+'","activityCode":"'+activityCode+'"}'
	    $.post(urlSpecial+'/api/activity/common/querySurplus', {
            "methodName": "querySurplus",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": data
        }).success(function (data) {
            if(data.code == 0){
  				$('.chance span').html(data.body.surplus);
            }else{
           
            }
        });		
	}
getTimes();

//弹窗
$('.blackClose').click(function(){
	$(this).parent().hide();
	$(this).parent().parent().hide();
});
//
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
			$.post(urlSpecial+"/api/activity/common/hsjTemporary", {
				            "methodName": "hsjTemporary",
				            "timestamp": Date.parse(new Date()),
				            "version": "1.0",
				            "token":"",
				            "sign": "",
				            "channelCode": "",
				            "clientType": "mobile",
				            "data": data
			     }).success(function (data) {
						getTimes();
			       	 })								
};









