function hah() {
        var args = new Object();
        var query = location.search.substring(1);//获取查询串
        var pairs = query.split("&priceNumber");//在逗号处断开
        return pairs[0];
 }
var testUrl=hah();
$.get("http://m.mk.test.aiweixiu.com/api/activity/sam/checkSamParam?"+testUrl+"", function(data){
      if(data.code==-1){
      		window.location='error.html'
      }else{
      	
      }
}); 












