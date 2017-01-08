$(function(){
	var typeHusband=0;
	$('.btn1').addClass('active')
	$(".bg div").on('click',function(){
		typeHusband=$(this).index()
		$(this).children().addClass('active');
		$(this).siblings().children().removeClass('active')
	})
	$('.next').on('click',function(){
		window.location='three.html?typeHusband='+typeHusband;
		console.log(typeHusband)
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
