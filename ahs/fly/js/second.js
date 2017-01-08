var myurl='http://m.mk.aiweixiu.com';
var urlSpecial='http://mk.aiweixiu.com';
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
};
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
                'font-size':'0.65rem',
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem',
                'z-index':"320"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 2000);
 }
var lottery={
	index:3,	//当前转动到哪个位置
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:200,	//初始转动速度
	times:0,	//转动次数
	cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	init:function(id){
		if ($("#"+id).find(".lottery-unit").length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find('.lottery-unit-'+this.index+' p').addClass("active");
		};				
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find('.lottery-unit-'+index+' p').removeClass("active");
		index += 1;
		if (index>count-1) {
			index = 0;
		};
		$(lottery).find('.lottery-unit-'+index+' p').addClass("active");
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=index;
		return false;
	}
};
var demo;
function roll(){
	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
		clearTimeout(lottery.timer);
			$('.getPrize').css('display','block');
			if(demo==1){
				$('.myOwn').html('大疆无人机')
				$('.myOwnContent').css('background-image','url(images/prize1.png)');
			}else if(demo==0){
				$('.myOwn').html('小米电视')
				$('.myOwnContent').css('background-image','url(images/prize0.png)');
			}
			else if(demo==4){
				$('.myOwn').html('小米空气净化器')
				$('.myOwnContent').css('background-image','url(images/prize4.png)');
			}
			else if(demo==6){
				$('.myOwn').html('小米智能手环')
				$('.myOwnContent').css('background-image','url(images/prize6.png)');
			}
			else if(demo==2){
				$('.myOwn').html('小米移动电源')
				$('.myOwnContent').css('background-image','url(images/prize2.png)');
			}
			else if(demo==7){
				$('.myOwn').html('三十元回收增值券')
				$('.myOwnContent').css('background-image','url(images/prize3.png)');
			}
			else if(demo==3){
				$('.myOwn').html('二十元回收增值券')
				$('.myOwnContent').css('background-image','url(images/prize3.png)');
			}else if(demo==5){
				$('.myOwn').html('口袋优品五十元代金券')
				$('.myOwnContent').css('background-image','url(images/prize5.png)');
			};
		lottery.prize=-1;
		lottery.times=0;
		click=false;
	}else{
		if (lottery.times<lottery.cycle) {
			lottery.speed -= 10;
		}else if(lottery.times==lottery.cycle) {
			lottery.prize = demo;	//--	
		}else{
			if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if (lottery.speed<40) {
			lottery.speed=40;
		};
		
		lottery.timer = setTimeout(roll,lottery.speed);
	}
	return false;
}

var click=false;

window.onload=function(){
	lottery.init('lottery');
	$(".special_begin").click(function(){
		if (click) {
			return false;
		}else{
			if(myTimeDown==0){
				showAlert('抽奖次数已用尽')
				return
			}
			roll2();
			choujiang();//抽奖接口 
		}
	});
};

var myTimeDown;
//抽奖次数
	function getTimes(){
		var token=localStorage.getItem('token');
		var activityCode='ACT_814_FEIFAN';
		var data='{"token":"'+token+'","activityCode":"'+activityCode+'"}'
	    $.post(myurl+'/api/activity/common/querySurplus', {
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
            		myTimeDown=data.body.surplus;
  				$('.special_begin p span').html(data.body.surplus);
            }else{
           
            }
        });		
	}
getTimes();
//全部中奖记录 滚动播放
	function lunbo(){
		var demoIIII=parseInt($('.prizeContent li').height());
		$('.prizeContent li').height(demoIIII+'px');
		$('.prizeContent li span').height(demoIIII+'px');
		$('.prizeContent li span').css('line-height',demoIIII+'px');
		$('.messagePrize').height(demoIIII*5+'px');
		$('.prizeContent').height(demoIIII*$('.prizeContent').children().length)
		if($('.prizeContent').height()>$('.messagePrize').height()){
			var objHeight=demoIIII*$('.prizeContent').children().length;
			$(".prizeContent li").clone().prependTo(".prizeContent");
				setInterval(function(){
					if(objHeight<=-$('.prizeContent').position().top){
						$('.prizeContent').css('top','0')
					}else{
						$('.prizeContent').css('top',$('.prizeContent').position().top-1+'px')
					}
				
				},50)
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
		  var dataAll='{"activityCode":"ACT_814_FEIFAN"}'
	    $.post(myurl+'/api/activity/common/queryPrizeCodeAll', {
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
            			$('.prizeContent').append("<li><span>"+plusXing(data.body[i].userMobile,3,4)+"</span><span>"+data.body[i].getCodetime+"</span><span>"+data.body[i].codeName+"</span></li>")
            		}          		
  				lunbo();
            }else{
           
            }
        });		
	}
