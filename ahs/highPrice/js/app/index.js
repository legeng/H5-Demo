define(["jquery" , "Backbone" , "underscore" , "common" , "jquery.preload" ,"jquery.lazyload"],function($ , b , _ , e){

    function n(e){

        var $model = b.Model.extend({
                defaults:{
                    goodList:[] 
                }
            }),
            $view = b.View.extend({
                el:$("#good-list-info"),
                template:_.template($("#good-list").html()),
                initialize : function() {
                    _.bindAll(this,"render"), this.listenTo(this.model , "change" , this.render)
                },
                render:function(){
                    return !0 ? this.$el.html(this.template(this.model.toJSON())) : this.$el.append(this.template(this.model.toJSON())) , this
                }

            });
        var m = new $model, 
        	v = new $view({
                    model:m
                });

        (function (e){
            m.set({
                goodList:e
            })
        })(e)
    }

    $(function(){
        n(e);
        //预先加载背景图片
        $('.header , .jiao , .good-image-icon').preload(function(){
            $(this).show();
        });
        //延迟加载商品图片
        $("img.h5-img-lazy-load").each(function() {
                var e = $(this);
                e.hasClass("layzed") || (e.addClass("layzed"), e.hasClass("lazy-hide") && e.removeClass("lazy-hide"), e.lazyload({
                    //placeholder : "image/loading.gif",
                    threshold: 200,
                    effect: "fadeIn"
                }))
        })
    })
});