$(function(){
	//192.168.88.65:8060
	var urlArray={
		"yzm":"http://m.mk.aihuishou.com/api/activity/ahs/common/login",
		"locUrl":"http://bd.aihuishou.com/api/bd/58/"
	}
	
	 // 返回顶部
    $("#goTop").bind("click", function () {
        $('body,html').animate({ scrollTop: 0 }, 400);
    });

    //控制显示顶部按钮是否显示
    $(window).scroll(function () {
        if ($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $("#aside").removeClass("no_gotop");
        } else {
            $("#aside").addClass("no_gotop");
        }
    });
     //初始化显示顶部按钮
    $(window).trigger("scroll");
     var originHeaderHeight = 60,
                ahsHeader = $("#header"),
                ahsHeight = ahsHeader.outerHeight(true),
                adhBody = $("#body"),
                adhBodyMarginTop = parseFloat(adhBody.css("margin-top"));
       $(window).scroll(function () {
            // setTimeout(function (){
            if(ahsHeader.hasClass('noscroll')){
                return;
            }
            var sc_top = $(document).scrollTop();
            if(sc_top>originHeaderHeight) {
                if(!ahsHeader.hasClass('fixedTop')){
                    ahsHeader.addClass("fixedTop");
                    adhBody.css("margin-top", ahsHeight);
                    ahsHeader.animate({
                        top:0
                    }, 300);
                    $('.ac_results').hide();
                }
            } else {
                if(ahsHeader.hasClass('fixedTop')){
                    $('.ac_results').hide();
                    ahsHeader.animate({
                        top:'-80px'
                    }, 0);
                }

                ahsHeader.removeClass("fixedTop");
                adhBody.css("margin-top", adhBodyMarginTop);
            }

          //  $('.ac_results').hide();
            //}, 200);
        });
       $("#side_nav_link").click(function () { $(window).scrollTop(0); });
       
       $("#ldx-sidebar").hover(function(){
       		$("#ldx-sidebar .ldx-pop").css("display","block");
       },function(){
       		$("#ldx-sidebar .ldx-pop").css("display","none");
       });
   //帮助 start
   		$("#kefu_help").click(function(){
   			master();
   			$("#popWindow").css("display","block");
   		});
       $(".help_nav li").click(function(){
       		var data_id = $(this).attr("data-id");
       		$("#"+data_id).css("display","block").siblings().css("display","none");
       		$(this).addClass("li_selected").siblings().removeClass("li_selected");
       });
       $(".question_list dt").click(function(){
       		$(".question_list dd").css("display","none");
       		$(this).next().css("display","block");
       });
       $(".help_title_close").click(function(){
       		closeMaster();
       		$("#popWindow").css("display","none");
       });
       $(".kefu_pop").click(function(){
       		$("#kefu_help").trigger("click");
       });
    //遮罩
    function master() {
        $("html,body").css("height", "100%");
        var docHeight = $(document.body).height(); //获取窗口高度
        $('body').append('<div id="overlay"></div>');
        $('#overlay').height(docHeight)
            .css({
                'display': 'block',
                'opacity':0.5,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': 'black',
                'width': '100%',
                'height': '100%',
                'z-index': 10
            });
    };
    //关闭遮罩
    function closeMaster(){
        $('#overlay').remove();
    }
    //end
    
	$("#acode").on("click",function(){
		//$(this).addClass("active extended");
		//$("#acode .s-popup-wrap").css("display","block");
		$(this).toggleClass("active extended");
	});
	$(".pingan").on("click",function(){
		$(this).toggleClass("active extended");
	});
	$(".yongyuan").on("click",function(){
		$(this).toggleClass("active extended");
	});
	$(".ensure").on("click",function(e){
		e.stopPropagation();
	});
	$(".s-popup-wrap").click(function(e){
		e.stopPropagation();
	});
	$(".close").click(function(){
		$("#acode").removeClass("active extended");
		$(".pingan").removeClass("active extended");
		$(".yongyuan").removeClass("active extended");
	})
	$(".pingan .ensure").click(function(){
		var name = $(".pingan .name").val();
		var idCard = $(".pingan .identy").val();
		if(name==""||name=="姓名"){
			alert("请填写姓名");
			$(".pingan .name").addClass("error");
			return;
		}else{
			$(".pingan .name").removeClass("error");
		}
		if(idCard==""||idCard=="身份证号"){
			alert("请填写身份证号");
			return;
		}else{
			var flag = isIDCard(idCard);
			if(!flag){
				alert("请输入正确的身份证号");
				$(".pingan .identy").val("");
				return;
			}else{
				$(".pingan").removeClass("active");
				$(".pingan").addClass("used");
			}
		}
	});
	function isIDCard(str){
		  if(str == "") return false;
		  var iSum = 0;
		  var info = "";
		  var sId = str;
		  var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
		  if (!/^\d{17}(\d|x)$/i.test(sId)) { return false; }
		  sId = sId.replace(/x$/i, "a");
		  //非法地区
		  if (aCity[parseInt(sId.substr(0, 2), 10)] == null) { return false; }
		  var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		  var d = new Date(sBirthday.replace(/-/g, "/"))
		  //非法生日
		  if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) { return false; }
		  for (var i = 17; i >= 0; i--) { iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11); }
		  if (iSum % 11 != 1) { return false; }
		  return true;
	}
	$(".yongyuan .percent").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var per = $(this).attr("data-percent");
		$("#js-popup-donation").html(Math.floor(per*0.01*3230));
	});
	$("#pre").bind("input propertychange",function(){
		$(".yongyuan .percent").removeClass("active");
		var pre_value = $("#pre").val();
		if(pre_value>100){
			$("#pre").val("");
			$("#js-popup-donation").html("0");
			alert("请输入1-100之间的数字");
		}else{
			$("#js-popup-donation").html(Math.floor(pre_value*0.01*3230));
		}
	});
	$(".yongyuan .ensure").click(function(){
		var pre_value = $("#pre").val();
		if(pre_value==""||pre_value=="输入比例"){
			alert("请填写比例数或选择比例");
			return;
		}else{
			$(".yongyuan").removeClass("active");
			$(".yongyuan").addClass("used");	
		}
	});
	$(".acode .ensure").click(function(){
		var acode_value = $("#acode_val").val();
		if(acode_value==""||acode_value=="填写A码"){
			alert("请填写A码");
			return;
		}else{
			$(".acode").removeClass("active");
			$(".acode").addClass("used");
			//接口调用
		}
	});
	
	 //获取图片验证码
    var currentId = [];
    function pictureYzm() {
        var uuid = parseInt(( Math.random() + 1 ) * 100000000000);
        currentId.length = 0;
        currentId.push(uuid);
        $("img#portrait").attr("src", urlArray.yzm + "/getCertCode?uuid=" + currentId[0]);
    }
    pictureYzm();

    //点击图片验证码重新加载
    $("img#portrait").on("click",function(){
        $("img#portrait").removeAttr("src");
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
        $('.phone_yzm').html(sec + '秒后重发');
        if (sec == 0) {
            clearInterval(timer);
            $('.phone_yzm').html('获取验证码');
            $(".phone_yzm").removeClass("color-gray");
            sec = 120;
            useClicked = 1;
            $(".zj_img").val('');
            $("img#portrait").trigger("click");
        }
    }
     $(".phone_yzm").on("click", function () {
        var flag = true;
        var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($(".zj_phone").val() == ''||$(".zj_phone").val() == '请填写手机号码') {
            alert("联系电话不能为空！");
            flag = false;
            return;
        }
        if (!phoneReg.test($('.zj_phone').val())) {
            alert("联系电话格式不正确！");
            flag = false;
            $(".zj_phone").val("");
            return;
        }
        if ($(".zj_img").val() == ''||$(".zj_img").val()=='请填写图形验证码') {
            alert("请填写图片验证码！");
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
                        alert(data.msg);
                        useClicked = 1;
                         $('.phone_yzm').html('获取验证码');
                         clearInterval(timer);
                         pictureYzm();
                         $(".zj_img").val("");
                    } else {
                        $('.phone_yzm').html('120秒后重发');
                        $('.phone_yzm').addClass("color-gray");
                        timer = setInterval(count, 1000);
                    }
                },
                error: function (data) {
                    //console.log("error");
                }
            })
        }
    });
    
	//ahs service
	$("#btnShowServiceRules").on("click",function(){
		$("#ahs-service-mask").show();
	});
	$(".closepop").on("click",function(){
		$("#ahs-service-mask").hide();
	});
	$("#btnShowInsuranceRules").on("click",function(){
		$("#ahs-insurance-mask").show();
	})
	$(".btnClose").on("click",function(){
		$("#ahs-insurance-mask").hide();
	})
	//submit form
	$("#js-submit").on("click",function(){
		submitForm();
	});
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
	function submitForm(){
		var s_name = $(".zj_name").val();
		var s_phone = $(".zj_phone").val();
		var s_img = $(".zj_img").val();
		var s_pc = $(".zj_phone_code").val();
		var sfdq_tj = $("#shenfen p").html();
		var csdq_tj = $("#chengshi p").html();
		var qydq_tj = $("#quyu p").html();
		var s_riqi = $("#riqi p").html();
		var s_xiaoqu = $(".zj_county").val();
		var s_dizhi = $(".zj_add").val();
		if(s_name==""||s_name=="请填写联系人姓名"){
			alert("用户名不能为空");
			return;
		}
		if(s_phone==""||s_phone=="请填写手机号码"){
			alert("联系电话不能为空");
			return;
		}
//		if(s_img==""||s_img=="请填写图形验证码"){
//			alert("图片验证码不能为空");
//			return;
//		}
		if(s_pc==""||s_pc=="请填写手机验证码"){
			alert("手机验证码不能为空");
			return;
		}
//		if(s_xiaoqu==""||s_xiaoqu=="请输入您的小区、大厦或街道"){
//			alert("小区、大厦或街道不能为空");
//			return;
//		}
		if(s_dizhi==""||s_dizhi=="请输入详细地址"){
			alert("详细地址不能为空");
			return;
		}
	
		  var adr = s_dizhi;
		  var dataJson = '{"mobile":"'+s_phone+'","name":"'+s_name+'","sourceType":"0","paymentType":"1","pickUpType":"1","key":"'+fastorderkey+'","sourceAct":"'+getCookie("aihuishou_source_act")+'","extra":"","address":"'+adr+'","getTime":"'+s_riqi+'","loginCode":"'+s_pc+'","cityName":"'+csdq_tj+'","regionName":"'+qydq_tj+'"}';
        		$.post(urlArray.locUrl+"createAhsOrder",{
        			"methodName": "createAhsOrder",
	            "timestamp": Date.parse(new Date()),
	            "version": "2.0",
	            "token": "",
	            "sign": "",
	            "channelCode": "",
	            "clientType": "PC",
	            "data": dataJson
        		}).success(function(data){
        			if(data.code == '0'){
        				if(data.body.code == '200'){
        					var orderNo = data.body.data.orderItems[0].recycleOrderNo;
        					window.location.href="http://www.aihuishou.com/trade/Success.html?tradeNo="+orderNo;
        				}else{
        					alert("系统错误，请联系客服人员");
        				}
        			}else{
        				alert(data.msg);
        			}
        			
        		});
        		
		
	}
	
});