allRecords();
//查看我的中奖记录
$('.logs').on('click',function(){
	$('.myJilu').css('display','block')
})
$('.myJilu').on('click',function(){
	$(this).css('display','none')
});
//个人中奖记录
	function singleRecords(){
		var tokenSingle=localStorage.getItem('token');
		var activityCodeSingle='ACT_814_FEIFAN';
		var dataSingle='{"token":"'+tokenSingle+'","activityCode":"'+activityCodeSingle+'"}'
	    $.post(myurl+'/api/activity/common/queryPrizeCode', {
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
  				for(i=0;i<data.body.length;i++){
  					$('.sigleRecords').append("<p>"+data.body[i].codeName+"</p>")
  				}		
            }else{
           
            }
        });		
	}
singleRecords();

//九宫格抽奖
var timerTao;
function roll2(){
	timerTao=setInterval(function(){
		lottery.roll();
	},100)
}
function choujiang(){
		var trigger="ONCE_GET";
        var source=urlParams().utm_source;
        var medium=urlParams().utm_medium;
        var campaign=urlParams().utm_campaign;
        var sendType='pages';
        var activityCode = 'ACT_814_FEIFAN';
	    var rangeNum ='0';
        var tokenOutRed = localStorage.getItem("token");   
        var data='{"token":"'+tokenOutRed+'","activityCode":"'+activityCode+'","rangeNum":"'+rangeNum+'","trigger":"'+trigger+'","source":"'+source+'","medium":"'+medium+'","campaign":"'+campaign+'","sendType":"'+sendType+'"}'                 	
		$.post(urlSpecial+"/api/activity/common/receiveCoupon", {
			            "methodName": "receiveCoupon",
			            "timestamp": Date.parse(new Date()),
			            "version": "1.0",
			            "token":"",
			            "sign": "",
			            "channelCode": "",
			            "clientType": "mobile",
			            "data": data
		       }).success(function (data) {
		       			clearInterval(timerTao)
		       	   		if(data.code==0){  			
		       	   			if(data.body.rewardLevel=="一等奖"){
		       	   				demo=1
		       	   			}else if(data.body.rewardLevel=="二等奖"){
		       	   				demo=0
		       	   			}else if(data.body.rewardLevel=="三等奖"){
		       	   				demo=4
		       	   			}else if(data.body.rewardLevel=="四等奖"){
		       	   				demo=6
		       	   			}else if(data.body.rewardLevel=="五等奖"){
		       	   				demo=2
		       	   			}else if(data.body.rewardLevel=="六等奖"){
		       	   				demo=7
		       	   			}else if(data.body.rewardLevel=="七等奖"){
		       	   				demo=3
		       	   			}else if(data.body.rewardLevel=="八等奖"){
		       	   				demo=5
		       	   			}
		       	   			lottery.speed=200;
							roll();
							getTimes();
		       	   			singleRecords();
							click=true;
							return false;
		       	   		}else{
		       	   				showAlert(data.msg);	 
		       	   				click=false;
		       	   				$('.lottery-unit p').removeClass('active');
		       	   				$('.lottery-unit-7 p').addClass('active')
		       	   		}
		       	   })	
}

//奖品介绍
$('.introduction').on('click',function(){
	$('.introduce').css('display','block')
})
$('.introduce').on('click',function(){
	$(this).css('display','none')
});
//获奖弹窗
$('#getPrize').on('click',function(){
	$(this).css('display','none')
});

$('.btnHUI').on('click',function(){
	event.stopPropagation() ;
	if(urlParams().sendurl==1){
		window.location='http://m.aihuishou.com/?wanda=wanda';
	}else{
		window.location='http://m.aihuishou.com/shouji';
	}
	
})
$('.btnFEN').on('click',function(e){
	event.stopPropagation() ;
	$(this).parent().css('display','none');
	$('.flyShare').css('display','block')
})
$('.flyShare').on('click',function(){
	$(this).css('display','none')
})

//
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f18367c55fd7569d9000cd9986846577";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
//
$('.goHuishou').on('click',function(){
	if(urlParams().sendurl==1){
		window.location='http://m.aihuishou.com/?wanda=wanda';
	}else{
		window.location='http://m.aihuishou.com/shouji';
	}	
})




