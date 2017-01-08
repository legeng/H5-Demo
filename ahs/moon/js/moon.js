$(function(){
	//swiper
var HEIGHT = $('body').height();
        $(window).resize(function() {
            $('.swiper-container').height(HEIGHT);
        });
//生成id
	 var dataId=function() {
	 	 var dateNow=new Date().getTime();
		 var s = [];
		 var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
		 for (var i = 0; i < 25; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 30), 1);
		 }
		  var uuid = s.join("");
		      return (dateNow+uuid);  
	  }	;
var id=dataId();
var mySwiper;
function swiperInit(){
		 mySwiper = new Swiper ('.swiper-container', {
		  	direction : 'vertical',
			effect : 'fade',
			fade: {
			  crossFade: false,
			},		  	
		  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper); //隐藏动画元素 
		    swiperAnimate(swiper); //初始化完成开始动画  
		  }, 
		  onSlideChangeEnd: function(swiper){ 
		    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		  },
		  onReachBeginning: function(swiper){
			    setTimeout(function(){
			    		$('.openLetter').fadeIn()
			    },3000) 
		    }
		  }) ;	
};
//加载图片
		      var imgs=$(".AloadingBox").find('img');
			  var allimg_count = imgs.length;
			  var img_count=0;
			  imgs.each(function() {
			    $(this).imagesLoaded(function() {
				  img_count++;
				  var precent = String(Math.floor((img_count / allimg_count) * 100))+'%';
				  $(".loadingBg").text(precent);
//				  console.log(precent);
				  if(precent == '100%'){
				  	 	$('.loadingBg').hide();
				  	 	$('.theWhole').show();
				  	 	swiperInit();
				  }
				})
			});
//-----------------
	$('.openLetter').on('click',function(){
		mySwiper.slideTo(1, 500, false);
		document.getElementById('readVideo').play();
	})
	$('.writeLetter').on('click',function(){
		mySwiper.slideTo(3, 500, false);
		document.getElementById('writeVideo').play();
	});
	$('.sendLetterEnd').on('click',function(){
		if($('.toWriteCon').val()==''){
			$('.points').fadeIn();
			setTimeout(function(){
				$('.points').fadeOut();
			},1500);
			return;
		}else{
			$('.toShare').fadeIn('slow');
			setTimeout(function(){
				$('.sharePenslo').fadeIn('slow');
			},500);
			setTimeout(function(){
				$('.redQuan').fadeIn('slow');
				$('.movePen').fadeIn('slow');
			},1500);			
		}
		
	});
	$('.toShare').on('click',function(){
		$(this).hide();
	})
	//返回已缓冲区域，TimeRanges 
//setInterval(function(){
//	console.log(document.getElementById('writeVideo').buffered)
//},1000)
var ua = navigator.userAgent.toLowerCase();
$('.readVideo').on('ended',function(){
	if(ua.match(/Android/i)=="android"){
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			$(this).parent().hide();
			mySwiper.slideTo(2, 1, false);   
		}else{
			mySwiper.slideTo(2, 1, false);
		}
	}else{
		mySwiper.slideTo(2, 1, false);
	}
	//mySwiper.slideTo(2, 1, false);
	setTimeout(function(){
		$('.ComeNames span:first-child').fadeIn('slow');
	},500)	
	setTimeout(function(){
		$('.ComeNames span:last-child').fadeIn('slow');
	},1000)	
	setTimeout(function(){
		$('.conmeletterContent').fadeIn('slow');
	},1500);
	setTimeout(function(){
		$('.comeTheName').fadeIn('slow');
	},1800);	
	setTimeout(function(){
		$('.writeLetter').fadeIn('slow');
	},2000);
	//
//	$('.ComeNames span:first-child').addClass('animated fadeIn');
//	$('.ComeNames span:last-child').addClass('animated fadeIn');
//	$('.conmeletterContent').addClass('animated fadeIn');

	
});
$('.writeVideo').on('ended',function(){
	if(ua.match(/Android/i)=="android"){
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			$(this).parent().hide();
			mySwiper.slideTo(4, 300, false);   
		}else{
			mySwiper.slideTo(4, 300, false);
		}
	}else{
		mySwiper.slideTo(4, 300, false);
	}
	//mySwiper.slideTo(4, 300, false);
	setTimeout(function(){
		$('.recipient').fadeIn('slow');
	},500)
	setTimeout(function(){
		$('.toWriteCon').fadeIn('slow');
	},1000)	
	setTimeout(function(){
		$('.letterFrom').fadeIn('slow');
	},1500)
	setTimeout(function(){
		$('.sendLetterEnd').fadeIn('slow');
	},2000)	
});


//swiperInit()
//mySwiper.slideTo(2, 0, false);

//点击静音
var audioIndex=1;
$('.myaudio').on('click',function(){
		if(audioIndex==1){
			$(this).addClass('myaudio2');
			document.getElementById('myMusic').pause();
			audioIndex=0;
		}else{
			$(this).removeClass('myaudio2');
			document.getElementById('myMusic').play();
			audioIndex=1;
		}
});
	

