$(document).ready(function(){
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
};
function ifloaded(url){
		var img=new Image();
		img.src=url;
		if(img.complete){
			$('.end_nickname').html(decodeURIComponent(urlParams().nickname));
		};
		img.onload=function(){
			$('.end_nickname').html(decodeURIComponent(urlParams().nickname));
		}	
}
//------------------
function makeImg(type){
	var name=decodeURIComponent(urlParams().nickname);
	var datademo='{"imgName":"'+type+'","nickName":"'+name+'"}'
    $.post('http://m.mk.aihuishou.com/api/activity/ahs/student/getImgUrl', {
            "methodName": "subscribe",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": datademo
        }).success(function (data) {
 			$('#this_img').attr('src',data.body);
 			$('#zytadd').attr('src',data.body);
        });
};
//--------------------------
var index=urlParams().index;
if(urlParams().type==0){
	if(index>=1&&index<=21){
		//wsj
		makeImg('weishengjin');
		$('.ahs_content .type_07').show();	
		ifloaded('../images/end/wsj.png');
	}else if(index>=22&&index<=42){
		//fyj
		makeImg('fuyanjie');
		$('.ahs_content .type_03').show();
		ifloaded('../images/end/fyj.png');
	}else if(index>=43&&index<=57){
		//egt
		makeImg('erguotou');
		$('.ahs_content .type_02').show();
		ifloaded('../images/end/egt.png');
	}else if(index>=58&&index<=73){
		//sfj
		makeImg('feizao');
		$('.ahs_content .type_06').show();
		ifloaded('../images/end/sfj.png');
	}else if(index>=74&&index<=80){
		//lt
		makeImg('latiao');
		$('.ahs_content .type_04').show();
		ifloaded('../images/end/lt.png');
	}else if(index>=81&&index<=87){
		//xj
		makeImg('xiangjiao');
		$('.ahs_content .type_08').show();
		ifloaded('../images/end/xj.png');
	}else if(index>=88&&index<=94){
		//dls
		makeImg('anquantao');
		$('.ahs_content .type_01').show();
		ifloaded('../images/end/dls.png');
	}else{
		//pi
		makeImg('pi');
		$('.ahs_content .type_05').show();
		ifloaded('../images/end/pi.png');
	}
	setTimeout(function(){
		$('.end_nickname').html(decodeURIComponent(urlParams().nickname));
	},5000)
}else if(urlParams().type==1){
	if(index>=1&&index<=7){
		//wsj
		makeImg('weishengjin');
		$('.ahs_content .type_07').show();
		ifloaded('../images/end/wsj.png');
	}else if(index>=8&&index<=16){
		//fyj
		makeImg('fuyanjie');
		$('.ahs_content .type_03').show();
		ifloaded('../images/end/fyj.png');
	}else if(index>=17&&index<=30){
		//egt
		makeImg('erguotou');
		$('.ahs_content .type_02').show();
		ifloaded('../images/end/egt.png');
	}else if(index>=31&&index<=45){
		//sfj
		makeImg('feizao');
		$('.ahs_content .type_06').show();
		ifloaded('../images/end/sfj.png');
	}else if(index>=46&&index<=58){
		//lt
		makeImg('latiao');
		$('.ahs_content .type_04').show();
		ifloaded('../images/end/lt.png');
	}else if(index>=59&&index<=77){
		//xj
		makeImg('xiangjiao');
		$('.ahs_content .type_08').show();
		ifloaded('../images/end/xj.png');
	}else if(index>=78&&index<=96){
		//dls
		makeImg('anquantao');
		$('.ahs_content .type_01').show();
		ifloaded('../images/end/dls.png');
	}else{
		//pi
		makeImg('pi');
		$('.ahs_content .type_05').show();
		ifloaded('../images/end/pi.png');
	}
	setTimeout(function(){
		$('.end_nickname').html(decodeURIComponent(urlParams().nickname));
	},5000)
}else{
	if(index>=1&&index<=13){
		//wsj
		makeImg('weishengjin');
		$('.ahs_content .type_07').show();
		ifloaded('../images/end/wsj.png');
	}else if(index>=14&&index<=26){
		//fyj
		makeImg('fuyanjie');
		$('.ahs_content .type_03').show();
		ifloaded('../images/end/fyj.png');
	}else if(index>=27&&index<=39){
		//egt
		makeImg('erguotou');
		$('.ahs_content .type_02').show();
		ifloaded('../images/end/egt.png');
	}else if(index>=40&&index<=52){
		//sfj
		makeImg('feizao');
		$('.ahs_content .type_06').show();
		ifloaded('../images/end/sfj.png');
	}else if(index>=53&&index<=65){
		//lt
		makeImg('latiao');
		$('.ahs_content .type_04').show();
		ifloaded('../images/end/lt.png');
	}else if(index>=66&&index<=78){
		//xj
		makeImg('xiangjiao');
		$('.ahs_content .type_08').show();
		ifloaded('../images/end/xj.png');
	}else if(index>=79&&index<=91){
		//dls
		makeImg('anquantao');
		$('.ahs_content .type_01').show();
		ifloaded('../images/end/dls.png');
	}else{
		//pi
		makeImg('pi');
		$('.ahs_content .type_05').show();
		ifloaded('../images/end/pi.png');
	}
	setTimeout(function(){
		$('.end_nickname').html(decodeURIComponent(urlParams().nickname));
	},5000)
};

//close
$('.final_close').click(function(){
	$(this).parent().parent().parent().hide()
});
//跳转
$('.button2').click(function(){
	window.location='http://m.aihuishou.com/shouji?utm_source=wx&utm_medium=sheyou&utm_campaign=tw'
})
$('.button1').click(function(){
	$('.final_alert').show();
	$('.final_alert').css('opacity','0')
	$('body,html').append('<div class="three_seconds"><p>已确认回收！没得反悔！</p><p>分享图片后可到爱回收全国200家门店</p><p>领取“手机关怀服务”一份！</p><p>时间：即日起到11月20号 </p><span>3</span></div>');
	var thistimer=setInterval(function(){
		$('.three_seconds span').html(parseInt($('.three_seconds span').html())-1);
	},1000);
	setTimeout(function(){
		clearInterval(thistimer)
		$('.three_seconds').remove();
//		$('.final_alert').show();
		$('.final_alert').css('opacity','1')
	},3000);	
});	
//门店
$('.final_alert .final_btn .right').click(function(){
	window.location='http://m.aihuishou.com/shop'
});
//再玩一次
$('.final_alert .final_btn .left').click(function(){
	window.location='../student.html'
})























		






//------------------
});