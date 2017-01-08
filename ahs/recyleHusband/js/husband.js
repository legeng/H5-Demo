//判断是否为微信
	function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
             $(".move_back").hide()
        }else{
           $(".move_back").show();
        }
    }
    is_weixin();

//step2
if((localStorage.getItem('husbandType')=='')||(localStorage.getItem('husbandType')==null)){
	$('.headCont').html('正牌老公');
	localStorage.setItem('husbandType','正牌老公')
}else{
	$('.headCont').html(localStorage.getItem('husbandType'))
}
//初始化
$('.fanDown').hide();
$('.youDown').hide();
$('.yuDown').hide();
$('.fenDown').hide();
$('.kouDown').hide();
//1
$('.btnDemo1').on('click',function(){
	demoNum1=2;
	$('.gaoDown').fadeIn(300);
});
$('.btnDemo2').on('click',function(){
	demoNum2=2;
	$('.fanDown').fadeIn(300);
});
$('.btnDemo3').on('click',function(){
	demoNum3=2;
	$('.youDown').fadeIn(300);
});
$('.btnDemo4').on('click',function(){
	demoNum4=2;
	$('.yuDown').fadeIn(300);
});
 var demoNum1=1;
 var demoNum2=1;
 var demoNum3=1;
 var demoNum4=1;
$('.gaoDown li').on('click',function(){
	$('.btnDemo1').css('display','block')
	var score2Index=$(this).index();
	if(score2Index==0){
		localStorage.setItem("score2",'-2000000')
	}else if(score2Index==1){
		localStorage.setItem("score2",'5000000')
	}else if(score2Index==2){
		localStorage.setItem("score2",'3000000')
	}else{
		localStorage.setItem("score2",'-500000')
	}
	$(this).addClass('scoreBoreder').siblings().removeClass('scoreBoreder');
	$('.gaoUp li').eq(1).html($(this).html());
	$(this).parent().fadeOut(300);
	if(demoNum1==1){
		$('.scrollChild').animate( { width: "25%" }, "slow" );
		$('.scrollChildNum').html('25%');
		$('.fanDown').show();		
	}	
});

