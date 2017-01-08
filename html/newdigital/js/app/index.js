define(["jquery", "activity" , "jquery.preload" ,"jquery.lazyload" , "baidu.map"],function($){

    var region = [{
            id : 1,
            city : "上海",
        },{
            id : 31,
            city : "北京",
        },{
            id : 55,
            city : "成都",
        },{
            id : 77,
            city : "东莞",
        },{
            id : 96,
            city : "福州",
        },{
            id : 97,
            city : "佛山",
        },{
            id : 103,
            city : "广州",
        },{
            id : 114,
            city : "杭州",
        },{
            id : 218,
            city : "南京",
        },{
            id : 219,
            city : "宁波",
        },{
            id : 256,
            city : "深圳",
        },{
            id : 257,
            city : "苏州",
        },{
            id : 286,
            city : "天津",
        },{
            id : 305,
            city : "无锡",
        }
    ];


    function setCity(result){
        var cityName = result.name;
        var cityId = null;
        for (var i = 0 , len = region.length; i < len; i++) {
            cityId = cityName.indexOf(region[i].city) > -1 ? region[i].id : null;
            if(cityId){
                break;
            }
        }
        $(".section-4 a").on('click' , function(){
            var href = $(this).data('href')+'?r='+cityId || 1;
            window.location.href = href;
        })
    }
    

    $(function(){

        var activity = new Activity({
            name:"digital" //数码服务站，活动名称
        })
        
        var $this, src;

        $('img').each(function(){
            $this = $(this);
            src = $this.data('src');
            $this.attr('src', src);

            $this.preload(function(){
                $(this).show();
            });
        });

        //延迟加载商品图片
        $("img.h5-img-lazy-load").each(function() {
                var e = $(this);
                e.hasClass("layzed") || (e.addClass("layzed"), 
                e.hasClass("lazy-hide") && e.removeClass("lazy-hide"),
                e.removeClass("h5-img-lazy-load"), e.lazyload({
                    // placeholder : "image/loading.gif",
                    threshold: 200,
                    effect: "fadeIn"
                }))
                $(".section-2").show();
                $(".desc").show();
        })

        $(".spinner").remove();//移除加载动画

        //首页
        $(".content a").on('mouseover' , function(){
            var href = $(this).data('href');
            $(".content img").removeClass('innerScale');
            $(this).find('img').addClass('innerScale');
            setTimeout(function(){
                window.location.href = href;
            } , 200);
        })

        //标记活动说明
        $("a.description").on('click' , function(){
            localStorage.setItem('page' , $(this).data('page'));
        })

        //根据城市选择门店
        var city = new BMap.LocalCity();
        city.get(setCity);
    })
});