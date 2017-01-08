define(['jquery','dropload','demo','lazyload','url'],function($,d,demo,lazy,_){	
	$(function(){
	    // 页数
	    var page = 0;
	    // 每页展示10个
	    var size = 10;	
	    // dropload
	    $('#goods').dropload({
	        scrollArea : window,
	        loadDownFn : function(me){
	            page++;
	            // 拼接HTML
	            var result = '';
	            $.ajax({
	                type: 'GET',
	                url:_.url+'api/mall/goods/queryList?page='+page+'&pageSize='+size,
	                dataType: 'json',
	                success: function(data){
	                	   console.log(data)
	                	   if(data.code==0){
	                	   		if(data.data.success==true){
	                	   			var arrLen=data.data.goodsList.length;
	                	   			if(arrLen>0){
			                        for(var i=0; i<arrLen; i++){
			                            result +=
			                           // data.data.goodsList[i]
										'<li class="list-item" goodsId="'+data.data.goodsList[i].goodsId+'">'
											+'<img class="goodslazy'+page+'" data-original="images/success.png"/>'
											+'<p class="list-item-msg">'
												+'<span class="ware-name">'+data.data.goodsList[i].goodsName+'</span>'
												+'<span class="ware-msg">'+data.data.goodsList[i].description+'</span>'
												+'<span class="ware-price">'
													+'<i>'+data.data.goodsList[i].pointsPrice+'回收币</i>'
													+'<i>原价￥'+parseInt(data.data.goodsList[i].marketPrice)/100+'</i>'
												+'</span>'
											+'</p>'
										+'</li>'	;
			                        }
	                	   			}else{
	                	   			    // 锁定
	                        			me.lock();
	                       		    // 无数据
	                                 me.noData();	 
	                	   			}
			                    setTimeout(function(){
								     // 插入数据到页面，放到最后面
			                        $('.goods-list').append(result);	
								    //懒加载
									$("img.goodslazy"+page).lazyload({  
										effect: "fadeIn",
										//placeholder : "images/init.png",
										//event: 'click'
										threshold: 200
									});	
									// 每次数据插入，必须重置
								    me.resetload();
			                    },500);
	                	   		}else{
	                	   			demo.showAlert(data.data.message)
	                	   		}
	                	   }else{
	                	   		demo.showAlert(data.msg)
	                	   }
	                }
	            });
	        }
	    });
	    //跳转商品详情页面
	    $('.goods-list').delegate('li','click',function(){
	    		window.location='../goodsdetails/index.html?goodsId='+$(this).attr('goodsId')
	    })
	});
	    
})