/**
 * Created by computeradd on 2016/4/17.
 */
$(function () {
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
    //显示隐藏事件
    $(".list-title").each(function (index, elem) {
        var that = index;
        $(elem).on("click", function () {
            $(".w-border ul").eq(that).slideToggle("slow")
        });
    });

    var pId, cId, rId, price;
    var pInfo, cInfo, rInfo;
    var allColorSelected = "<div class=\"color-yellow\"></div>选择颜色<div class=\"select-info\">全颜色</div>";
    var allColorUnSelect = "<div class=\"color-gray\"></div>选择颜色";
    var allColorItem = "<li data-cid=\"0\" class=\"active\" onclick=\"_paq.push(['trackEvent', 'yanse_tab', '颜色', '全颜色']);\">全颜色</li>";

    var modelSlideDown = false;

    //选择后添加样式
    $(".r-list li").each(function (index, elem) {
    	 
        var that = index;
        $(elem).on("click", function () {
        	 $('.xinghao').html('');
        	 $('.grayYell').removeClass('color-yellow');
        	 $('.oneFooterLeftSpan').html('0')
            $(".r-list li").eq(that).removeClass().addClass("active").siblings().removeClass("active");
            pInfo = $(".r-list li").eq(that).html();
            $(".c-list li").remove();
            $(".c-list div").remove();
            //SE不支持换电池
            if(that==0){
            		for(i=0;i<14;i++){
         			$("#model-list li").eq(i).css("display", "none");
         		}
            		for(i=0;i<6;i++){
            			$("#model-list li").eq(i).css("display", "block");
            		}
            }else{
           		 for(i=0;i<14;i++){
         			$("#model-list li").eq(i).css("display", "none");
         		}
            		for(i=6;i<14;i++){
            			$("#model-list li").eq(i).css("display", "block");
            		}
            }
            //根据二级选中机型，展开颜色
            var selModel = $(".select-list li.active");
            setTimeout(function () {
              $(".r-list").slideUp();
              $(".select-list").slideDown();
//              if (selModel.length == 0) {
//                  $(".select-list").slideDown();
//              }else{
//                  var modelStyle = $(".select-list").css("display");
//                  selModel.click();
//                  if(modelStyle == "block"){
//                      $(".select-list").slideDown();
//                  }
//              }
                $(".a").html("<div class=\"color-yellow\"></div>选择机型<div class=\"select-info\">" + pInfo + "</div>");
            }, 50);
        });
    });
 var indexBegin=0;
 var priceNumber=''
 var typeIndex=''
    $(".select-list li").each(function (index, elem) {
    		 	
        var that = index;
        $(elem).on("click", function () {
        	$('.grayYell').addClass('color-yellow');
        		
       		indexBegin=1;
        		rInfo = $(".select-list li").eq(that).html();
        		pinPai=rInfo;
            $('.xinghao').html(rInfo)
            $(".first").css("background","#fcdb00");
            $(".select-list li").eq(that).removeClass().addClass("active").siblings().removeClass("active");
       		var demoIndex=$(this).attr('data-modelid');
           if(demoIndex==1){
           		$('.oneFooterLeftSpan').html('1500');
           		priceNumber=1500;
           		typeIndex='iphone';
           }
           if(demoIndex==2){
           		$('.oneFooterLeftSpan').html('1900');
           		priceNumber=1900;
           		typeIndex='iphone';
           }
           if(demoIndex==3){
           		$('.oneFooterLeftSpan').html('2900');
           		priceNumber=2900;
           		typeIndex='iphone';
           }
           if(demoIndex==4){
           		$('.oneFooterLeftSpan').html('3400');
           		priceNumber=3400;
           		typeIndex='iphone';
           }
           if(demoIndex==5){
           		$('.oneFooterLeftSpan').html('4300');
           		priceNumber=4300;
           		typeIndex='iphone';
           }
           if(demoIndex==6){
           		$('.oneFooterLeftSpan').html('4800');
           		priceNumber=4800;
           		typeIndex='iphone';
           }
           if(demoIndex==7){
           		$('.oneFooterLeftSpan').html('2000');
           		priceNumber=2000;
           		typeIndex='samsung';
           }
           if(demoIndex==8){
           		$('.oneFooterLeftSpan').html('1800');
           		priceNumber=1800;
           		typeIndex='samsung';
           }
           if(demoIndex==9){
           		$('.oneFooterLeftSpan').html('3400');
           		priceNumber=3400;
           		typeIndex='samsung';
           }
           if(demoIndex==10){
           		$('.oneFooterLeftSpan').html('2400');
           		priceNumber=2400;
           		typeIndex='samsung';
           }
           if(demoIndex==11){
           		$('.oneFooterLeftSpan').html('2600');
           		priceNumber=2600;
           		typeIndex='samsung';
           }
           if(demoIndex==12){
           		$('.oneFooterLeftSpan').html('2800');
           		priceNumber=2800;
           		typeIndex=rInfo;
           }
           if(demoIndex==13){
           		$('.oneFooterLeftSpan').html('3300')
           		priceNumber=3300;
           		typeIndex='samsung';
           }
           if(demoIndex==14){
           		$('.oneFooterLeftSpan').html('4000');
           		priceNumber=4000;
           		typeIndex='samsung';
           }
            var parentUl = $(".c-list");
            $(".c-list li").remove();
            $(".c-list div").remove();          
            setTimeout(function () {
                $(".select-list").slideUp();
                $(".c-list").slideDown();
               
            }, 50);
            
        });
    });

    //提交前的校验
    $(".oneFooterRight").on("click", function () {
    		if(indexBegin==1){
    			if(document.getElementById("boxDemo").checked==true){
    				var urlPosition=location.search.substring(1)+'&priceNumber='+priceNumber+'&typeIndex='+typeIndex+'&pinPai='+pinPai+'';
    				window.location='second-confirm.html?'+urlPosition+''	
    			}
    			else{
    				showAlert('请勾选安全条款')
    			}
    			
    		}
    });

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
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
})






