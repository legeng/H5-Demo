$(function(){
	//选项卡
	$('.tabLeft li').on('click',function(){
		$(this).addClass('typeActive').siblings().removeClass('typeActive');
		$('.tabRight li').eq($(this).index()).show().siblings().hide()		
	})
	//判断是否为微信
	function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
             $(".move_back").hide();
             $('.btn01').hide();
        }else{
             $(".move_back").show();
             $('.btn').hide();
        }
    }
    is_weixin();
    //
	$('.left').on('click',function(){
		$('.blackZhe').css('display','block');
		$('body,html').css({'heihgt':'100%','overflow':'hidden'})
	})
	$('.blackZhe').on('click',function(){
		$(this).css('display','none');
		$('body,html').css({'heihgt':'100%','overflow':'auto'})
	})
	$('.right').on('click',function(){
		window.location='http://m.aihuishou.com/shouji?utm_source=adv&utm_medium=M&utm_campaign=ACT_825_JJYJ&piwik_kwd=ACT_825_JJYJ&act=bg&act_activityCode=ACT_825_JJYJ'
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
})
