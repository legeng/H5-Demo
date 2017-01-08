(function($){

    //检查是生产环境还是测试环境
    var __isProduction = (function(){
        return location.hostname.indexOf('test.aihuishou.com') > -1 ? false : location.hostname.indexOf('aihuishou.com') > -1;
    })();

    var __baseUrl = __isProduction ? 'http://m.mk.aihuishou.com/' : 'http://bj.test.aihuishou.com:7181/';

    //读取活动配置初始化
    var Activity = function(option){
        this.option = option;
        this.option.code = option.code || null,
        this.option.coupons = option.coupons || [],
        this.option.reward = option.reward || [],
        this.option.color = option.color || [],
        this.option.activityName = option.name || null,
        this.option.pageName = option.page || null,
        this.option.smsClicked = 1,
        this.option.timer = null,
        this.option.sec = 120,
        this.option.getSmsButton = null,
        this.option.currentId = [],
        this.option.clear = null,//清除提示信息
        this.option.bRotate = false,//false:停止;ture:旋转

        this.init();
    }

    Activity.prototype.init = function(option){
        
    }

    //返回所有查询参数的键值对
    Activity.prototype.urlParams = function() {
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

    //通过键返回查询参数值
    Activity.prototype.parseUrl = function(e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = new RegExp("[\\?&]" + e + "=([^&#]*)"), //[\\?&] 匹配第一个？号或&分割，[^&#]*匹配&分割和#(页面hash)
             a = t.exec(location.search);
        return null === a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
    }

    //手机号隐藏 从frontLen开始 隐藏endLen位
    Activity.prototype.hideChar = function(str,frontLen,endLen) { 
        var len = str.length-frontLen-endLen;
        var xing = '';
        for (var i=0;i<len;i++) {
            xing+='*';
        }
        return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
    }

    //根据值获取数组下标,否则返回-1
    Activity.prototype.indexOf = function(arr , value){
        if(Array.prototype.indexOf){
            return arr.indexOf(value);
        }else{
            for (var i=0,n=arr.length; i<n; i++){
                if (arr[i] === value){
                    return i;
                }
            }
        }
        return -1;
    }

    //判断是当前客户端系统类型
    Activity.prototype.system = function(){
        var e = window.navigator.userAgent;
        return {
          trident: e.indexOf("Trident") > -1, //IE浏览器(遨游、世界之窗、腾讯TT...都是IE)
          presto: e.indexOf("Presto") > -1, //Opera 欧朋浏览器
          webKit: e.indexOf("AppleWebKit") > -1, //Safari、Chrome 谷歌浏览器
          gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") == -1, //FireFox 火狐浏览器
          safari: e.indexOf("Safari") == -1, //苹果浏览器
          mobile: !!e.match(/AppleWebKit.*Mobile.*/),
          android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1, //android客户端
          ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios 客户端
          iPhone: e.indexOf("iPhone") > -1, 
          iPad: e.indexOf("iPad") > -1,
          weixin: "micromessenger" == e.match(/MicroMessenger/i),
          mobileIos: !!/(iPad|iPhone|iPod)/i.test(e)
        }
    }
    //页面遮罩层
    Activity.prototype.layer = function(){
        $('body').append('<div id="overlay"></div>');
        $('#overlay').height($(document.body).height())
        .css({
          'display': 'block',
          'opacity': .8,
          'position': 'fixed',
          'top': 0,
          'left': 0,
          'bottom':0,
          'right':0,
          'margin':'auto',
          'background-color': '#000000',
          'width': '100%',
          'height': '100%',
          'overflow':'hidden',
          'filter':'alpha(opacity=80)',
          'z-index':300
        });
    }
    Activity.prototype.showBox = function(msg) {
        this.isEmpty(this.option.clear) ? void(0) : clearTimeout(this.option.clear);
        $("#showBox").remove();
        $('body').append($("<div id='showBox' style='display:none'><p>" + msg + "</p></div>"));
        $('#showBox').css({
          'display': 'block',
          'position': 'fixed',
          'top': 0,
          'left': 0,
          'bottom':0,
          'right':0,
          'margin':'auto',
          'background-color': 'rgba(0,0,0,0.65)',
          'width': '250px',
          'height': '32px',
          'font-size':'16px',
          'color': '#fff',
          'line-height': '32px',
          'text-align': 'center',
          'border-radius': '3px',
          'padding': '10px 20px',
          'z-index':99999
        });
        this.option.clear = setTimeout(function () {
          $("#showBox").remove();
        }, 1800);
    }

    //检查一个变量是否为空，空返回true
    Activity.prototype.isEmpty = function (value, trim) {
        return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
    }

    //设置uuid
    Activity.prototype.setUUID = function(){
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        var uuid = s.join("");
        return uuid;
    }

    //检查用户是否登录
    Activity.prototype.isLogin = function(success , fail){

        var that  = this;
        var token = localStorage.getItem("token");

        if(this.isEmpty(token)){
            fail.call(this);
        }else{
            $.ajax({
                url : __baseUrl + "api/activity/ahs/common/login/checkLogin",
                type: "post",
                data: {
                  "methodName": "checkLogin",
                  "timestamp": Date.parse(new Date()),
                  "version": "2.0",
                  "token": "",
                  "sign": "",
                  "channelCode": "",
                  "clientType": "mobile",
                  "data": '{"token": "'+token+'"}'
                },
                dataType:"json"
            }).done(function(data){
                if(data.code == 0){
                    data.body.valid == true ? "function" == typeof success && success.call(that) : "function" == typeof fail && fail.call(that);
                }else{
                    fail.call(that);
                }
            }).fail(function(data){
                that.showBox('系统抛锚啦~~~');
            })
        }
    }

    //用户登录
    Activity.prototype.confirmLogin = function(success , fail){
        this.getCode();
        var data = '{"mobile":"' + $('.phone').val() + '","verifyCode":"' + $(".yzm").val() + '","source":"activity","client":"mobile","type":"popup","activityCode":"'+this.option.code+'"}';
        var that = this;
        $.ajax({
            url:__baseUrl + "api/activity/ahs/common/login/userLogin",
            type:"post",
            data:{
                "methodName": "userLogin",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "mobile",
                "data": data
            }
        }).done(function(data){
            if(data.code == 0){
                that.showBox("登录成功");
                localStorage.setItem("token",data.body.token);
                $('.pop').css("display","none");
                that.option.smsClicked = 1;
                $(".phone-yzm").html('获取验证码');
                clearInterval(that.option.timer);
                $("#overlay").remove();
                $(".yzm").html("");
                $(".picture").html("");

                "function" == typeof success && success.call(that,data);
            }else{
                typeof fail && fail.call(that,data);
            }
        }).fail(function(data){
            that.showBox('系统抛锚啦~~~'); 
        })
    }

    Activity.prototype.count = function(){
        this.option.sec--;
        if(this.option.sec < 10) {
            this.option.sec = '0' + this.option.sec;
        }
        $('.phone-yzm').html(this.option.sec + '秒后重发');
        if(this.option.sec == 0) {
            clearInterval(this.option.timer);
            $('.phone-yzm').html('获取验证码');
            $('.phone-yzm').removeClass("phone-yzm-gray");
            this.option.sec = 120;
            this.option.smsClicked = 1;
        }
    }

    //获取手机验证码
    Activity.prototype.getCode = function(){
        var phoneReg = /1[3,4,5,7,8]\d{9}/;
        var that = this;
        if ($(".phone").val() == '') {
          this.showBox("请输入手机号");
          return;
        }
        if (!phoneReg.test($('.phone').val())) {
          this.showBox("手机号不正确");
          return;
        }
        if (!this.option.smsClicked) {
          return;
        }
        this.option.smsClicked = 0;
        this.option.getSmsButton = $("#yzm_label");//$(this);
         
        this.imgLogin(function(data){
            if(data.code == 0){
                this.option.getSmsButton.text('120秒后重发');
                this.option.getSmsButton.css({"background":"#999","color":"#000"});
                this.option.timer = setInterval(function(){
                    that.count();
                }, 1000);
            }else {
                clearInterval(this.option.timer);
                this.option.smsClicked = 1;
                if(data.body.certCode==true){
                    $(".sec_bor").css("display","block");
                    $("#overlay").click(function(){
                        $(this).css("display","none");
                        $(".pop").css("display","none");
                    });
                    this.pictureYzm();
                }else{
                    this.showBox(data.msg);
                }
            }
        });
    }

    //获取图片验证码
    Activity.prototype.pictureYzm = function(){
        var uuid = this.setUUID();
        this.option.currentId.length = 0;
        this.option.currentId.push(uuid);
        $("img#portrait").attr("src", __baseUrl + "api/activity/ahs/common/login/getCertCode?uuid=" + this.option.currentId[0]);
    }

    //带有图片验证码方式获取手机验证码  code=-1   body.certCode=true显示获取图形验证码
    Activity.prototype.imgLogin = function(callback) {
        var data = '{"mobile":"' + $('.phone').val() + '","certCode":"' + $("#certCode").val() + '","singleCode":"'+this.option.currentId[0]+'"}';
        var that = this;
        $.ajax({
          url : __baseUrl + "api/activity/ahs/common/login/sendVerifyCode",
          type:'post',
          data:{
              "methodName": "sendVerifyCode",
              "timestamp": Date.parse(new Date()),
              "version": "2.0",
              "token": "",
              "sign": "",
              "channelCode": "",
              "clientType": "mobile",
              "data": data
          },
          dataType:"json"
        }).done(function(data){
            callback.call(that , data);
        }).fail(function(data){
            that.showBox('系统抛锚啦~~~');
        })
    }

    //获取抽奖
    Activity.prototype.getPrize = function(option,callback){
          var triggerCode = option.trigger; //触发时机 立即领取:quick_receive 下单:generate_order 完单:complete_order 微信关注：wechat_follow 微信绑定：wechat_bind
          var triggerAction = option.action; //触发动作 发券:send_coupons  抽奖:luck_draw 加次:add_count
          var source = this.urlParams().utm_source;
          var medium = this.urlParams().utm_medium;
          var campaign = this.urlParams().utm_campaign;
          var sendType = 'pages';
          var activityCode = option.code;
          var rangeNum = option.range || 0;
          var token = localStorage.getItem("token");   
          var data = '{"token":"'+token+'","activityCode":"'+activityCode+'","rangeNum":"'+rangeNum+'","triggerCode":"'+triggerCode+'","source":"'+source+'","medium":"'+medium+'","campaign":"'+campaign+'","sendType":"'+sendType+'"}'; 
          var that = this;

          $.ajax({
              url:__baseUrl + "api/activity/common/newReceiveCoupon",
              type:"post",
              data:{
                  "methodName": "newReceiveCoupon",
                  "timestamp": Date.parse(new Date()),
                  "version": "1.0",
                  "token":"",
                  "sign": "",
                  "channelCode": "",
                  "clientType": "mobile",
                  "data": data
              },
              dataType:"json"
          }).done(function(data){
              callback.call(that , data);
          }).fail(function(data){
              that.showBox('系统抛锚啦~~~');
          })          
    }

    //获取抽奖次数
    Activity.prototype.getNumber = function(callback){
        var data = '{"token":"'+localStorage.getItem('token')+'","activityCode":"'+this.option.code+'"}'; 
        var that = this;
        $.ajax({
            url : __baseUrl + '/api/activity/common/querySurplus',
            type:"post",
            data:{
                "methodName": "querySurplus",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "mobile",
                "data": data
            },
            dataType:"json"
        }).done(function(data){
            callback.call(that , data);
        }).fail(function(data){
           that.showBox('系统抛锚啦~~~');
        })
    }

    //获取中奖信息
    Activity.prototype.winRecords = function(callback){
        var data = '{"activityCode":"'+this.option.code+'"}';
        var that = this;
        $.ajax({
            url : __baseUrl+'/api/activity/common/queryPrizeCodeAll',
            type:"post",
            data:{
              "methodName": "queryPrizeCodeAll",
              "timestamp": Date.parse(new Date()),
              "version": "2.0",
              "token": "",
              "sign": "",
              "channelCode": "",
              "clientType": "mobile",
              "data": data
            },
            dataType:"json"
        }).done(function(data){
            callback.call(that , data);
        }).fail(function(data){
            that.showBox('系统抛锚啦~~~');
        })  
    }

    //个人中奖情况 待优化
    Activity.prototype.singleRecords = function(callback){
        var that = this;
        var data ='{"token":"'+localStorage.getItem('token')+'","activityCode":"'+this.option.code+'"}';
        $.ajax({
            url:__baseUrl + '/api/activity/common/queryPrizeCode',
            type:"post",
            data: {
                "methodName": "queryPrizeCode",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "mobile",
                "data": data
            },
            dataType:"json"
        }).done(function(data){
            "function" == typeof callback  && callback.call(that , data);
        })  
    }

    //移动端画布绘制转盘
    Activity.prototype.drawRouletteWheel = function(callback){
        var turnplate={
            restaraunts:this.option.reward || [],       //大转盘奖品名称
            colors:this.option.color || [],          //大转盘奖品区块对应背景颜色
            outsideRadius:192,      //大转盘外圆的半径
            textRadius:155,       //大转盘奖品位置距离圆心的距离
            insideRadius:68,      //大转盘内圆的半径
            startAngle:0,       //开始角度       
        };
        var canvas = document.getElementById("canvas");    
        if (canvas.getContext) {
          //根据奖品个数计算圆周角度
          var arc = Math.PI / (turnplate.restaraunts.length/2);
          var ctx = canvas.getContext("2d");
          //在给定矩形内清空一个矩形
          ctx.clearRect(0,0,422,422);
          //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
          ctx.strokeStyle = "#FFBE04";
          //font 属性设置或返回画布上文本内容的当前字体属性
          ctx.font = '16px Microsoft YaHei';      
          for(var i = 0; i < turnplate.restaraunts.length; i++) {       
            var angle = turnplate.startAngle + i * arc;
            ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
            ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
            ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();  
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();   
            
            //----绘制奖品开始----
            ctx.fillStyle = "#E5302F";
            var text = turnplate.restaraunts[i];
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
            
            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            
            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            // if(text.indexOf("M")>0){//流量包
            //   var texts = text.split("M");
            //   for(var j = 0; j<texts.length; j++){
            //     ctx.font = j == 0?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
            //     if(j == 0){
            //       ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
            //     }else{
            //       ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
            //     }
            //   }
            // }else if(text.indexOf("M") == -1 && text.length>6){//奖品名称长度超过一定范围 
            //   text = text.substring(0,6)+"||"+text.substring(6);
            //   var texts = text.split("||");
            //   for(var j = 0; j<texts.length; j++){
            //     ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
            //   }
            // }else{
            //   //在画布上绘制填色的文本。文本的默认颜色是黑色
            //   //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            //   ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            // }
            
            //添加对应图标
            // if(text.indexOf("闪币")>0){
            //   var img= document.getElementById("shan-img");
            //   img.onload=function(){  
            //     ctx.drawImage(img,-15,10);      
            //   }; 
            //   ctx.drawImage(img,-15,10);  
            // }else if(text.indexOf("谢谢参与")>=0){
            //   var img= document.getElementById("sorry-img");
            //   img.onload=function(){  
            //     ctx.drawImage(img,-15,10);      
            //   };  
            //   ctx.drawImage(img,-15,10);  
            // }

            // html部分
            // <img src="images/1.png" id="shan-img" style="display:none;" /> //不能省略
            // <img src="images/2.png" id="sorry-img" style="display:none;" /> //不能省略
            // <div class="banner">
            //   <div class="turnplate" style="background-image:url(images/turnplate-bg.png);background-size:100% 100%;">
            //     <canvas class="item" id="canvas" width="422px" height="422px"></canvas>
            //     <img class="pointer" src="images/turnplate-pointer.png"/>
            //   </div>
            // </div>
            //上面注释部分可以写在下面的回调函数内
            callback.call(this , ctx);

            //把当前画布返回（调整）到上一个save()状态之前 
            ctx.restore();
            //----绘制奖品结束----
          }     
        } 
    }

    
    //旋转转盘 item:奖品位置; reward：奖品名称;
    Activity.prototype.rotateFn = function (item, reward , callback){
      var angles = item * (360 / this.option.reward.length) - (360 / (this.option.reward.length*2));
      if(angles<270){
        angles = 270 - angles; 
      }else{
        angles = 360 - angles + 270;
      }

      callback.call(this , angles , reward);
      //下面的逻辑可以写到回调函数里，需要jquery.route.js旋转插件支持
      // $('#canvas').stopRotate();
      // $('#canvas').rotate({
      //   angle:0,
      //   animateTo:angles+1800,
      //   duration:8000,
      //   callback:function (){
      //     alert(reward);
      //     that.option.bRotate = !that.option.bRotate;
      //   }
      // });
    };

    //初始化绑定点击统计，注意每个页面实例化一个活动，否则点击统计时无法判断是哪个
    //点击元素上增加data-track-event='{"name":"","page":"","event":""}'
    Activity.prototype.trackEvent = function(){
        var that = this;
        $(document).on("click" , "[data-track-event]" , function(){
            var data = $(this).data('trackEvent');
            "object" == typeof _paq && _paq.push(['trackEvent', data.name || that.option.activityName, data.page || that.option.pageName, data.event]);
        })
    };


    window.Activity = Activity;

    //使用方法
    // var activity1 = new Activity({
    //     name:"回收节", //活动名称，也是锚点名称
    //     page:"回收节首页", //活动页面
    //     code:'ACT_101_RECYCLE', //活动编码
    //     coupons:[], //发券奖品
    //     reward:["50M免费流量包", "10闪币", "谢谢参与", "5闪币", "10M免费流量包", "20M免费流量包", "20闪币 ", "30M免费流量包", "100M免费流量包", "2闪币"], //转盘抽奖的奖品
    //     color:["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF","#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF","#FFF4D6", "#FFFFFF"] //转盘抽奖奖品对应的颜色
    // })

})(jQuery);