$(function(){
	$('.list2,.list3,.list4,.list5').hide()
//你的修改需要单独处理喽
//针对修改设定三个参数
var index1=0;
var index2=0;
var index3=0;
//第一项 双选
	$('.list1 li').on('click',function(){
		$('.section1QXZ').hide();
		$('.section1XG').show();
		$(this).toggleClass("active");
		//
		$('.section1 li:nth-child(3) img').remove()
		$('.section1 li:nth-child(3)').append($('.list1 .active').children().clone(true));
		$('.section1 li:nth-child(3) img').css('margin','0 1.8rem');
		//已经选择的个数
		if($('.list1 .active').length>=2){
			$(this).parent().slideUp();
		};
		if($('.section2 li').eq(2).children().length==0){
			$('.list2').slideDown();
		}
	})
	$('.section1XG').click(function(){
		$('.list1').slideDown();
		$('.section1 li:nth-child(3) img').remove();
		$('.list1 li').removeClass('active');		
	})
//第二项点击
$('.list2 li').on('click',function(){
	$('.section2QXZ').hide();
	$('.section2XG').show();
	$('.list1').slideUp();
	$(this).addClass("active").siblings().removeClass('active');
	//
	$('.section2 li:nth-child(3) img').remove()
	$('.section2 li:nth-child(3)').append($('.list2 .active').children().clone(true));
	$('.section2 li:nth-child(3) img').css('margin','0 1.8rem');
	//
	$(this).parent().slideUp();
	if($('.section3 li').eq(2).children().length==0){
			$('.list3').slideDown();
	}
});
$('.section2XG').click(function(){
	$('.list2').slideDown();
})
//第三项点击	
$('.list3 li').on('click',function(){
	$('.section3QXZ').hide();
	$('.section3XG').show();
	$(this).addClass("active").siblings().removeClass('active');
	//
	$('.section3 li:nth-child(3) img').remove()
	$('.section3 li:nth-child(3)').append($('.list3 .active').children().clone(true));
	$('.section3 li:nth-child(3) img').css('margin','0 1.8rem');
	//
	$(this).parent().slideUp();
	$('.list4').slideDown();
	$('.list5').slideDown();
	
})	
$('.section3XG').click(function(){
	$('.list3').slideDown();
})
//第四项点击（特征 多选）
$('.list4 li').on('click',function(){
	$(this).toggleClass("active");
})	
//第五项点击（加分项目？ 多选）
$('.list5 li').on('click',function(){
	$(this).toggleClass("active");
})	

//传递选项	
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
//马上询价
$('.section6').on('click',function(){
	if($('.section1 li').eq(2).children().length==0){
		$('.section1XG').hide();
		$('.section1QXZ').show();
		return;
	}else if($('.section2 li').eq(2).children().length==0){
		$('.section2XG').hide();
		$('.section2QXZ').show();
		return;
	}else if($('.section3 li').eq(2).children().length==0){
		$('.section3XG').hide();
		$('.section3QXZ').show();
		return;
	}
	$('.anyAlert').fadeIn();
	$("html,body").css({"height": "100%","overflow":"hidden"});
	setTimeout(function(){
		window.location="four.html?nickname="+urlParams().nickname+"&type="+urlParams().type;
	},2000)		
})

//添加埋点
$('.main li').click(function(){
	_paq.push(['trackEvent', 'student', '回收舍友', '别拦我卖了Ta']);
})

	
	
	
	
	
	
	
})
