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
//step1
localStorage.setItem('husbandType','正牌老公')
$('.stepOneBrands li').on('click',function(){
	localStorage.setItem("husbandType",$(this).html());
	$(this).addClass('activeBrand').siblings().removeClass('activeBrand')
})
$('.stepOneCon li').on('click',function(){
	var score1Index=$(this).index();
	if(score1Index==0){
		localStorage.setItem("score1",'10000000')
	}else if(score1Index==1){
		localStorage.setItem("score1",'20000000')
	}else if(score1Index==2){
		localStorage.setItem("score1",'25000000')
	}else{
		localStorage.setItem("score1",'10000000')
	}
	window.location="two.html?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND"
})
    









