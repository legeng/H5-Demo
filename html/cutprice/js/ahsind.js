$(function(){if(localStorage.getItem("cutpricemobile")=="mobile"){return}else{$("html,body").css({"height":"100%","overflow":"hidden"});$("body").append('<div class="cutpriceDemo"><p class="cutpriceContent"><span class="cutclose"></span></p></div>');$(".cutpriceDemo").css({"width":"100%","height":"100%","position":"fixed","top":0,"left":0,"background-color":"rgba(0,0,0,0.5)","z-index":"9999"});$(".cutpriceContent").css({"width":"92.1%","height":"31.4%","background":"url(http://m.mk.aihuishou.com/ahs/cutprice/images/m.png) no-repeat","background-size":" 100% 100%","position":"absolute","left":"50%","margin-left":"-46.05%","top":"21%"});$(".cutclose").css({"width":"20px","height":"20px","position":"absolute","background":"url(http://m.mk.aihuishou.com/ahs/cutprice/images/m-close.png) no-repeat","background-size":"100% 100%","right":"9%","top":"-13%"});$(".cutpriceDemo").on("click",function(){$("html,body").css({"height":"auto","overflow":"auto"});localStorage.setItem("cutpricemobile","mobile");$(this).css("display","none")});$(".cutclose").on("click",function(e){if(e&&e.stopPropagation){e.stopPropagation()}else{window.event.cancelBubble=true;return false}$("html,body").css({"height":"auto","overflow":"auto"});localStorage.setItem("cutpricemobile","mobile");$(".cutpriceDemo").css("display","none")});$(".cutpriceContent").on("click",function(e){if(e&&e.stopPropagation){e.stopPropagation()}else{window.event.cancelBubble=true;return false}localStorage.setItem("cutpricemobile","mobile");var indexLocation=Math.floor(Math.random()*11);if(indexLocation>=1&&indexLocation<=2){window.location="http://m.mk.aihuishou.com/ahs/cutprice/cutprice20.html?utm_source=M_banner&utm_medium=M&utm_campaign=ACT_825_JJYJ&piwik_kwd=ACT_825_JJYJ&act=bg&act_activityCode=ACT_825_JJYJ"}else{window.location="http://m.mk.aihuishou.com/ahs/cutprice/cutprice.html?utm_source=M_banner&utm_medium=M&utm_campaign=ACT_825_JJYJ&piwik_kwd=ACT_825_JJYJ&act=bg&act_activityCode=ACT_825_JJYJ"}})}});