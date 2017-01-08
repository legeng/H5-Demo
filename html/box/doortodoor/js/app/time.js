define(['jquery','mui.min','mui.picker','mui.poppicker'],function($){
		var timerData = [];
		function setDay() {
			timerData.length = 0;
	        for (var i = 0; i < 7; i++) {
	        		var d=new Date();
	        		var day=i;
	        		var time =d.getHours();
	        		if(time>=21){
	        			day=day+1;
	        		}
	            var dayStr = getDay(day);
	            var data = {value: dayStr,text: dayStr,children: getTime(i)};
//	            console.log(data);
	        		timerData.push(data);
	        }
	    }
		setDay();
		getTime(0);
		function getTime(index){
			var timeArray = ["9:00~11:00","11:00~13:00","13:00~15:00","15:00~17:00","17:00~19:00","19:00~21:00"];
			var chlidArray = [];
			var d=new Date();
			if(index==0){
				var time =d.getHours();
//				console.log(time);
				var flag = 0;
				if( (time==11) || (time>11&time<13) ){
					flag = 1;
				}else if( (time==13) || (time >13 &time<15) ){
					flag = 2;
				}else if( (time==15) || (time>15&time<17) ){
					flag = 3;
				}else if( (time==17) || (time>17&time<19) ){
					flag = 4;
				}else if( (time==19) || (time>19&time<21) ){
					flag = 5;
				}else{
					flag = 0
				}
				for(var j = flag ; j < timeArray.length;j++){
					chlidArray.push({value:timeArray[j],text:timeArray[j]});
				}
			}else{
				for(var i = 0;i<timeArray.length;i++){
					chlidArray.push({value:timeArray[i],text:timeArray[i]});
				}
			}
			return chlidArray;
		}

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
	        return m + "-" + d1 + " " + day + "";
	    }
			(function($, doc) {
				
					//级联示例
					var timerPicker = new $.PopPicker({
						layer: 2
					});
					timerPicker.setData(timerData);
					var showCityPickerButton = doc.getElementById('showTimerPicker');
					var timerResult = doc.getElementById('showTimerPicker');
					showCityPickerButton.addEventListener('tap', function(event) {
						timerPicker.show(function(items) {
							timerResult.value = items[0].text + " " + items[1].text;
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
			})(mui, document);	
})