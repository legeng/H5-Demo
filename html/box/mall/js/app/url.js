define(['jquery'],function($){
 //检查是生产环境还是测试环境
    var __isProduction = (function(){
        return location.hostname.indexOf('test.aihuishou.com') > -1 ? false : location.hostname.indexOf('aihuishou.com') > -1;
    })();

    var baseUrl = __isProduction ? 'http://m.mk.aihuishou.com/' : 'http://bj.test.aihuishou.com:8093/';
    return {
    		url:baseUrl
    }
})