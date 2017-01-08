//config配置
require.config({
	baseUrl:'js',
	waitSeconds: 0,
	paths:{
		"jquery":"lib/jquery.min",
		"index":"app/index",
//		'dropload':"lib/dropload",
		'demo':'app/demo',
		'url':'app/url'
	},
	shim:{
		
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});