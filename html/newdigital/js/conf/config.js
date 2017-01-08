
//require global config 

require.config({
    baseUrl: 'js',
    waitSeconds: 0,
    paths: {
      //基础插件
      "jquery"   :  "lib/jquery.min",
      "Backbone" :  "lib//backbone.min",
      "underscore":  "lib/underscore.min",
      "bootstrap":   "lib/bootstrap.min",

      //预先加载
      "jquery.preload": "lib/jquery.preload.min",

      //懒惰加载
      "jquery.lazyload": "lib/jquery.lazyload.min",

      //百度地图
      "baidu.map" : "http://api.map.baidu.com/getscript?v=2.0&ak=wqBXfIN3HkpM1AHKWujjCdsi",

      //业务代码
      "activity":"lib/activity"
    },

    //依赖项
    shim: {
      "bootstrap": ['jquery'],
      "jquery.lazyload" : ['jquery'],
      "jquery.preload" : ['jquery'],
      "activity" : ['jquery']
    },
    // Add this map config in addition to any baseUrl or
    // paths config you may already have in the project.
    map: { 

    },
    //禁止缓存
    urlArgs: "bust=" +  (new Date()).getTime()
});