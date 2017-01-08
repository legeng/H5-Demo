$(function(){
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
  //老公类型
  	//urlParams().husband;
  	if(urlParams().husband==0){
		$('.header').css('background-image','url(images/title_03.png)');
		$('.bg .leixing').css('background-image','url(images/xx_34.png)')
	}else if(urlParams().husband==1){
		$('.header').css('background-image','url(images/title_07.png)');
		$('.bg .leixing').css('background-image','url(images/xx_38.png)')
	}else if(urlParams().husband==2){
		$('.header').css('background-image','url(images/title_10.png)');
		$('.bg .leixing').css('background-image','url(images/xx_41.png)');
	}else{
		$('.header').css('background-image','url(images/title_13.png)');
		$('.bg .leixing').css('background-image','url(images/xx_43.png)');
	}	
  //分数总和
	//urlParams().sumScore;
     if(urlParams().sumScore<=0){
     	$('.yituo').css('display','block')
     }else if(urlParams().sumScore>0&&urlParams().sumScore<=9){
     	$('.rose').css('display','block')
     }else if(urlParams().sumScore>=10&&urlParams().sumScore<=14){
     	$('.falali').css('display','block')
     }else if(urlParams().sumScore>=15&&urlParams().sumScore<=18){
     	$('.seaHouse').css('display','block')
     }else{
     	$('.road').css('display','block')
     };
   //占比填写图片 
  
   if(urlParams().sumScore>0){
   	    var indexDemo=parseInt(100*(urlParams().sumScore)/22);
  		//个位数字
  		if(indexDemo>0&&indexDemo<=9){
  			if(indexDemo==1){
  				$('.dabai img:first-child').attr('src','images/xx_03.png');
  			}else if(indexDemo==2){
  				$('.dabai img:first-child').attr('src','images/xx_05.png');
  			}else if(indexDemo==3){
  				$('.dabai img:first-child').attr('src','images/xx_07.png');
  			}else if(indexDemo==4){
  				$('.dabai img:first-child').attr('src','images/xx_09.png');
  			}else if(indexDemo==5){
  				$('.dabai img:first-child').attr('src','images/xx_11.png');
  			}else if(indexDemo==6){
  				$('.dabai img:first-child').attr('src','images/xx_13.png');
  			}else if(indexDemo==7){
  				$('.dabai img:first-child').attr('src','images/xx_15.png');
  			}else if(indexDemo==8){
  				$('.dabai img:first-child').attr('src','images/xx_17.png');
  			}else{
  				$('.dabai img:first-child').attr('src','images/xx_19.png');
  			}
  		}
  		//两位数字
  		if(indexDemo>10&&indexDemo<=99){
  			var shiwei=parseInt(indexDemo/10);	
  			console.log(shiwei)
  			if(shiwei==1){
  				$('.dabai img:first-child').attr('src','images/xx_03.png');
  			}else if(shiwei==2){
  				$('.dabai img:first-child').attr('src','images/xx_05.png');
  			}else if(shiwei==3){
  				$('.dabai img:first-child').attr('src','images/xx_07.png');
  			}else if(shiwei==4){
  				$('.dabai img:first-child').attr('src','images/xx_09.png');
  			}else if(shiwei==5){
  				$('.dabai img:first-child').attr('src','images/xx_11.png');
  			}else if(shiwei==6){
  				$('.dabai img:first-child').attr('src','images/xx_13.png');
  			}else if(shiwei==7){
  				$('.dabai img:first-child').attr('src','images/xx_15.png');
  			}else if(shiwei==8){
  				$('.dabai img:first-child').attr('src','images/xx_17.png');
  			}else{
  				$('.dabai img:first-child').attr('src','images/xx_19.png');
  			};
  			var gewei=indexDemo%10;
  			if(gewei==0){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_21.png');
  			}else if(gewei==1){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_03.png');
  			}
  			else if(gewei==2){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_05.png');
  			}
  			else if(gewei==3){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_07.png');
  			}
  			else if(gewei==4){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_09.png');
  			}
  			else if(gewei==5){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_11.png');
  			}
  			else if(gewei==6){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_13.png');
  			}
  			else if(gewei==7){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_15.png');
  			}
  			else if(gewei==8){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_17.png');
  			}
  			else if(gewei==9){
  				 $('.dabai img:nth-child(2)').attr('src','images/xx_19.png');
  			}
  		}	
  		//三位数字
  		if(indexDemo==100){
  			 $('.dabai img:nth-child(1)').attr('src','images/xx_03.png');
  	 		 $('.dabai img:nth-child(2)').attr('src','images/xx_21.png');
  	         $('.dabai img:nth-child(3)').attr('src','images/xx_21.png');
  		}

   }
//分享
$('.shareFriends').on('click',function(){
	$('.blackZhe').css('display','block')
});
$('.blackZhe').on('click',function(){
	$(this).css('display','none')
})
//下面按钮
$('.goIndex').on('click',function(){
	window.location='http://m.aihuishou.com/shouji?utm_campaign=husband'
})
//分享
	getWX();
    var title = "老公不给你买礼物？测测值多少，卖了他去凑呗！";
    var yourHusband;
    var desc;
    if(urlParams().husband==0){
    		yourHusband='小鲜肉';
    }else if(urlParams().husband==1){
    	    yourHusband='高富帅';
    }else if(urlParams().husband==2){
    	    yourHusband='大叔';
    }else{
    	    yourHusband='大赢家';
    }
    var bili=parseInt(100*(urlParams().sumScore)/22);
    if(urlParams().sumScore<=0){
    		desc='我的'+yourHusband+'就是一坨屎，被99%的人打败了，赶紧回炉重造！					'
   	}else if(urlParams().sumScore>0&&urlParams().sumScore<=9){
   		desc='坑啊，我的'+yourHusband+'就值一朵鲜花，打败了'+bili+'%的好友，需要调教！'
   	}else if(urlParams().sumScore>=10&&urlParams().sumScore<=14){
   		desc='兴奋！我的'+yourHusband+'竟然价值一辆法拉利，打败了'+bili+'%的人！根本停不下来！'
   	}else if(urlParams().sumScore>=15&&urlParams().sumScore<=18){
   		desc='幸福，我的'+yourHusband+'价值一套海景豪宅，打败了'+bili+'%的人，就此惬意人生。'
   	}else{
   		desc='WOW！我的'+yourHusband+'价值南京路一条街！打败了'+bili+'%的好友！'
   	}
	var pyq = "http://m.mk.aihuishou.com/ahs/husband/index.html?utm_source=weixin_pengyouquan&utm_medium=M&utm_campaign=ACT_806_recyclebin&piwik_kwd=ACT_806_recyclebin&act=bg&act_activityCode=ACT_806_recyclebin";
	var py =  "http://m.mk.aihuishou.com/ahs/husband/index.html?utm_source=weixin_person&utm_medium=M&utm_campaign=ACT_806_recyclebin&piwik_kwd=ACT_806_recyclebin&act=bg&act_activityCode=ACT_806_recyclebin";
	var elseUrl = "http://m.mk.aihuishou.com/ahs/husband/index.html";
	var imgUrl = "http://m.mk.aiweixiu.com/ahs/husband/images/share.png";
	share(desc,elseUrl,imgUrl,title,pyq,py);
	
	
	
	
	
	
	
	
		
	
})
