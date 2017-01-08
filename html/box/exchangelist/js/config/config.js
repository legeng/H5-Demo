//config配置
require.config({
	baseUrl:'js',
	waitSeconds: 0,
	paths:{
		"jquery":"lib/jquery.min",
		"index":"app/index",
		'demo':'app/demo',
		'url':'app/url'
//		'dropload':"lib/dropload"
	},
	shim:{
		
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});