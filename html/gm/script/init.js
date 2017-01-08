init();
	var catlog = 0;
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
	        //2187440102917196463
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
		            "clientType": "PC",
		            "data": dataJson
	        		}).success(function(data){
	        			var proName = JSON.parse(data.body).sku.name.split(" ")[0];
	        			var sourceType = JSON.parse(data.body).idAgency;
	        			if(sourceType=='73'){
	        				$('.shoukuan').css("display","block");
	        				$('#wx_title').css("display","none");
	        			}else{
	        				$('.shoukuan').css("display","none");
	        				$('#wx_title').css("display","block");
	        			}
	        			var parNode = $(".cart-list tbody");
	        			var chiNode = $("<tr><td>"+proName+"</td><td class='mark'>"+JSON.parse(data.body).price+"元</td></tr>");
	        			parNode.append(chiNode);
	        			$("#total_money").html("&yen;"+JSON.parse(data.body).price);
	        			catlog = JSON.parse(data.body).sku.categoryId;
	        			$("#sjld").sjld("#shenfen","#chengshi","#quyu","#riqi");
	        			if(catlog==55 && ($("#shenfen li").html()=='上海') ){
						$('#quyu li').each(function(i,elem){
							var index = i;
							if(index>10){
								$(elem).unbind("click");
								$(elem).css("background","#EFEFEF");
							}
						});
					}
	        			//油烟机58、空气净化器59是在 北京、上海、深圳、杭州回收，其他区域不支持回收
//	        			
	        			if(JSON.parse(data.body).sku.categoryId == 58||JSON.parse(data.body).sku.categoryId == 59){
	        				$("#shenfen li").each(function(i,e){
	        					if(($(e).html())!='上海'){
	        						$(this).unbind("click");
	        						$(this).css("background","#EFEFEF");
	        					}
	        				});
//	        				$("#shenfen li").eq(14).click(function(){
//		        				$("#chengshi li").each(function(index,elem){
//		        					if($(elem).html()=='杭州'){
//		        						$(this).unbind("click");
//		        						$(this).css("background","#EFEFEF");
//		        					}
//	        					});
//		        			});
//	        				$("#shenfen li").eq(10).click(function(){
//		        				$("#chengshi li").each(function(index,elem){
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