//2
$('.fanDown li').on('click',function(){
	$('.btnDemo2').css('display','block')
	var score3Index=$(this).index();
	if(score3Index==0){
		localStorage.setItem("score3",'-5000000')
	}else if(score3Index==1){
		localStorage.setItem("score3",'1000000')
	}else if(score3Index==2){
		localStorage.setItem("score3",'5000000')
	}else{
		localStorage.setItem("score3",'-1000000')
	}
	$(this).addClass('scoreBoreder').siblings().removeClass('scoreBoreder')
	$(this).parent().fadeOut(300);
	$('.fanUp li').eq(1).html($(this).html())	
	if(demoNum2==1){
		$('.scrollChild').animate( { width: "50%" }, "slow" );
		$('.scrollChildNum').html('50%')
		$('.youDown').show();
	}
})
//3
$('.youDown li').on('click',function(){
	$('.btnDemo3').css('display','block')
	var score4Index=$(this).index();
	if(score4Index==0){
		localStorage.setItem("score4",'3000000')
	}else if(score4Index==1){
		localStorage.setItem("score4",'1000000')
	}else if(score4Index==2){
		localStorage.setItem("score4",'-2000000')
	}else{
		localStorage.setItem("score4",'-10000000')
	}
	$(this).addClass('scoreBoreder').siblings().removeClass('scoreBoreder')
	$(this).parent().fadeOut(300);
	$('.youUp li').eq(1).html($(this).html())
	if(demoNum3==1){
		$('.scrollChild').animate( { width: "75%" }, "slow" );
		$('.scrollChildNum').html('75%')
		$('.yuDown').show();
	}
})
//4
var xunJiaIndex=0;
$('.yuDown li').on('click',function(){
	$('.btnDemo4').css('display','block')
	//马上询价
	$('.stepTwoBottom').css('background-color','#fbd931');
	xunJiaIndex=1;
	var score5Index=$(this).index();
	if(score5Index==0){
		localStorage.setItem("score5",'2000000')
	}else if(score5Index==1){
		localStorage.setItem("score5",'-3000000')
	}else if(score5Index==2){
		localStorage.setItem("score5",'1000000')
	}else{
		localStorage.setItem("score5",'10000000')
	}
	$(this).addClass('scoreBoreder').siblings().removeClass('scoreBoreder')
	$(this).parent().fadeOut(300);
	$('.yuUp li').eq(1).html($(this).html())
	if(demoNum4==1){
		$('.scrollChild').animate( { width: "100%" }, "slow" );
		$('.scrollChildNum').html('100%')
		$('.fenDown').show();
		$('.kouDown').show();
	}
})
//5绝对优势加分项
var fen1=0;
var fen2=0;
var fen3=0;
var fen4=0;
var fen5=0;
var fen6=0;
var fen7=0;
$('.fen1').on('click',function(){
	if(fen1==0){
		$(this).addClass('scoreBoreder')
		fen1=1;
		localStorage.setItem("score61",'2000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen1=0;
		localStorage.removeItem("score61")
	}	
})
$('.fen2').on('click',function(){
	if(fen2==0){
		$(this).addClass('scoreBoreder')
		fen2=1;
		localStorage.setItem("score62",'2000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen2=0;
		localStorage.removeItem("score62")
	}	
})
$('.fen3').on('click',function(){
	if(fen3==0){
		$(this).addClass('scoreBoreder')
		fen3=1;
		localStorage.setItem("score63",'20000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen3=0;
		localStorage.removeItem("score63")
	}	
})
$('.fen4').on('click',function(){
	if(fen4==0){
		$(this).addClass('scoreBoreder')
		fen4=1;
		localStorage.setItem("score64",'2000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen4=0;
		localStorage.removeItem("score64")
	}	
})
$('.fen5').on('click',function(){
	if(fen5==0){
		$(this).addClass('scoreBoreder')
		fen5=1;
		localStorage.setItem("score65",'2000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen5=0;
		localStorage.removeItem("score65")
	}	
})
$('.fen6').on('click',function(){
	if(fen6==0){
		$(this).addClass('scoreBoreder')
		fen6=1;
		localStorage.setItem("score66",'50000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen6=0;
		localStorage.removeItem("score66")
	}	
})
$('.fen7').on('click',function(){
	if(fen7==0){
		$(this).addClass('scoreBoreder')
		fen7=1;
		localStorage.setItem("score67",'5000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen7=0;
		localStorage.removeItem("score67")
	}	
})
//6绝对优势加分项
var fen11=0;
var fen12=0;
var fen13=0;
var fen14=0;
var fen15=0;
var fen16=0;
$('.fen11').on('click',function(){
	if(fen11==0){
		$(this).addClass('scoreBoreder')
		fen11=1;
		localStorage.setItem("score71",'-2000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen11=0;
		localStorage.removeItem("score71")
	}	
})
$('.fen12').on('click',function(){
	if(fen12==0){
		$(this).addClass('scoreBoreder')
		fen12=1;
		localStorage.setItem("score72",'-5000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen12=0;
		localStorage.removeItem("score72")
	}	
})
$('.fen13').on('click',function(){
	if(fen13==0){
		$(this).addClass('scoreBoreder')
		fen13=1;
		localStorage.setItem("score73",'-1000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen13=0;
		localStorage.removeItem("score73")
	}	
})
$('.fen14').on('click',function(){
	if(fen14==0){
		$(this).addClass('scoreBoreder')
		fen14=1;
		localStorage.setItem("score74",'-2000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen14=0;
		localStorage.removeItem("score74")
	}	
})
$('.fen15').on('click',function(){
	if(fen15==0){
		$(this).addClass('scoreBoreder')
		fen15=1;
		localStorage.setItem("score75",'-8000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen15=0;
		localStorage.removeItem("score75")
	}	
})
$('.fen16').on('click',function(){
	if(fen16==0){
		$(this).addClass('scoreBoreder')
		fen16=1;
		localStorage.setItem("score76",'-3000000')
	}else{
		$(this).removeClass('scoreBoreder');
		fen16=0;
		localStorage.removeItem("score76")
	}	
})
//马上询价调借口
$('.stepTwoBottom').on('click',function(){
	if(xunJiaIndex==1){
		//可以点击
		var sum1=localStorage.getItem('score1');
		var sum2=localStorage.getItem('score2');
		var sum3=localStorage.getItem('score3');
		var sum4=localStorage.getItem('score4');
		var sum5=localStorage.getItem('score5');
		var sum61=localStorage.getItem('score61');
		var sum62=localStorage.getItem('score62');
		var sum63=localStorage.getItem('score63');
		var sum64=localStorage.getItem('score64');
		var sum65=localStorage.getItem('score65');
		var sum66=localStorage.getItem('score66');
		var sum67=localStorage.getItem('score67');
		var sum71=localStorage.getItem('score71');
		var sum72=localStorage.getItem('score72');
		var sum73=localStorage.getItem('score73');
		var sum74=localStorage.getItem('score74');
		var sum75=localStorage.getItem('score75');
		var sum76=localStorage.getItem('score76');
		var sumAll=Number(sum1)+Number(sum2)+Number(sum3)+Number(sum4)+Number(sum5)+Number(sum61)+Number(sum62)+Number(sum63)+Number(sum64)+Number(sum65)+Number(sum66)+Number(sum67)+Number(sum71)+Number(sum72)+Number(sum73)+Number(sum74)+Number(sum75)+Number(sum76);
		
		localStorage.setItem('sumAll',sumAll);
		window.location="three.html?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND  "
	}else{
		
	}
})


