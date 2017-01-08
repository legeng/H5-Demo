define(['jquery' , 'common' , 'reward'] , function($ , c , r){

	function setUUID(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 32; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		var uuid = s.join("");
		return uuid;
	}

	function isToken(callback){
		var tokenValue = localStorage.getItem("token");
		if((tokenValue=="")||(tokenValue==null)){
			  c.master();
        if(localStorage.getItem('actionType') == 1){
            $("#login").html('马上抽奖');
        }else{
            $("#login").html('马上领券');
        }
			  $(".pop").css({"display":"block"});
			  $("#overlay").click(function(){
			  	  $(this).css({"display":"none"});
			  	  $(".pop").css({"display":"none"});
			  });
		}else{
			  checkLogin(tokenValue , callback);
		}
	}

	function checkLogin(tokenValue , callback){
		var dataJson = '{"token": "'+tokenValue+'"}';
		$.post(c.__baseUrl + "api/activity/ahs/common/login/checkLogin", {
			"methodName": "checkLogin",
			"timestamp": Date.parse(new Date()),
			"version": "2.0",
			"token": "",
			"sign": "",
			"channelCode": "",
			"clientType": "mobile",
			"data": dataJson
		}).success(function(data){
			if(data.code == 0){
				  if(data.body.valid == true){  	
              //领券
              r.getPrize(c.getAction(),localStorage.getItem('priceRange'),function(data){
                  callback(data);
              });
          }
      }else{
            	localStorage.removeItem("token");
            	$(".pop").css("display","block");
            	c.master();
            	$("div#overlay").click(function(){
            		location.reload();
            		$(this).css({"display":"none"});
            		$(".pop").css({"display":"none"});
            	});
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
  			c.showAlert("请输入联系人手机号");
  			return;
  		}
  		if (!phoneReg.test($('.phone').val())) {
  			c.showAlert("联系手机号不正确");
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
	function login(callback){
	  	var phoneJson = '{"mobile":"' + $('.phone').val() + '","verifyCode":"' + $(".yzm").val() + '","source":"activity","client":"mobile","type":"popup","activityCode":"'+localStorage.getItem('activityCode')+'"}';    		
	  	$.post(c.__baseUrl + "api/activity/ahs/common/login/userLogin", {
	  		"methodName": "userLogin",
	  		"timestamp": Date.parse(new Date()),
	  		"version": "2.0",
	  		"token": "",
	  		"sign": "",
	  		"channelCode": "",
	  		"clientType": "mobile",
	  		"data": phoneJson
	  	}).success(function(data){
      		if(data.code == 0){
        			c.showAlert("登录成功");
        			localStorage.setItem("token",data.body.token);
        			$('.pop').css("display","none");
        			smsClicked = 1;
        			$(".phone-yzm").html('获取验证码');
        			clearInterval(timer);
        			$("#overlay").remove();
           		//制空
           		$(".phone").html("");
           		$(".yzm").html("");
           		$(".picture").html("");

              r.getTimes();
              r.singleRecords(); //看看用户到底抽了哪些券
              
              //领券或抽奖
              callback();
          }else{
              c.showAlert(data.msg);
          }
      }).error(function(){
        	c.showAlert('系统出错了!');
      });

	}

  //获取图片验证码
  var currentId = [];
  function pictureYzm() {
     	var uuid = setUUID();
     	currentId.length = 0;
     	currentId.push(uuid);
     	$("img#portrait").attr("src", c.__baseUrl + "api/activity/ahs/common/login/getCertCode?uuid=" + currentId[0]);
  }
	//带有图片验证码方式获取手机验证码  code=-1   body.certCode=true显示获取图形验证码
	function imgLogin(){
  		var phoneJson = '{"mobile":"' + $('.phone').val() + '","certCode":"' + $("#certCode").val() + '","singleCode":"'+currentId[0]+'"}';    		
  		$.post(c.__baseUrl + "api/activity/ahs/common/login/sendVerifyCode", {
  			"methodName": "sendVerifyCode",
  			"timestamp": Date.parse(new Date()),
  			"version": "2.0",
  			"token": "",
  			"sign": "",
  			"channelCode": "",
  			"clientType": "mobile",
  			"data": phoneJson
  		}).success(function(data){
    			if(data.code == 0){
        			getSmsButton.text('120秒后重发');
        			getSmsButton.css({"background":"#999","color":"#000"});
        			timer = setInterval(count, 1000);
    			}else {
      				clearInterval(timer);
      				smsClicked = 1;
      				if(data.body.certCode==true){
      					$(".sec_bor").css("display","block");
      					$("#overlay").click(function(){
      						$(this).css("display","none");
      						$(".pop").css("display","none");
      					});
      					pictureYzm();
      				}else{
      					c.showAlert(data.msg);
      				}
    			}
  		});
	}


  //转盘活动开始

  var __click = 1;

  var turnplate = {
      bRotate:false,//false:停止;ture:旋转
      restaraunts : ['20M流量', '150元口袋券', '100元口袋券', '30元口袋券', '30元A码', '20元A码', '10元A码', 'iPhone7', '100M流量', '40M流量'],
      angles : [0,-36,-72,-108,-144,-180,-216,-252,-288,-324]
  };

  var rotateFn = function (item, txt , type){
      var angles = turnplate.angles[item]+36;
      $('#pan').stopRotate();
      $('#pan').rotate({
          angle:0,
          animateTo:angles+1800, //1800 是 5 圈
          duration:8000,
          callback:function (){
              turnplate.bRotate = !turnplate.bRotate;
              c.master();
              if(1 == type){
                  $(".acode-alert .reward-info").text(txt);
                  $(".acode-alert").show(); //a码弹窗
              }
              if(2 == type){
                  $(".iPhine7-alert").show(); //iphone7弹窗
              }
              if(3 == type){
                  $(".flow-alert .reward-info").text(txt);
                  $(".flow-alert").show(); //流量弹窗
              }
              if(4 == type){
                  $(".koudai-alert .reward-info").text(txt);
                  $(".koudai-alert").show(); //流量弹窗
              }

              //将指针置为可以点击
              __click = 1;   
          }
      });
  };

  var rotateByReward = function(data){

      if(data.code=='0'){
          if('SUCCESS'== data.body[0].code){ //SUCCESS
              localStorage.removeItem('actionType');
              //返回奖品信息
              var item = c.getIndex(turnplate.restaraunts , data.body[0].rewardName)+1;
              switch (item) {
                  case 1:
                      rotateFn(1, turnplate.restaraunts[0] , 3);
                      break;
                  case 2:
                      rotateFn(2, turnplate.restaraunts[1] , 4);
                      break;
                  case 3:
                      rotateFn(3, turnplate.restaraunts[2] , 4);
                      break;
                  case 4:
                      rotateFn(4, turnplate.restaraunts[3] , 4);
                      break;
                  case 5:
                      rotateFn(5, turnplate.restaraunts[4] , 1);
                      break;
                  case 6:
                      rotateFn(6, turnplate.restaraunts[5] , 1);
                      break;
                  case 7:
                      rotateFn(7, turnplate.restaraunts[6] , 1);
                      break;
                  case 8:
                      rotateFn(8, turnplate.restaraunts[7] , 2);
                      break;
                  case 9:
                      rotateFn(9, turnplate.restaraunts[8] , 3);
                      break;
                  case 10:
                      rotateFn(10, turnplate.restaraunts[9] , 3);
                      break;
                  default :
                      alert('出错了');
              }

              //请求抽奖剩余次数
              r.getTimes();

          }else{
              __click = 1;
              c.showAlert(data.body[0].msg);
          }
      }else{
          __click = 1;
          isToken(rotateByReward);
      }
  }
    //转盘活动结束

  return $(function(){

      //100元回收增值券，60元回收增值券，40元回收增值券的按钮颜色
      // if(localStorage.getItem('quan100')){
      //     $('#quan100').attr('src' , $("#quan100").data('original'));
      // }
      // if(localStorage.getItem('quan60')){
      //     $('#quan60').attr('src' , $("#quan60").data('original'));
      // }
      // if(localStorage.getItem('quan40')){
      //     $('#quan40').attr('src' , $("#quan40").data('original'));
      // }

      $(".acode img").each(function(i,elem){
          $(elem).click(function(){
              var money = $(this).data('money');
              var range = $(this).data('range');
              localStorage.setItem('priceRange' , Math.min.apply(null , range));
              localStorage.setItem('actionType' , 2); //1抽奖，2发券
              localStorage.setItem('activityCode' , $(this).data('code')); //设置活动码
              isToken(function(data){
                  if(data.code=='0'){
                     if('SUCCESS'==data.body[0].code){
                        c.showAlert(data.body[0].rewardName + ' 领取成功!');
                        localStorage.removeItem('priceRange');
                        localStorage.removeItem('actionType');
                        localStorage.removeItem('activityCode');

                        var quan = ['100元回收增值券' , '60元回收增值券' , '40元回收增值券'];

                        var index = c.getIndex(quan , data.body[0].rewardName);

                        if(0 == index){
                            // localStorage.setItem('quan100' , 100);
                            $('#quan100').attr('src' , $("#quan100").data('original'));
                        }else if(1 == index){
                            // localStorage.setItem('quan60' , 60);
                            $('#quan60').attr('src' , $("#quan60").data('original'));
                        }else if(2 == index){
                            // localStorage.setItem('quan40' , 40);
                            $('#quan40').attr('src' , $("#quan40").data('original'));
                        }else{

                        }
                     }else{
                        c.showAlert(data.body[0].msg);
                     }
                  }else{
                     c.showAlert(data.msg);
                  }
              });
          });
      });

      $("#login").on("click",function(){
          var actionType = localStorage.getItem('actionType') - 0; //转换为数字
          if(1 === actionType){//抽奖
              login(function(){
                  r.getPrize(c.getAction(),1,rotateByReward);
              });
          }

          if(2 === actionType){//发券
              login(function(){
                  r.getPrize(c.getAction(),localStorage.getItem('priceRange'), function(data){
                      if(data.code=='0'){
                         if('SUCCESS'==data.body[0].code){
                            c.showAlert(data.body[0].rewardName + ' 领取成功!');
                            localStorage.removeItem('priceRange');
                            localStorage.removeItem('actionType');
                            localStorage.removeItem('activityCode');//设置活动码
                         }else{
                            c.showAlert(data.body[0].msg);
                         }
                      }else{
                         c.showAlert(data.msg);
                      }
                  });
              });
          }
          
      });

      //点击指针转动
      $('#pointer').click(function (){
          localStorage.setItem('actionType' , 1);//动作是抽奖
          localStorage.setItem('activityCode' , $(this).data('code'));//设置活动码
          if(__click == 1){
              r.getPrize(c.getAction(),1,rotateByReward);
              __click = 0;
          }
      });

      $(".close").click(function(){
          $("#overlay").css("display","none");
          $(".pop").css("display","none");
      });
  }) , r.isToken = isToken , r

})