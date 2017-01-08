//传分值
var sumAllData=localStorage.getItem('sumAll')
	$.post(getUrl()+"api/activity/ahs/common/getHusbandScore", {
			       "methodName": "getHusbandScore",
			        "timestamp": Date.parse(new Date()),
			        "version": "2.0",
			        "token":'',
			        "sign": "",
			        "channelCode": "",
			        "clientType": "mobile",
           		    "data": sumAllData
		}).success(function (data) {
		       	   				       	   
}) 
if(localStorage.getItem('husbandType')=='前任渣男'){
	$('.stepTbottom').css('background-image','url(images/b12-qianren.png)')
}else if(localStorage.getItem('husbandType')=='初恋男神'){
	$('.stepTbottom').css('background-image','url(images/b12-chulian.png)')
}else if(localStorage.getItem('husbandType')=='隔壁老王'){
	$('.stepTbottom').css('background-image','url(images/b12-laowang.png)')
}else{
	$('.stepTbottom').css('background-image','url(images/b12-zhengpai.png)')
}

$('.ContentO').html(localStorage.getItem('husbandType'))
$('.ContentT').html(sumAllData+"元")
$('.ContentR').html(parseInt((parseInt(sumAllData)/144000000)*100)+"%")
$('.stepTprice').children().eq(0).html(sumAllData)
//再来一次
$('.stepTmore').on('click',function(){
	    localStorage.removeItem('score1');
		localStorage.removeItem('score2');
		localStorage.removeItem('score3');
		localStorage.removeItem('score4');
		localStorage.removeItem('score5');
		localStorage.removeItem('score61');
		localStorage.removeItem('score62');
		localStorage.removeItem('score63');
		localStorage.removeItem('score64');
		localStorage.removeItem('score65');
		localStorage.removeItem('score66');
		localStorage.removeItem('score67');
		localStorage.removeItem('score71');
		localStorage.removeItem('score72');
		localStorage.removeItem('score73');
		localStorage.removeItem('score74');
		localStorage.removeItem('score75');
		localStorage.removeItem('score76');
		localStorage.removeItem('sumAll');
		localStorage.removeItem('husbandType');	
	window.location='recyleHusband.html?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
})

var indexNum=parseInt(sumAllData);
if(indexNum<=0){
	$('.stepTwordsParent div').eq(0).css('display','block')
}
if(indexNum>0&&indexNum<=50000000){
	$('.stepTwordsParent div').eq(1).css('display','block')
}
if(indexNum>50000000&&indexNum<=100000000){
	$('.stepTwordsParent div').eq(2).css('display','block')
}
if(indexNum>100000000){
	$('.stepTwordsParent div').eq(3).css('display','block')
}

//back健
$('.onlyBack').on('click',function(){
	window.location='two.html?act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND'
})

//引导
$('.stepTtop').on('click',function(){
	$('.yinDaoMeng').css('display','block')
	$('.yinDao').css('display','block')
})
$('.yinDaoMeng').on('click',function(){
	$(this).css('display','none');
	$('.yinDao').css('display','none')
})
$('.yinDao').on('click',function(){
	$(this).css('display','none');
	$('.yinDaoMeng').css('display','none')
})
//分享
//1人物
var renWu=localStorage.getItem('husbandType')
//2价值
var jiaZhi=indexNum;
//3打败
var daBai=parseInt((parseInt(sumAllData)/144000000)*100);
 getWX();

var title = "XX诚可贵，早卖价更高！快来测一测你的老公最高回收价是多少？";
var pyq = "http://m.mk.aihuishou.com/ahs/recyleHusband/recyleHusband.html?utm_source=weixin_pengyouquan&utm_medium=M&utm_campaign=recyleHusband&piwik_kwd=recyleHusband&act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND";
var py = "http://m.mk.aihuishou.com/ahs/recyleHusband/recyleHusband.html?utm_source=weixin_person&utm_medium=M&utm_campaign=recyleHusband&piwik_kwd=recyleHusband&act=bg&act_activityCode= ACT_708_RECYCLEHUSBAND";
var elseUrl = "http://m.mk.aihuishou.com/ahs/recyleHusband/recyleHusband.html";
var imgUrl = "http://m.mk.aiweixiu.com/ahs/recyleHusband/images/share.png";
		 
var desc1 = "我的"+renWu+"价值"+jiaZhi+"元，打败"+daBai+"%的好友，赶快回炉重造！";
var desc2 = "我的"+renWu+"价值"+jiaZhi+"元，打败"+daBai+"%的好友，调教空间很大！";
var desc3 = "我的"+renWu+"价值"+jiaZhi+"元，打败"+daBai+"%的好友，投资最赚钱！";
var desc4 = "我的"+renWu+"价值"+jiaZhi+"元，打败"+daBai+"%的好友，简直极品！";

if(indexNum<=0){
	share(desc1,elseUrl,imgUrl,title,pyq,py);
}
if(indexNum>0&&indexNum<=50000000){
	share(desc2,elseUrl,imgUrl,title,pyq,py);
}
if(indexNum>50000000&&indexNum<=100000000){
	share(desc3,elseUrl,imgUrl,title,pyq,py);
}
if(indexNum>100000000){
	share(desc4,elseUrl,imgUrl,title,pyq,py);
}






