//config配置
require.config({
	baseUrl:'js',
	waitSeconds: 0,
	paths:{
		"jquery":"lib/jquery.min",
		"index":"app/index",
		//常用函数的封装
		'demo':'app/demo', 
		'url':'app/url',
		'userinfo':'app/userinfo',
		'dropload':"lib/dropload",
		'lazyload':'lib/jquery.lazyload'
		
	},
	shim:{
		"lazyload" : ['jquery']
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});