/**
 * Created by computeradd on 2016/4/17.
 */
$(function () {
	inint();
    function inint(){
        var codes = localStorage.getItem("codes").split(",");
        globalPrice = codes[3];
        payAmount = codes[3];
        var phoneInfo = localStorage.getItem("phoneInfo").split(",");
        if(phoneInfo[2] == "undefined"){
            phoneInfo[2] = "全颜色";
        }
        $(".footer .price").html("&yen;&nbsp;"+codes[3]);
        $("ul.q-list li").eq(3).html("&yen;&nbsp;"+codes[3]);
        $("ul.q-list li").eq(0).html(phoneInfo[1]+"-"+phoneInfo[2]);
        $("ul.q-list li").eq(1).html(phoneInfo[0]);
    }
    //tab切换
    $(".pre-menu li").each(function(index,elem){
        var that = index;
        $(elem).on("click",function(){
            $(".doors-wrap ul").css("display","none");
            $(".doors-wrap ul").eq(that).css("display","block");
        });
    });
    //获取城市
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
                var parList = $(".citylist");
                for (var i = 0; i < length; i++) {
                    var childLi = $("<li data-cid=" + arrayCity[i].id + ">" + arrayCity[i].name + "</li>");
                    parList.append(childLi);
                }
              getCityRegion(cid);
            }
        });
    }
    getCity();
    //门店区域事件
    function getCityRegion(cityId) {
        var dataJson = '{ "serviceTypeId": "2","cityId": "' + cityId + '"}';
        $.post(getUrl() + "api/v2/common/address/queryCityRegion", {
            "methodName": "queryCityRegion",
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
                $(".addrlist li").remove();
                var parList = $(".addrlist");
                for (var i = 0; i < length; i++) {
                    var childLi = $("<li data-regionid = " + arrayCity[i].id + ">" + arrayCity[i].name + "</li>");
                    parList.append(childLi);
                }
            }
        });
    }


    //门店事件
    function getDoor(cityId, regionId) {
        var dataJson = '{"cityId":' + cityId + ',"regionId": ' + regionId + '}';
        $.post(getUrl() + "api/v2/common/address/queryStoreList", {
            "methodName": "queryStoreList",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "PC",
            "data": dataJson
        }).success(function (data) {
            var arrayCity = data.body;
            var length = data.body.length;
            var parList = $(".doorlist");
            $(".doorlist li").remove();
            for (var i = 0; i < length; i++) {
                var childLi = $("<li data-latitude="
                    + arrayCity[i].latitude + " data-longitude="
                    + arrayCity[i].longitude + " data-address="
                    + arrayCity[i].storeAddress + " data-storeid="
                    + arrayCity[i].storeId + " data-storename="
                    + arrayCity[i].storeName + "><div><p class=p1>"
                    + arrayCity[i].storeName + "</p><p class=p1 style='margin-top:0.3rem;color:#666666'>"
                    + "<img src='images/awx_m/addr.png' style='width:0.6rem;height:0.6rem;margin-right:3px;'/>"
                    + arrayCity[i].storeAddress + "</p></div></li>");
                parList.append(childLi);
            }
        });
    }

    //控制滑块移动
    $(".pre-menu li").eq(0).click(function () {
        $(".slider").animate({left: '0.8rem'}, 150);
        $(".doors-wrap ul").css("display","none");
        $(".doors-wrap ul").eq(0).css("display","block");
    });
    $(".pre-menu li").eq(1).click(function () {
        $(".slider").animate({left: '5.8rem'}, 150);
        $(".doors-wrap ul").css("display","none");
        $(".doors-wrap ul").eq(1).css("display","block");
    });
    $(".pre-menu li").eq(2).click(function () {
        $(".slider").animate({left: '10.9rem'}, 150);
    });
    var cid = 1, rid, doorid, dooraddr;
    var city = "", county = "", addr = "";
    $(".citylist").delegate("li", "click", function () {
        var that = $(this).index();
        city = $(this).html();
        cid = $(this).attr("data-cid");
        //start 点击城市后，之前的存储信息全部设置为初始状态
        $(".pre-menu li").eq(1).html("区域选择");
        rid = undefined;
        $(".pre-menu li").eq(2).html("门店选择");
        doorid = undefined;
        dooraddr = undefined;
        county = "";
        addr = "";
        $("#door").html("请选择服务门店").css("color","#999999");
        //end
        getCityRegion(cid);
        $(".pre-menu li").eq(0).html(city);
        $(".slider").animate({left: '5.8rem'}, 150);
        $(".citylist").css("display", "none");
        $(".addrlist").css("display", "block");
    });
    $(".addrlist").delegate("li", "click", function () {
        var that = $(this).index();
        county = $(this).html();
        rid = $(this).attr("data-regionid");
        $(".pre-menu li").eq(1).html(county);
        $(".slider").animate({left: '10.9rem'}, 150);
        $(".addrlist").css("display", "none");
        $(".doorlist").css("display", "block");
        getDoor(cid, rid);
        //start点击区域时门店的数据信息设置为初始状态
        $(".pre-menu li").eq(2).html("门店选择");
        doorid = undefined;
        dooraddr = undefined;
        addr = "";
        $("#door").html("请选择服务门店").css("color","#999999");
        //end
    });
    $(".doorlist").delegate("li", "click", function () {
        var that = $(this).index();
        doorid = $(this).attr("data-storeid");
        dooraddr = $(this).attr("data-address");
        var storeName = $(this).attr("data-storename");
        addr = storeName;
        $(".pre-menu li").eq(2).html(storeName);
        setTimeout(function () {
            closeWin(".pre-door")
        }, 300);
        $("#door").html(storeName);
        $("#door").css("color", "#333333");
    });


    $(".addrlist li").each(function (index, elem) {
        var that = index;
        $(elem).on("click", function () {
            var text = $(".addrlist li").eq(that).html();
            county = text;
            $(".pre-menu li").eq(1).html(text);
            $(".addrlist").css("display", "none");
            $(".doorlist").css("display", "block");
        })
    });
    $(".doorlist li").each(function (index, elem) {
        var that = index;
        $(elem).on("click", function () {
            var text = $(".doorlist li").eq(that).html();
            var storName = $(".doorlist li").eq(that).attr("data-storename");
            addr = text;
            $(".pre-menu li").eq(2).html(text);
            setTimeout(function () {
                closeWin(".pre-door")
            }, 300);
            $("#door").html(storName);
        })
    });
    var currentId = [];
    //获取图片验证码
    function pictureYzm() {
        var uuid = parseInt(( Math.random() + 1 ) * 100000000000);
        currentId.length = 0;
        currentId.push(uuid);
        $("img#portrait").attr("src", getUrl() + "api/v2/user/login/getCertCode?uuid=" + currentId[0]);
    }
	//点击图片验证码重新加载
    $("img#portrait").on("click",function(){
        $("img#portrait").removeAttr("src");
        pictureYzm();
    });	
    pictureYzm();//初始化图片验证码
    //获取手机验证码
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

    $('.phone-yzm').click(function () {
        var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($("#tel").val() == '') {
            showAlert("请输入联系人手机号");
            return;
        }
       if (!phoneReg.test($('#tel').val())) {
            showAlert("联系手机号不正确");
            return;
        }
        if ($("#img-yzm").val() == '') {
            showAlert("请输入图片验证码");
            return;
        }
        if (!smsClicked) {
            return;
        }
        smsClicked = 0;
        var getSmsButton = $(this);
        var phoneJson = '{"mobile":"' + $('#tel').val() + '","certCode":"' + $("#img-yzm").val() + '"}';
        $.ajax({
            type: "post",
            url: getUrl() + "api/v2/user/login/sendVerifyCode?uuid=" + currentId[0] + "",
            data: {
                "methodName": "sendVerifyCode",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "PC",
                "data": phoneJson
            },
            xhrFields: {
                //withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                if (data.code != "0") {
                    showAlert(data.msg);
                    smsClicked = 1;
                } else {
                    getSmsButton.text('120秒后重发');
                    getSmsButton.addClass("phone-yzm-gray");
                    timer = setInterval(count, 1000);
                }
            },
            error: function (data) {
            }
        })
    })
    //tab时间选择
    var timerTxt;
    $(".day-list").delegate("li", "click", function () {
        timerTxt = $(this).html();
        $("#timer").html(timerTxt);
        $("#timer").css("color", "#333333");
        setTimeout(function () {
            closeWin(".pre-time")
        }, 500);
    });
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
    //附加信息
    $("#btns").on("click", function () {
        var txt = $(".info-div textarea").val();
        if (txt != "") {
            $("#elseInfo").html(txt);
            $("#elseInfo").css("color", "#333");
        } else {
            $("#elseInfo").html("选填，附加信息");
            $("#elseInfo").css("color", "#999");
        }
    });
    //选择时间
    function showTime() {
        $(".pre-time").css({
            'display': 'block',
            'position': 'fixed',
            'left': 0,
            'bottom': '-30rem',
            'z-index': 10000,
            'width': '100%',
            'background': '#fff'
        });
        $(".pre-time").animate({"bottom": "0"}, 300);
    }

    //选择门店
    function showDoor() {
        $(".pre-door").css({
            'display': 'block',
            'position': 'fixed',
            'left': 0,
            'bottom': '-30rem',
            'z-index': 10000,
            'width': '100%',
            'background': '#fff'
        });
        $(".pre-door").animate({"bottom": "0"}, 300);
    }

    //附加信息
    function showInfo() {
        $(".pre-info").css({
            'display': 'block',
            'position': 'fixed',
            'left': 0,
            'bottom': '-30rem',
            'z-index': 10000,
            'width': '100%',
            'background': '#fff',
            'padding-bottom':'0.5rem'
        });
        $(".pre-info").animate({"bottom": "0"}, 300);
    }

    //附加信息弹窗
    $(".detail-list ul li").eq(6).on("click", function () {
        master();
        showInfo();
    });
    $(".detail-list ul li").eq(0).on("click", function () {
        master();
        showDoor();
    });
    $(".detail-list ul li").eq(1).on("click", function () {
        master();
        showTime();
    });
    function regs() {
        if (county == "" || addr == "") {
            showAlert("请选择服务门店");
            return false;
        }
        if (timerTxt == undefined) {
            showAlert("请选择到店时间");
            return false;
        }
        if ($("#username").val() == "") {
            showAlert("请输入联系人姓名");
            return false;
        }
        if ($("#tel").val() == "") {
            showAlert("请输入联系人手机号");
            return false;
        } else {
            var phoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!phoneReg.test($('#tel').val())) {
                showAlert("请输入有效手机号");
                return false;
            }
        }
        if ($("#img-yzm").val() == "") {
            showAlert("请输入图片验证码");
            return false;
        }
        if ($("#phoneCode").val() == "") {
            showAlert("请输入短信验证码");
            return false;
        }
        return true;
    }
	//优惠码
	$("#couponCode").bind("input propertychange",function(){
		var couponValue = $(this).val();
		var len = $(this).val().length;
		var reg = /^[a-zA-Z]{6}/;
		if( reg.test($(this).val()) ){
			var countJson = '{"couponCode":"'+$(this).val()+'","orderPrice":'+(globalPrice*100)+',"goodsNum":1,"businessType":"kuaixiu"}';
            $.post(getMkUrl()+"api/activity/ahs/common/coupon/queryCoupon", {
                "methodName": "queryCoupon",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "MOBILE",
                "data": countJson
            }).success(function (data) {
            		if(data.code == 0){
            			$(".price").html("&yen;"+data.body.payPrice/100+"&nbsp;<span class='coupon'>&yen;"+globalPrice+"</span>");
					payAmount = data.body.payPrice/100;
            		}else{
            			showAlert(data.msg);	
            			$("#couponCode").val("");
            		}
            });
		}else{
			if(len == 6){
				showAlert("优惠码不合法");
				$("#couponCode").val("");
			}
		}
	});
    //提交订单
    var submitClicked = 1;
    $("#submit").on("click", function () {
        if (!submitClicked) {
            return;
        }
        if (regs()) {
            var user = $("#username").val();
            var tel = $("#tel").val();
            var phoneCode = $("#phoneCode").val();
            var couponCode = $("#couponCode").val();//优惠码5-25
            if(couponCode.length>0 && couponCode.length<6){
            		showAlert("优惠码不合法");
            		$("#couponCode").val("");
            		return;
            }
            var year = new Date().getFullYear();
            var codes = localStorage.getItem("codes").split(",");
            var phoneInfo = localStorage.getItem("phoneInfo").split(",");
            var goodsId = localStorage.getItem("goodsId");
            if (cid == 1) {
                city = "北京";
            }else if(cid == 2){
                city = "上海";
            }
            if (timerTxt != undefined) {
                var txt = year + "-" + timerTxt.split("(")[0] + " 00:00:00";
                var elseInfo = $("#txt").val();
            }
            //代客下单(5-5)
            var customer = localStorage.getItem("orderType") == null ? "":localStorage.getItem("orderType");
            //99元换购活动
            var singleCode = "";
            var activityCode = "";
            var flag = localStorage.getItem("activityCode") == null ? "":localStorage.getItem("activityCode");
            if(flag != ""){
                singleCode = localStorage.getItem("uuid");
                activityCode = "aaaa";
            }
            if(localStorage.getItem("status") != null){
                singleCode = "";
                activityCode = "";
            }
            var couponAmount =  globalPrice - payAmount ; //优惠码：优惠金额
            //提交json串
            var countJson = '{"serviceTypeId":2,"clientType": "MOBILE","singleCode":"'+singleCode+'","orderType":"'+customer
                +'","imei": "","verifyCode":"' + phoneCode
                + '","provinceId": "' + cid
                + '","cityId": "' + rid + '",' +
                '"storeId": "' + doorid + '","address": "' + dooraddr + '","linkUser": "' + user
                + '","mobile": "' + tel + '","payAmount":'+(payAmount*100)+',' +
                '"hopeTime": "' + txt + '","totalAmount": ' + (globalPrice*100) + ',"activityCode": "'+activityCode+'",' +
                '"couponCode": "'+couponCode+'","couponAmount": '+(couponAmount*100)+',"promoterCode": "tuiguang","desc": "' + elseInfo + '",' +
                '"goodsList": [{"goodsId": ' + goodsId + ',"num": 1,"price": ' + (codes[3] * 100) + '}]}';
            submitClicked = 0;
            $.post(getUrl() + "api/v2/user/order/createOrder4Store", {
                "methodName": "createOrder",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "MOBILE",
                "data": countJson
            }).success(function (data) {
                submitClicked = 1;
                if (data.msg == "ok") {
                    var returnCode = JSON.parse(data.body);
                    if(flag != ""){
                        localStorage.removeItem("uuid");//99换购活动
                        localStorage.removeItem("activityCode");
                    }
                    localStorage.removeItem("status");//清除正常下单的标志
                    //本地存储
                    localStorage.setItem("county", city + "-" + county);
                    localStorage.setItem("chooseDoorAddress", dooraddr);
                    localStorage.setItem("timerTxt", timerTxt);
                    localStorage.setItem("username", user);
                    localStorage.setItem("tel", tel);
                    localStorage.setItem("oderNo", returnCode.orderNo);
                    //优惠码 start
                    localStorage.removeItem("payAmount");
                    var couponCode = $("#couponCode").val();
            			if(couponCode != ""){
            				localStorage.setItem("payAmount",payAmount);
            			}
            			//优惠码 end
			    window.location.href = "success-confirm.html";
                } else if (data.msg == "验证码不正确") {
                    showAlert("短信验证码不正确");
                } else {
                    showAlert(data.msg);
                }
            });
        }
    });


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
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
});