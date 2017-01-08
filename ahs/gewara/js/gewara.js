	
//绑定按钮事件
$(".buttonL").on("click",function(){
	$(".win_box").css("display","block")
	$(".win_pro").css("display","block")
})
$(".buttonR").on("click",function(){
	$(".win_box").css("display","block")
	$(".win_rule").css("display","block")
})
$(".win_box").on("click",function(){
	$(this).css("display","none")
	$(".win_pro").css("display","none")
	$(".win_rule").css("display","none")
})
$(".win_pro").on("click",function(){
	$(this).css("display","none")
	$(".win_box").css("display","none")
})
$(".win_rule").on("click",function(){
	$(this).css("display","none")
	$(".win_box").css("display","none")
})
//活动2蒙层点击
$(".know").bind("click",function(){
	$(".tenBox").css('display',"none")
	$(".ten").css("display","none")
})

//点击马上卖手机
$(".button_top").on("click",function(){
	$(".phone").css("display",'block')
	$(".phoneNum").css("display","block")
})

//蒙层点击消失
$(".phone").on("click",function(){
  $(this).css("display","none")
  $(".phoneNum").css("display","none")
})

 
 