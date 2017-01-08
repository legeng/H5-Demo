$(function(){
	
	 var imgs=$('img');
	  var allimg_count = imgs.length;
	  var img_count=0;
	  imgs.each(function() {
	    $(this).imagesLoaded(function() {
		  img_count++;
		  var precent = String(Math.floor((img_count / allimg_count) * 100))+'%';
		  $(".load span").text(precent);
		  if(precent == '100%'){
		  	$(".load").css("display","none");
		  	$('html,body').css("height","auto");	  	
		  	$(".page").css("display","block");
		  }
		})
	});
		
});
