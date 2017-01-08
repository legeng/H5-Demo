define(['jquery','common'] , function($ , c){

	//获取抽奖
	var getPrize = function(code,range,callback){
	        var rewardInfo = null;//奖品信息
	        var triggerCode="quick_receive";
	        var source=c.urlParams().utm_source;
	        var medium=c.urlParams().utm_medium;
	        var campaign=c.urlParams().utm_campaign;
	        var sendType='pages';
	        var activityCode = code;
	        var rangeNum =range || 0;
	        var tokenOutRed = localStorage.getItem("token");   
	        var data='{"token":"'+tokenOutRed+'","activityCode":"'+activityCode+'","rangeNum":"'+rangeNum+'","triggerCode":"'+triggerCode+'","source":"'+source+'","medium":"'+medium+'","campaign":"'+campaign+'","sendType":"'+sendType+'"}'; 
	        $.post(c.__baseUrl + "api/activity/common/newReceiveCoupon", {
	          	"methodName": "newReceiveCoupon",
	          	"timestamp": Date.parse(new Date()),
	          	"version": "1.0",
	          	"token":"",
	          	"sign": "",
	          	"channelCode": "",
	          	"clientType": "mobile",
	          	"data": data
	        }).success(function (data) {
	          	callback(data);
	        }).error(function(){
	          	c.showAlert('系统出错了!');
	        });             
		}

	//获取抽奖次数
    var getTimes = function(){
    	var token=localStorage.getItem('token');
    	var activityCode='ACT_101_RECYCLE';
    	var data='{"token":"'+token+'","activityCode":"ACT_101_RECYCLE"}';
    	$.post(c.__baseUrl + '/api/activity/common/querySurplus', {
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
    			$('#time-num').html(data.body.surplus);
    		}else{

    		}
    	});    
    }

    //获取中奖信息
    var allRecords = function(){
        var dataAll='{"activityCode":"ACT_101_RECYCLE"}'
        $.post(c.__baseUrl+'/api/activity/common/queryPrizeCodeAll', {
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
                      $('.win-item ul').append("<li><p><span>"+c.plusXing(data.body[i].userMobile,3,4)+"</span><span>"+data.body[i].getCodetime+"</span><span>"+data.body[i].codeName+"</span></p></li>");
                    }
                }else{
               
                }
            });    
    }
    var singleRecords = function(){
        var tokenSingle=localStorage.getItem('token');
        var activityCodeSingle=['ACT_102_RECYCLE' , 'ACT_103_RECYCLE' , 'ACT_104_RECYCLE'];
        for (var i = 0; i < 3; i++) {
            var dataSingle='{"token":"'+tokenSingle+'","activityCode":"'+activityCodeSingle[i]+'"}';

            (function(i){
                $.post(c.__baseUrl+'/api/activity/common/queryPrizeCode', {
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
                         $('[data-code="'+activityCodeSingle[i]+'"]').attr('src' , $('[data-code="'+activityCodeSingle[i]+'"]').data('original'));
                      }
                    }
                });
            })(i) 
        }   
    }


    return $(function(){
    	getTimes();
    	allRecords();
        singleRecords();
    	setInterval(function(){
        	allRecords();
    	} , 300000);
    }),{
    	getPrize:getPrize,
    	getTimes:getTimes,
    	allRecords:allRecords,
        singleRecords:singleRecords
    }   
})