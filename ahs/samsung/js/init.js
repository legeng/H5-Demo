var testUrl=location.search.substring(1);

$.get("http://m.mk.test.aiweixiu.com/api/activity/sam/checkSamParam?"+testUrl+"", function(data){
      if(data.code==-1){
      		window.location='error.html'
      }else{
      	
      }
  }); 













