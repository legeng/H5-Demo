define(["jquery", "activity"],function($){

    $(function(){

        var activity = new Activity({
            name:"百度糯米" ,//百度糯米，活动名称
            code:"ACT_1115_NUOMI"
        })

        $("#receive").on('click' , function(){
            var range = $(this).data('range');
            localStorage.setItem('priceRange' , Math.min.apply(null , range));
            activity.isLogin(function(){
                activity.getPrize({
                    trigger:"quick_receive",
                    action:"send_coupons",
                    range:localStorage.getItem('priceRange')
                  } , function(data){
                    if(data.code == '0'){
                        this.showBox('A码领取成功'); //data.msg = 'OK'
                    }else{
                        this.showBox(data.msg);
                    }      
                });
            } , function(){
                  //获取图片验证码  
                  this.pictureYzm();
                  this.layer();
                  $(".pop").show();
                  $("#overlay").click(function(){
                      $(this).hide();
                      $(".pop").hide();
                  });
            })
        })

        //获取图片验证码
        $("#portrait").on('click' , function(){
            activity.pictureYzm();
        })

        //获取验证码
        $("#yzm_label").on('click' , function(){
            activity.getCode();
        })

        //登录
        $("#login").on('click' , function(){
            activity.confirmLogin(function(data){
                  //抽奖或者领券
                  activity.getPrize({
                    trigger:"quick_receive",
                    action:"send_coupons",
                    range:localStorage.getItem('priceRange')
                  } , function(data){
                        if(data.code == '0'){
                          this.showBox('A码领取成功'); //data.msg = 'OK'
                        }else{
                          this.showBox(data.msg);
                        }
                  });
            } , function(data){
                this.showBox(data.msg);
            })
        })

        //关闭登录框
        $(".close").on('click' , function(){
            $('.pop').hide();
            $("#overlay").remove();
        })
    })
});