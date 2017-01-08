/**
 * Created by computeradd on 2016/5/6.
 */

$(function(){
	init();
	getWX();
    share('iPhone换屏99元！爱回收大促！',awx_shareUrl()+'index.html',awx_shareUrl()+'images/wx-fenxiang.jpg','屏幕摔稀碎？售后修太贵？限时降价快来抢！');
  
    //生成唯一码
    var uuid;
    function init(){
        getStartTime();
        if(localStorage.getItem("uuid") == null){
            uuid = parseInt(Math.random()*Math.pow(10,12));
            localStorage.setItem("uuid",uuid);
        }else{
            uuid =  localStorage.getItem("uuid",uuid);
        }
    }
    function master() {
        $("html,body").css({"height": "100%","overflow":"hidden"});
        var docHeight = $(document.body).height();
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
                'z-index':100
            });
    };
    function closeMaster(){
        $("#overlay").remove();
    }

    $(".liucheng").on("click",function(){
       master();
        $(".lc").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".lc").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
        $(".lc i").click(function(){
            $("#overlay").remove();
            $(".lc").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
    $(".mendian").on("click",function(){
        master();
        $(".md").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".md").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
    $(".guize").on("click",function(){
        master();
        $(".gz").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".gz").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
        $(".gz i").click(function(){
            $("#overlay").remove();
            $(".gz").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
    $(".closepopup").on("click",function(){
        closeMaster();
        $(".md").css({"display":"none"});
        $("html,body").css({"height": "100%","overflow":"auto"});
    });
    var id = 1;
    $(".city li").each(function(i,elem){
        $(elem).on("click",function(){
            $(this).addClass("active").siblings().removeClass();
            id =  $(this).attr("data-cid");
            getCityRegion(id);
        });
    });
    getCityRegion(id);
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

    function getStartTime() {
        var dataJson = '{ "serviceTypeId": "2","activityCode": "aaaa"}';
        $.post( getUrl()+"api/v2/activity/screen/queryCountdown", {
            "methodName": "queryCountdown",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
            if(data.msg == "OK"){
                var startTime = data.body.startTime;
                var endTime = data.body.endTime;
                var  currentTime = data.body.currentTime;
                showTime(currentTime,startTime,endTime);
            }
        });
    }
    function showTime(currentTime,startTime,endTime){
        var leftTime=startTime-currentTime;
        if(leftTime > 0){
           var timer = setInterval(function(){
                leftTime=leftTime-1000;
                if(leftTime <=  0 ){
                    clearInterval(timer);
                    $(".qiang").html("");
                    getCountNum();
                }else{
                    var leftsecond = parseInt(leftTime/1000);
                    var day1=Math.floor(leftsecond/(60*60*24));
                    var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
                    var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
                    var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
                    minute = minute > 9 ?minute:"0"+minute;
                    second = second > 9 ?second:"0"+second;
                    if( hour > 0 ){
                        hour = hour > 9 ?hour:"0"+hour;
                        $(".qiang").html(hour+":"+minute+":"+second);
                    }else{
                        $(".qiang").html(minute+":"+second);
                    }
                }
            },1000);
        }else{
            getCountNum();
        }
    }
    $.ajaxSetup({
        async : false
    });
//获取剩余数量
    function getCountNum(){
        var dataJson = '{ "serviceTypeId": "2","activityCode": "aaaa"}';
        $.post( getUrl()+"api/v2/activity/screen/querySurplus", {
            "methodName": "querySurplus",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
                if(data.body.surplus){
                    $(".qiang").css({"background":"url(images/qiang.png) no-repeat","background-size":"100% 100%"});
                    $(".qiang").on("click",function(){
                        getResult();
                        _hmt.push(['_trackEvent', 'style', 'click', 'qianggou']);
                    });
                }else{
                    $(".qiang").css({"background":"url(images/qiangguang.png) no-repeat","background-size":"100% 100%"});
                    $(".qiang").on("click",function(){
                        return false;
                    });
                }
            }
        });
    }

    //抢购结果
    function getResult(){
        var dataJson = '{ "serviceTypeId": "2","activityCode": "aaaa","singleCode":"'+uuid+'"}';
        $.post( getUrl()+"api/v2/activity/screen/queryLottery", {
            "methodName": "queryLottery",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
                if(data.body.lottery){
                    master();
                    $(".success").css("display","block");
                    $(".btn-success").on("click",function(){
                        window.location.href = "first-confirm.html?flag=active";
                    });
                }else{
                    master();
                    $(".error").css("display","block");
                    $(".btn-error").on("click",function(){
                        window.location.href = "first-confirm.html";
                    });
                    $(".btn-con").on("click",function(){
                        window.location.href = "index.html";
                        getStartTime();
                    });
                }
            }
        });
    }
    $(".more").on("click",function(){
        window.location.href="http://m.aiweixiu.com/first-confirm.html?status=normal";
    });
});