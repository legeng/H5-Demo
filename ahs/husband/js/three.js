$(function(){
	function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '8rem',
                'height': '1.5rem',
                'z-index': 10,
                'font-size':'0.6rem',
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem',
                'z-index':"2000000"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
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
  function init(){
	$('.shengaoContent').hide();	
	$('.yanxingContent').hide();	
	$('.jiafenContent').hide();	
	$('.koufenContent').hide();
  	if(urlParams().typeHusband==0){
  		$('.header').css('background-image','url(images/xianrou.png)');
  	}else if(urlParams().typeHusband==1){
  		$('.header').css('background-image','url(images/gaofushuai.png)');
  	}else if(urlParams().typeHusband==2){
  		$('.header').css('background-image','url(images/dashu.png)');
  	}else{
  		$('.header').css('background-image','url(images/yingjia.png)')
  	}
  }
  init();
  var fen1=0;//颜值
  var fen2=0;//身高
  var fen3=0;//言行
  //颜值点击fen1
  $('.yanzhiContent div').on('click',function(){
  	if($(this).index()==0){
  		fen1=1;
  	};
  	if($(this).index()==1){
  		fen1=2;
  	};
  	if($(this).index()==2){
  		fen1=2;
  	};
  	if($(this).index()==3){
  		fen1=3;
  	}
  	$(this).css('background-image','url(images/button-1-select.png)').siblings().css('background-image','url(images/button-1.png)');
  	$('.yanzhiSelect').css('background-image',$(this).children().css('background-image'));
  	$(this).parent().slideUp();
  	if($('.shengaoSelect').css('background-image')=='none'){
  		$('.shengaoContent').slideDown();
  	}	
  })
//身高点击	
   $('.shengaoContent div').on('click',function(){
   	if($(this).index()==0){
  		fen2=-3;
  	};
  	if($(this).index()==1){
  		fen2=1;
  	};
  	if($(this).index()==2){
  		fen2=4;
  	};
  	if($(this).index()==3){
  		fen2=-1;
  	}
  	$(this).css('background-image','url(images/button-1-select.png)').siblings().css('background-image','url(images/button-1.png)');
  	$('.shengaoSelect').css('background-image',$(this).children().css('background-image'));
  	$(this).parent().slideUp();
  	if($('.yanxingSelect').css('background-image')=='none'){
  			$('.yanxingContent').slideDown();
  	} 
  })
//言行点击
   $('.yanxingContent div').on('click',function(){
  	fen3=2;
  	$(this).css('background-image','url(images/button-1-select.png)').siblings().css('background-image','url(images/button-1.png)');
  	$('.yanxingSelect').css('background-image',$(this).children().css('background-image'));
  	$(this).parent().slideUp();
  	$('.jiafenContent').slideDown();
  	$('.koufenContent').slideDown();
  	$('.footer').css('background-image','url(images/button-2-select.png)');
  })	
 //多选加分
 var fen41=0;
 var fen42=0;
 var fen43=0;
 var fen44=0;
 var fen45=0;
 var fen46=0;
 var fen47=0;
 var jia1=0;
 var jia2=0;
 var jia3=0;
 var jia4=0;
 var jia5=0;
 var jia6=0;
 var jia7=0;
 $('.jia1').on('click',function(){
 	if(jia1==0){
 	 	$(this).css('background-image','url(images/button-1-select.png)');
 	 	fen41=2;
 	 	jia1=1;
 	}else{
 		$(this).css('background-image','url(images/button-1.png)');
 	 	fen41=0;
 	 	jia1=0;
 	}	
 });
  $('.jia2').on('click',function(){
  	if(jia2==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
 		fen42=4;
 		jia2=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
 		fen42=0;
 		jia2=0;
  	}	
 })
 $('.jia3').on('click',function(){
 	if(jia3==0){
 		$(this).css('background-image','url(images/button-1-select.png)');
 		fen43=1;
 		jia3=1;
 	}else{
 		$(this).css('background-image','url(images/button-1.png)');
 		fen43=0;
 		jia3=0;
 	}	
 })
 $('.jia4').on('click',function(){
 	if(jia4==0){
 		$(this).css('background-image','url(images/button-1-select.png)');
 		fen44=1;
 		jia4=1;
 	}else{
 		$(this).css('background-image','url(images/button-1.png)');
 		fen44=0;
 		jia4=0;
 	}	
 })
 $('.jia5').on('click',function(){
 	if(jia5==0){
 		$(this).css('background-image','url(images/button-1-select.png)');
 		fen45=1;
 		jia5=1;
 	}else{
 		$(this).css('background-image','url(images/button-1.png)');
 		fen45=0;
 		jia5=0;
 	}
 })
 $('.jia6').on('click',function(){
 	if(jia6==0){
 		$(this).css('background-image','url(images/button-1-select.png)');
 	    fen46=2;
 	    jia6=1;
 	}else{
 		$(this).css('background-image','url(images/button-1.png)');
 	    fen46=0;
 	    jia6=0;
 	}
 })
  $('.jia7').on('click',function(){
  	if(jia7==0){
  	    $(this).css('background-image','url(images/button-1-select.png)');
 	 	fen47=2;
 	 	jia7=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
 	 	fen47=0;
 	 	jia7=0;
  	}
 })
var fen51=0;
var fen52=0;
var fen53=0;
var fen54=0;
var fen55=0;
var fen56=0;
var kou1=0;
var kou2=0;
var kou3=0;
var kou4=0;
var kou5=0;
var kou6=0;
//雷区扣分
  $('.kou1').on('click',function(){
  	if(kou1==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
  		fen51=-4;
  		kou1=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
  		fen51=0;
  		kou1=0;
  	} 	
  })		

  $('.kou2').on('click',function(){
  	if(kou2==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
  		fen52=-2;
  		kou2=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
  		fen52=0;
  		kou2=0;
  	} 	
  })	;
    $('.kou3').on('click',function(){
  	if(kou3==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
  		fen53=-1;
  		kou3=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
  		fen53=0;
  		kou3=0;
  	} 	
  })	;
    $('.kou4').on('click',function(){
  	if(kou4==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
  		fen54=-2;
  		kou4=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
  		fen54=0;
  		kou4=0;
  	} 	
  })	;
    $('.kou5').on('click',function(){
  	if(kou5==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
  		fen55=-4;
  		kou5=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
  		fen55=0;
  		kou5=0;
  	} 	
  })	;
    $('.kou6').on('click',function(){
  	if(kou6==0){
  		$(this).css('background-image','url(images/button-1-select.png)');
  		fen56=-2;
  		kou6=1;
  	}else{
  		$(this).css('background-image','url(images/button-1.png)');
  		fen56=0;
  		kou6=0;
  	} 	
  })	
	
 //slideToggle
//1.yanzhiTittle
$('.yanzhiTittle').on('click',function(){
	$('.yanzhiContent').slideToggle();
});
$('.shengaoTittle').on('click',function(){
	$('.shengaoContent').slideToggle();
})
$('.yanxingTittle').on('click',function(){
	$('.yanxingContent').slideToggle();
})
$('.jiafenTittle').on('click',function(){
	$('.jiafenContent').slideToggle();
})
$('.koufenTittle').on('click',function(){
	$('.koufenContent').slideToggle();
})	

//马上询价
$('.footer').on('click',function(){
  if($('.yanzhiSelect').css('background-image')=='none'){
  		showAlert("颜值测评还没有选哟！")
  		return;
  }	
  if($('.shengaoSelect').css('background-image')=='none'){
  		showAlert("身高尺寸还没有选哟！");
  		return;
  }	
  if($('.yanxingSelect').css('background-image')=='none'){
  		showAlert("言行举止还没有选哟！");
  		return;
  }	
  var sumScore=fen1+fen2+fen3+fen41+fen42+fen43+fen44+fen45+fen46+fen47+fen51+fen52+fen53+fen54+fen55+fen56;
  var husband=urlParams().typeHusband;
  //showAlert("分数"+sumScore);
  window.location='end.html?husband='+husband+'&sumScore='+sumScore+''
  
})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
