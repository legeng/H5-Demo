	init();
     var catlog = 0;
     var sourceType = 0;
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
		  var params=urlParams();
	        if(params['fastorderkey'] != undefined){
	        		fastorderkey = params['fastorderkey'];
	        	    var dataJson = '{"key":' + fastorderkey +'}';
	        		$.get("http://bd.aihuishou.com/api/bd/58/getPrizeByKey",{
	        			"methodName": "getPrizeByKey",
		            "timestamp": Date.parse(new Date()),
		            "version": "2.0",
		            "token": "",
		            "sign": "",
		            "channelCode": "",
		            "clientType": "mobile",
		            "data": dataJson
	        		}).success(function(data){
	        			var dateBody = JSON.parse(data.body);
	        			var proName = dateBody.sku.name.split(" ")[0];
	        			sourceType = dateBody.idAgency;
	        			if(sourceType=='73'){
	        				$('.chuizi').css("display","block");
	        				$('.warn_bor').css("display","none");
	        			}else{
	        				$('.chuizi').css("display","none");
	        				$('.warn_bor').css("display","block");
	        			}
	        			var parNode = $(".cart_list ul");
	        			var chiNode = $("<li><span class='cart_name'>"+proName+"</span><span class='cart_price'>"+dateBody.price+"元</span></li>");
	        			parNode.append(chiNode);
	        			$(".count_price").html("&yen;"+dateBody.price);
	        			catlog = dateBody.sku.categoryId;
	        			$("#sjld").sjld(".shenfen",".chengshi",".quyu");
	        			
	        			//油烟机58、空气净化器59是在 北京、上海、深圳、杭州回收，其他区域不支持回收
	        			if(dateBody.sku.categoryId == 58||dateBody.sku.categoryId == 59){
	        				$(".shenfen li").each(function(i,e){
	        					if(($(e).html())!='上海'){
	        						$(this).unbind("click");
	        						$(this).css("background","#EFEFEF");
	        					}
	        				});
//	        				$(".shenfen li").eq(10).click(function(){
//		        				$(".chengshi li").each(function(index,elem){
//		        					if($(elem).html()!='深圳'){
//		        						$(this).unbind("click");
//		        						$(this).css("background","#EFEFEF");
//		        					}
//	        					});
//		        			});
	        			}
	        		});
	        }
      }