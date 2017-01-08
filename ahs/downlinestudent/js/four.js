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
$('.nickname').html(decodeURIComponent(urlParams().nickname))
var index=Math.floor(Math.random()*100+1);
if(urlParams().type==0){
	if(index>=1&&index<=21){
		$('.specialSlogan li').eq(0).show();
		$('.prizeWSJ').show();
	}else if(index>=22&&index<=42){
		$('.specialSlogan li').eq(3).show();
		$('.prizeFYJ').show();
	}else if(index>=43&&index<=57){
		$('.specialSlogan li').eq(1).show();
		$('.prizeEGT').show();
	}else if(index>=58&&index<=73){
		$('.specialSlogan li').eq(3).show();
		$('.prizeSFJ').show();
	}else if(index>=74&&index<=80){
		$('.specialSlogan li').eq(1).show();
		$('.prizeLT').show();
	}else if(index>=81&&index<=87){
		$('.specialSlogan li').eq(2).show();
		$('.prizeXJ').show();
	}else if(index>=88&&index<=94){
		$('.specialSlogan li').eq(0).show();
		$('.prizeDLS').show();
	}else{
		$('.specialSlogan li').eq(2).show();
		$('.prizePI').show();
	}
}else if(urlParams().type==1){
	if(index>=1&&index<=7){
		$('.specialSlogan li').eq(0).show();
		$('.prizeWSJ').show();
	}else if(index>=8&&index<=16){
		$('.specialSlogan li').eq(3).show();
		$('.prizeFYJ').show();
	}else if(index>=17&&index<=30){
		$('.specialSlogan li').eq(1).show();
		$('.prizeEGT').show();
	}else if(index>=31&&index<=45){
		$('.specialSlogan li').eq(3).show();
		$('.prizeSFJ').show();
	}else if(index>=46&&index<=58){
		$('.specialSlogan li').eq(1).show();
		$('.prizeLT').show();
	}else if(index>=59&&index<=77){
		$('.specialSlogan li').eq(2).show();
		$('.prizeXJ').show();
	}else if(index>=78&&index<=96){
		$('.specialSlogan li').eq(0).show();
		$('.prizeDLS').show();
	}else{
		$('.specialSlogan li').eq(2).show();
		$('.prizePI').show();
	}
}else{
	if(index>=1&&index<=13){
		$('.specialSlogan li').eq(0).show();
		$('.prizeWSJ').show();
	}else if(index>=14&&index<=26){
		$('.specialSlogan li').eq(3).show();
		$('.prizeFYJ').show();
	}else if(index>=27&&index<=39){
		$('.specialSlogan li').eq(1).show();
		$('.prizeEGT').show();
	}else if(index>=40&&index<=52){
		$('.specialSlogan li').eq(3).show();
		$('.prizeSFJ').show();
	}else if(index>=53&&index<=65){
		$('.specialSlogan li').eq(1).show();
		$('.prizeLT').show();
	}else if(index>=66&&index<=78){
		$('.specialSlogan li').eq(2).show();
		$('.prizeXJ').show();
	}else if(index>=79&&index<=91){
		$('.specialSlogan li').eq(0).show();
		$('.prizeDLS').show();
	}else{
		$('.specialSlogan li').eq(2).show();
		$('.prizePI').show();
	}
};



//button
$('.button').click(function(){
	$('.finalAlert').fadeIn();
});
$('.nextone').click(function(){
	window.location='../student.html';
})
$('.closebutton').click(function(){
	$(this).parent().parent().fadeOut()
})
