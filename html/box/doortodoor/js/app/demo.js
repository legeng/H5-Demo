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
		function comeback(){
			self.location = document.referrer;
		}
		return {
			showAlert : showalert,
			comeBack : comeback
		}
});
