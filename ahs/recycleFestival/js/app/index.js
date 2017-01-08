define(["jquery" ,"common","login","jquery.rotate" ,"scroll"],function($ , c , r){
    
    var masterLDX = function() {
            var docHeight = $(document.body).height();
            $('body').append('<div id="overlay"><span class="closeArrow"></span></div>');
            $('#overlay').height(docHeight)
            .css({
                'display': 'block',
                'opacity': .95,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background': '#000000 url(images/master.png) no-repeat center',
                'width': '100%',
                'height': '100%',
                'z-index':500
            });
        };


    $(function(){

        //中奖名单滚动
        setTimeout(function(){
            $("div.win-item").myScroll();
        },1000)

        $(".layer").click(function(){
            window.open($(this).data("href"));
        })

        $(".close-alert").click(function(){
            $("#overlay").css("display","none");
            $(".pop").css("display","none");
            $(this).parent().parent().hide(); 
        });

        $(".rt_img").on("click",function(){
            masterLDX();
            $('#overlay').on("click",function(){
                $(this).remove();
            });
            $(".close").click(function(){
                $('#overlay').trigger("click");
            })
        });
    })
});