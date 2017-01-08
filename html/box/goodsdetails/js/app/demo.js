define(['jquery'],function($){
		//封装默认弹窗
		function showalert(msg){
			$('body').append("<div id='alert_demo'>"+msg+"</div>");
			$('#alert_demo').css({
				'position':'fixed',
				'width': '200px',
				'word-wrap':'break-word',
				'postion':'fixed',
				'top':'25%',
				'font-size':'14px',
				'color':'#F8E71C',
				'line-height':'20px',
				'background-color':'#000000',
				'text-align':'center',
				'padding':'15px 0',
				'left':'50%',
				'margin-left':'-100px'	
			});
			setTimeout(function(){
				$('#alert_demo').remove()
			},1000)
		};
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
		}		
		return {
			showAlert : showalert,
			urlParams: urlParams
		}
});
