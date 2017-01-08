(function(){
	$(".close").click(function(){
		$("#overlay").remove();
		$(".pop").hide();
//		 $("html,body").css({"height": "auto","overflow":"auto"});
	});
	$(".left_iphone .btn").click(function(){
		master();
		$(".pop").show();
		$("#bor1").css("display","block");
		$("#bor2").css("display","none");
		$(".tab #li2").removeClass("active");
		$(".tab #li1").addClass("active");
	});
	$(".right_iphone .btn").click(function(){
		master();
		$(".pop").show();
		$("#bor1").css("display","none");
		$("#bor2").css("display","block");
		$(".tab #li1").removeClass("active");
		$(".tab #li2").addClass("active");
	});
	 var smsClicked = 1;
	 var timer = null;
	$("#li1").click(function(){
		$("#bor2").css("display","none");
		$("#bor1").css("display","block");
		$("#li2").removeClass();
		$(this).addClass("active");
		//yzm
		clearInterval(timer);
        $('.yzm').html('发送验证码');
        $('.yzm').removeClass("phone-yzm-gray");
        sec = 60;
        smsClicked = 1;
        $("#phone1").val("");
        $("#phone2").val("");
       
	});
	$("#li2").click(function(){
		$("#bor1").css("display","none");
		$("#bor2").css("display","block");
		$("#li1").removeClass();
		$(this).addClass("active");
		//yzm
		clearInterval(timer);
        $('.yzm').html('发送验证码');
        $('.yzm').removeClass("phone-yzm-gray");
        sec = 60;
        smsClicked = 1;
        $("#phone1").val("");
        $("#phone2").val("");
	});
	
	$("#small").click(function(){
		if($("#bor1").css("display")=="block"){
			$("#iphone7").html("低至166元/期(合约到期归还)");
			$("#lt_phone").html("官方价5388元");
			$("#black1").css("display","none");
			$("#bor1 .yl span").removeClass("on");
			$("#gg").addClass("on");
		}
	});
	$("#small1").click(function(){
		if($("#bor2").css("display")=="block"){
			$("#iphone7P").html("低至183元/期(合约到期归还)");
			$("#rt_phone").html("官方价6388元");
			$("#black2").css("display","none");
			$("#bor2 .yl span").removeClass("on");
			$("#gg1").addClass("on");
		}
	});
	$("#big").click(function(){
		if($("#bor1").css("display")=="block"){
			$("#iphone7").html("低至183元/期(合约到期归还)");
			$("#lt_phone").html("官方价6188元");
			$("#black1").css("display","inline-block");
		}
	});
	$("#big1").click(function(){
		if($("#bor2").css("display")=="block"){
			$("#iphone7P").html("低至208元/期(合约到期归还)");
			$("#rt_phone").html("官方价7188元");
			$("#black2").css("display","inline-block");
		}
	});
	
	$(".rl span").each(function(i,e){
		var index = i;
		$(e).click(function(){
			$(this).addClass("on").siblings().removeClass("on");
		});
	});
	$(".yl span").each(function(i,e){
		var index = i;
		$(e).click(function(){
			$(this).addClass("on").siblings().removeClass("on");
		});
	});
	
	var baseUrl = "http://m.mk.aiweixiu.com/api/activity/ahs/common/appointIphone";
	var yzmUrl = "http://m.mk.aiweixiu.com/api/activity/ahs/common/";

	//yzm start
	    var sec = 60;
	    var arr = [];
	
	  function count() {
	    	var ag = arr[0];
	        sec--;
	        if (sec < 10) {
	            sec = '0' + sec;
	        }
	        $('#'+ag).html(sec + 's');
	        if (sec == 0) {
	            clearInterval(timer);
	            $('#'+ag).html('重新发送');
	            $('#'+ag).removeClass("phone-yzm-gray");
	            sec = 60;
	            smsClicked = 1;
	        }
	    }
	  $('.yzm').click(function () {
	  	arr.length = 0;
	  	var flag = $(this).attr("id");
	  	arr.push(flag);
	  	var phoneValue = "";
        var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if(flag == "yzm1"){
        		phoneValue = $("#phone1").val();
        }else{
        		phoneValue = $("#phone2").val();
        }
        if (phoneValue == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test(phoneValue)) {
            showAlert("联系手机号不正确");
            return;
       }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        var getSmsButton = $("#"+flag);
        $.ajax({
            type: "post",
            url: yzmUrl+"sendVirifyCode",
            data: {
                "methodName": "sendVirifyCode",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "mobile",
                "data": ""+phoneValue
            },
            success: function (data) {
                if (data.code == "0") {
                    getSmsButton.text('59s');
                    getSmsButton.addClass("phone-yzm-gray");
                    timer = setInterval(count, 1000);
                } else {
                    showAlert(data.msg);
                    smsClicked = 1;
                }
            }
        })
 });
	//yzm end
	$(".confirm").click(function(){
		 var phoneReg = /1[3,4,5,7,8]\d{9}/;
		 var flag = $("#bor2").css("display");
		 var phoneValue = "";
		 var rl = "";
		 var ys = "";
		 var yzm = "";
		 if(flag=="block"){
		 	 if ($("#phone2").val() == '') {
	            showAlert("请输入联系人手机号");
	            return;
	        }
	       else if (!phoneReg.test($('#phone2').val())) {
	            showAlert("联系手机号不正确");
	            $("#phone2").val("");
	            return;
	       }
	       else if($("#yzm_num2").val() == ''){
	       		showAlert("请输入短信验证码");
	            return;
	       }
	       else{
	       		phoneValue = $("#phone2").val();
	       		rl = $("#bor2 li.rl span.on").html();
	       		ys = $("#bor2 li.yl span.on").html();
	       		yzm = $("#yzm_num2").val();
	       }
		 }else{
		 	 if ($("#phone1").val() == '') {
	            showAlert("请输入联系人手机号");
	            return;
	        }
	       else if (!phoneReg.test($('#phone1').val())) {
	            showAlert("联系手机号不正确");
	            $("#phone1").val("");
	            return;
	       }
	       else if($("#yzm_num1").val() == ''){
	       		showAlert("请输入短信验证码");
	            return;
	       }
	       else{
	       		phoneValue = $("#phone1").val();
	       		rl = $("#bor1 li.rl span.on").html();
	       		ys = $("#bor1 li.yl span.on").html();
	       		yzm = $("#yzm_num1").val();
	       }
		 }
		 //'+$(".tab li.active").html()+'
		var phoneJson = '{"color":"'+ys+'","verifyCode":"'+yzm+'","model":"'+$(".tab li.active").html()+'","storage":"'+rl+'","rentTime":"365","mobile":"' + phoneValue + '"}';    		
		 $.post(baseUrl, {
	            "methodName": "appointIphone",
	            "timestamp": Date.parse(new Date()),
	            "version": "2.0",
	            "token": "",
	            "sign": "",
	            "channelCode": "",
	            "clientType": "mobile",
	            "data": phoneJson
	        }).success(function (data) {
	        		if(data.code == 0){
	        			showSuccessAlert(data.msg);
	        		}else{
	        			showErrorAlert("");
	        		}
	        		clearInterval(timer);
	        		smsClicked = 1;
	        		sec = 60;
	        		$(".yzm").text("获取验证码");
	        		$('.yzm').removeClass("phone-yzm-gray");
        			$("#yzm_num1").val("");
        			$("#yzm_num2").val("");
	        });
     });
      function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '50%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '180px',
                'height': '28px',
                'z-index': 10,
                'font-size':'20px',
                'color': '#fff',
                'line-height': '28px',
                'text-align': 'center',
                'border-radius': '3px',
                'padding': '10px 20px',
                'margin-left': '-90px',
                'z-index':"2000"
            });
        setTimeout(function () {
            $("#message").remove();
        }, 1500);
    }
      function showErrorAlert(msg) {
        $('body').append($("<div id='messageError' style='display:none'><p>" + msg + "</p></div>"));
        $('#messageError')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '50%',
                'background': 'url(images/error.png) no-repeat center',
                'background-size': '100% 100%',
                'width': '338px',
                'height': '158px',
                'z-index': 10,
                'text-align': 'center',
                'border-radius': '3px',
                'padding': '10px 0',
                'margin-left': '-169px',
                'z-index':"2000"
            });
      setTimeout(function () {
           $("#messageError").remove();
			$("#overlay").remove();
			$(".pop").hide();
      }, 1500);
    }
    function showSuccessAlert(msg) {
        $('body').append($("<div id='messageSuccess' style='display:none'><p>" + msg + "</p></div>"));
        $('#messageSuccess')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '42%',
                'left': '50%',
                'background': 'url(images/success.png) no-repeat center',
                'width': '338px',
                'height': '158px',
                'z-index': 10,
                'text-align': 'center',
                'border-radius': '3px',
                'padding': '10px 0',
                'margin-left': '-169px',
                'z-index':"2000"
            });
         $('#messageSuccess p')
            .css({
                'position': 'absolute',
                'top': '70%',
                'margin': '0 auto',
                'width': '100%',
                'height': '24px',
                'z-index': 10,
                'font-size':'22px',
                'color': '#fff',
                'line-height': '24px',
                'text-align': 'center',
                'z-index':"2000"
            });
      setTimeout(function () {
           $("#messageSuccess").remove();
			$("#overlay").remove();
			$(".pop").hide();
      }, 1500);
    }
      function master() {
//     $("html,body").css({"height": "100%","overflow":"hidden"});
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
                'z-index':10
            });
    }; 
})();