//接口初始化
 var myurl='http://m.mk.aiweixiu.com';
 //var myurl='http://192.168.88.77:8080';
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
 function getLetter(id){
	  var data='{"id":"'+id+'"}'
	  $.post(myurl+'/api/activity/ahs/common/getLetter', {
            "methodName": "getLetter",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": data
        }).success(function (data) {
            if(data.code == 0){
            		if((data.body.content==''||data.body.content==null)||(data.body.toUser==''||data.body.toUser==null)){
            			
            		}else{
	  				$('.conmeletterContent').html(data.body.content);//信的内容
					$('.ComeNames span:last-child').html(data.body.toUser+" :");//来信人 		
					$('.comeTheName').html(data.body.fromUser);
            		}
            }else{
           
            }
        });	
};
if(urlParams().id==undefined||urlParams().id==0){
	
}else{
	getLetter(urlParams().id)
}

//
	  $('.toWriteCon').keyup(function(){
	  		//id=dataId();

	  });
var fromUser;
var toUser;
var content;
 function saveLetter(id,fromUser,toUser,content){
	  var data='{"id":"'+id+'","fromUser":"'+fromUser+'","toUser":"'+toUser+'","content":"'+content+'"}'
	  $.post(myurl+'/api/activity/ahs/common/saveLetter', {
            "methodName": "saveLetter",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "mobile",
            "data": data
        }).success(function (data) {
            if(data.code == 0){
				
            }else{
           
            }
        });	
};

  function getWX(){
        var dataJson = '{ "localUrl": "'+ window.location.href+'"}';
        $.post(getUrl() + "api/v2/common/sdk/generateConfig", {
            "methodName": "generateConfig",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        }).success(function (data) {
            wx.config({
                debug : data.body.debug,
                appId : data.body.appId,
                timestamp : data.body.timestamp,
                nonceStr :data.body.nonceStr,
                signature : data.body.signature,
                jsApiList : data.body.jsApiList
            });
        });
    }
	function share(etitle,elink,eimgUrl,edesc,quanurl,friendurl){
		wx.ready(function () {
        //分享朋友圈
        wx.onMenuShareTimeline({
            title: etitle,
            link: quanurl,
            imgUrl: eimgUrl,
            success: function (res) {
                //
                saveLetter(id,$('.letterFrom input').val(),$('.recipient input').val(),$('.toWriteCon').val());
                id=id+1;
				 getWX();
				 var title = "真的有些开不了口，写在这里你来看吧";
				 var desc = "也许是我太过害羞，有些话语说不出口。打开这封神秘信件，希望你能解我心意";
				 var pyq = "http://m.mk.aihuishou.com/ahs/moon/index.html?id="+id;
				 var py = "http://m.mk.aihuishou.com/ahs/moon/index.html?id="+id;
				 var elseUrl = "http://m.mk.aihuishou.com/ahs/moon/index.html";
				 var imgUrl = "http://m.mk.aiweixiu.com/ahs/moon/images/share.png";
				 share(title,elseUrl,imgUrl,desc,pyq,py);  
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: etitle,
            link: friendurl,
            imgUrl: eimgUrl,
            desc:edesc,
            success: function (res) {
                //
               saveLetter(id,$('.letterFrom input').val(),$('.recipient input').val(),$('.toWriteCon').val());
                id=id+1;
				 getWX();
				 var title = "真的有些开不了口，写在这里你来看吧";
				 var desc = "也许是我太过害羞，有些话语说不出口。打开这封神秘信件，希望你能解我心意";
				 var pyq = "http://m.mk.aihuishou.com/ahs/moon/index.html?id="+id;
				 var py = "http://m.mk.aihuishou.com/ahs/moon/index.html?id="+id;
				 var elseUrl = "http://m.mk.aihuishou.com/ahs/moon/index.html";
				 var imgUrl = "http://m.mk.aiweixiu.com/ahs/moon/images/share.png";
				 share(title,elseUrl,imgUrl,desc,pyq,py); 
            }
        });
        //分享到qq
        wx.onMenuShareQQ({
            title: etitle,
            link: elink,
            imgUrl: eimgUrl,
            desc: edesc
        });
        wx.onMenuShareQZone({
            title: etitle,
            link: elink,
            imgUrl: eimgUrl,
            desc: edesc,
            success: function (res) {
                
            },
            cancel: function (res) {
               
            }
        });
    });
}   

		 getWX();
		 var title = "真的有些开不了口，写在这里你来看吧";
		 var desc = "也许是我太过害羞，有些话语说不出口。打开这封神秘信件，希望你能解我心意";
		 var pyq = "http://m.mk.aihuishou.com/ahs/moon/index.html?id="+id;
		 var py = "http://m.mk.aihuishou.com/ahs/moon/index.html?id="+id;
		 var elseUrl = "http://m.mk.aihuishou.com/ahs/moon/index.html";
		 var imgUrl = "http://m.mk.aiweixiu.com/ahs/moon/images/share.png";
		 share(title,elseUrl,imgUrl,desc,pyq,py); 


//









})
