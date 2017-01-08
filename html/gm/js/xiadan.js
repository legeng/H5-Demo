$(function(){
	var urlArray={
		"yzm":"http://m.mk.aihuishou.com/api/activity/ahs/common/login",
		"locUrl":"http://bd.aihuishou.com/api/bd/58/"
	}
	 $("#js-submit").on("click",function(){
		submitForm();
	});
	function submitForm(){
		var s_name = $(".zj_name").val();
		var s_phone = $(".zj_phone").val();
		var s_pc = $(".zj_phone_code").val();
		var sfdq_tj = $("#choose").html();
		var csdq_tj = $(".cs_tab").html();
		var s_riqi = $("#time").html();
		var qydq_tj = $(".qy_tab").html();
		var s_dizhi = $(".zj_add").val();
		if(s_name==""||s_name=="请填写联系人姓名"){
			showAlert("用户名不能为空");
			return;
		}
		if(s_phone==""||s_phone=="请填写手机号码"){
			showAlert("联系电话不能为空");
			return;
		}
		if(sfdq_tj==""||sfdq_tj=="请选择所在省份"){
			showAlert("省市区不能为空")
			return;
		}
		if(s_pc==""||s_pc=="请填写手机验证码"){
			showAlert("手机验证码不能为空");
			return;
		}
		if(s_dizhi==""||s_dizhi=="请输入详细地址"){
			showAlert("详细地址不能为空");
			return;
		}
		if(s_riqi==""||s_riqi=="请选择交易时间"){
			showAlert("交易时间不能为空");
			return;
		}
		  var adr = s_dizhi;
		  var dataJson = '{"mobile":"'+s_phone+'","name":"'+s_name+'","sourceAct":"'+getCookie("aihuishou_source_act")+'","sourceType":"0","paymentType":"1","pickUpType":"1","key":"'+fastorderkey+'","extra":"","address":"'+adr+'","getTime":"'+s_riqi+'","loginCode":"'+s_pc+'","cityName":"'+csdq_tj+'","regionName":"'+qydq_tj+'"}';
        		$.post(urlArray.locUrl+"createAhsOrder",{
        			"methodName": "createAhsOrder",
	            "timestamp": Date.parse(new Date()),
	            "version": "2.0",
	            "token": "",
	            "sign": "",
	            "channelCode": "",
	            "clientType": "m",
	            "data": dataJson
        		}).success(function(data){
        			if(data.code == '0'){
        				if(data.body.code == '200'){
        					var orderNo = data.body.data.orderItems[0].recycleOrderNo;
        					if(orderNo!=""&&orderNo!=null){
        						var urlDir = "http://m.aihuishou.com/Trade/Success?tradeNo="+orderNo;
        						if(sourceType =='64'||sourceType == '73'){
        							urlDir = "http://cp.aihuishou.com/Trade/Success?tradeNo="+orderNo;
        						}
      						//var urlDir = "http://116.228.54.90:56666/Trade/Success.html?tradeNo="+orderNo;
        						 window.location.href=urlDir;
        					}
        				}else{
        					showAlert("系统错误，请联系客服人员");
        				}
        			}else{
        				showAlert(data.msg);
        			}  
        		});	
	}
	  //获取图片验证码
    var currentId = [];
    function pictureYzm() {
        var uuid = parseInt(( Math.random() + 1 ) * 100000000000);
        currentId.length = 0;
        currentId.push(uuid);
        $("#portrait").css({
        		"background":"url("+urlArray.yzm + "/getCertCode?uuid=" + currentId[0]+") no-repeat",
        		"background-size":"100% 100%"
        	});
    }
    pictureYzm();

    //点击图片验证码重新加载
    $("#portrait").on("click",function(){
        pictureYzm();
    });
    
	  //获取验证码
    var useClicked = 1;
    var timer = null;
    var sec = 120;

    function count() {
        sec--;
        if (sec < 10) {
            sec = '0' + sec;
        }
        $('.validate_code_btn').html(sec + '秒后重发');
        if (sec == 0) {
            clearInterval(timer);
            $('.validate_code_btn').html('获取验证码');
            $(".validate_code_btn").removeClass("color-gray");
            sec = 120;
            useClicked = 1;
        }
    }
     $(".validate_code_btn").on("click", function () {
        var flag = true;
        var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".zj_phone").val() == ''||$(".zj_phone").val() == '请填写手机号码') {
            showAlert("联系电话不能为空！");
            flag = false;
            return;
        }
        if (!phoneReg.test($('.zj_phone').val())) {
            showAlert("联系电话格式不正确！");
            flag = false;
            $(".zj_phone").val("");
            return;
        }
        if ($(".zj_img").val() == ''||$(".zj_img").val()=='请填写图形验证码') {
            showAlert("请填写图片验证码！");
            flag = false;
            return;
        }
        if (flag) {
            if (useClicked == 0) {
                return;
            }
            useClicked = 0;
            var phoneJson = '{"mobile":"' + $('.zj_phone').val() + '","certCode":"' + $(".zj_img").val() + '","singleCode":"'+currentId[0]+'"}';
            $.ajax({
                anscy:false,
                type: "post",
                url: urlArray.yzm + "/sendVerifyCode",
                data: {
                    "methodName": "sendVerifyCode",
                    "timestamp": Date.parse(new Date()),
                    "version": "2.0",
                    "token": "",
                    "sign": "",
                    "channelCode": "",
                    "clientType": "mobile",
                    "data": phoneJson
                },
                success: function (data) {
                    if (data.code != "0") {
                        showAlert(data.msg);
                        useClicked = 1;
                         $('.validate_code_btn').html('获取验证码');
                         clearInterval(timer);
                    } else {
                        $('.validate_code_btn').html('120秒后重发');
                        $('.validate_code_btn').addClass("color-gray");
                        timer = setInterval(count, 1000);
                    }
                },
                error: function (data) {
                }
            })
        }
    });
    $(".tab_list span").each(function(i,elem){
    		var index = i;
    		$(elem).click(function(){
    			$(".address_con ul").css("display","none");
    			$(".address_con ul").eq(index).css("display","block");
    		});	
    });
    $(".sf_tab").click(function(){
    		$(".slider").animate({"left":"0.2rem"},100);
    		$(".chengshi li").remove();
    		$(".quyu li").remove();
    });
    $(".cs_tab").click(function(){
    		$(".slider").animate({"left":"2.8rem"},100);
    });
    $(".qy_tab").click(function(){
    		$(".slider").animate({"left":"5.2rem"},100);
    		$(".quyu li").remove();
    });
    $("#choose").on("click",function(){
    		master();
    		 $(".address_con").css({
            'display': 'block',
            'position': 'fixed',
            'left': 0,
            'bottom': '-30rem',
            'z-index': 10000,
            'width': '100%',
            'background': '#fff'
        });
        $(".address_con").animate({"bottom": "0"}, 300);
    });
    $(".time_list .jiaoyi").on("click",function(){
    		master();
    		showTime();
    });
    var timerTxt;
    $(".day-list").delegate("li", "click", function () {
        timerTxt = $(this).html();
        $("#time").html(timerTxt);
        $("#time").css("color", "#000");
        setTimeout(function () {
            closeWin(".time-wrap")
        }, 500);
    });
    //选择时间
    function showTime() {
        $(".time-wrap").css({
            'display': 'block',
            'position': 'fixed',
            'left': 0,
            'bottom': '-30rem',
            'z-index': 10000,
            'width': '100%',
            'background': '#fff'
        });
        $(".time-wrap").animate({"bottom": "0"}, 300);
    }
    //取出当前日期及后6天
    function setDay() {
        var parNode = $(".day-list");
        for (var i = 0; i < 7; i++) {
        		var d=new Date();
        		var day=i;
        		var time =d.getHours();
        		if(time>=20){
        			day=day+1;
        		}
            var dayStr = getDay(day);
            var childNode = $('<li>' + dayStr + '</li>');
            parNode.append(childNode);
        }
    }

    setDay();
    //获取日期
    function getDay(num) {
        var d = new Date();
        d.setDate(d.getDate() + num);
        var m = d.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d1 = d.getDate();
        d1 = d1 < 10 ? '0' + d1 : d1;
        var w = d.getDay();
        var day;
        switch (w) {
            case 0:
                day = "星期日";
                break;
            case 1:
                day = "星期一";
                break;
            case 2:
                day = "星期二";
                break;
            case 3:
                day = "星期三";
                break;
            case 4:
                day = "星期四";
                break;
            case 5:
                day = "星期五";
                break;
            case 6:
                day = "星期六";
                break;
        }
        return m + "-" + d1 + "(" + day + ")";
    }
	function master() {
        $("html,body").css("height", "100%");
        var docHeight = $(document.body).height(); //获取窗口高度
        $('body').append('<div id="overlay"></div>');
        $('#overlay').height(docHeight)
            .css({
                'display': 'block',
                'opacity': .5,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': 'black',
                'width': '100%',
                'height': '100%',
                'z-index': 9999
            });
    };
    //取出cookies
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
	 function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '50%',
                'margin-left': '-2.5rem',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '5rem',
                'height': '0.3rem',
                'z-index': 10,
                'font-size':'0.3rem',
                'color': '#fff',
                'line-height': '0.3rem',
                'padding': '0.3rem 0',
                'text-align': 'center',
                'border-radius': '0.1rem',
                'z-index':"320"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
})
