$(function(){
	function loadImage(url){
		var img=new Image();
		img.src=url;
		if(img.complete){
			//
			$('.section1').show();
			$('.section1').addClass('animated zoomInDown');
			setTimeout(function(){
				$('.section2_1').show();
				$('.section2_1').addClass('animated zoomIn');
			},1000)
			setTimeout(function(){
				$('.section2_2').show();
				$('.section2_2').addClass('animated zoomIn');
			},1300)
			setTimeout(function(){
				$('.section2_3').show();
				$('.section2_3').addClass('animated zoomIn');
			},1500)
			setTimeout(function(){
				$('.section2_4').show();
				$('.section2_4').addClass('animated zoomIn');
			},1700)
			setTimeout(function(){
				$('.section2_5').show();
				$('.section2_5').addClass('animated zoomIn');
			},1900)
			setTimeout(function(){
				$('.section2_6').show();
				$('.section2_6').addClass('animated zoomIn');
			},2100)
			setTimeout(function(){
				$('.section2_7').show();
				$('.section2_7').addClass('animated zoomIn');
			},2300)
			setTimeout(function(){
				$('.section2_8').show();
				$('.section2_8').addClass('animated zoomIn');
			},2500)
			setTimeout(function(){
				$('.section2_9').show();
				$('.section2_9').addClass('animated zoomIn');
			},2700)
			setTimeout(function(){
				$('.section2_10').show();
				$('.section2_10').addClass('animated zoomIn');
			},2900)	;
			setTimeout(function(){
				$('.section3').fadeIn();
				$('.section3').addClass('innerScale');
			},3100)
			return;
		}
		img.onload=function(){
			//slogan
			$('.section1').show();
				$('.section1').addClass('animated zoomInDown');
			setTimeout(function(){
				$('.section2_1').show();
				$('.section2_1').addClass('animated zoomIn');
			},1000)
			setTimeout(function(){
				$('.section2_2').show();
				$('.section2_2').addClass('animated zoomIn');
			},1300)
			setTimeout(function(){
				$('.section2_3').show();
				$('.section2_3').addClass('animated zoomIn');
			},1500)
			setTimeout(function(){
				$('.section2_4').show();
				$('.section2_4').addClass('animated zoomIn');
			},1700)
			setTimeout(function(){
				$('.section2_5').show();
				$('.section2_5').addClass('animated zoomIn');
			},1900)
			setTimeout(function(){
				$('.section2_6').show();
				$('.section2_6').addClass('animated zoomIn');
			},2100)
			setTimeout(function(){
				$('.section2_7').show();
				$('.section2_7').addClass('animated zoomIn');
			},2300)
			setTimeout(function(){
				$('.section2_8').show();
				$('.section2_8').addClass('animated zoomIn');
			},2500)
			setTimeout(function(){
				$('.section2_9').show();
				$('.section2_9').addClass('animated zoomIn');
			},2700)
			setTimeout(function(){
				$('.section2_10').show();
				$('.section2_10').addClass('animated zoomIn');
			},2900)
			setTimeout(function(){
				$('.section3').fadeIn();
				$('.section3').addClass('innerScale');
			},3100)
			
		}
	};
	loadImage('images/demo1/page1bj.png');
	//跳转第二页
	$('.section3').click(function(){
		window.location='pages/two.html'
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
