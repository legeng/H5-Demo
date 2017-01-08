$(function(){
	function getMark(){
		var token='';
		var activityCode='ACT_814_FEIFAN';
		var dataJson='{"token":"'+token+'","activityCode":"'+activityCode+'"}'
	    $.post('http://m.mk.aiweixiu.com/api/activity/common/queryHeatDegree', {
            "methodName": "queryHeatDegree",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
  				$('.mark span').html(data.body.heatDegree);
            }else{
           		$('.mark span').html('1314');
            }
        });		
	}
	//更新点数
	getMark()
	setInterval(function(){
		getMark()
		
	},5000)
	
	














	
})
