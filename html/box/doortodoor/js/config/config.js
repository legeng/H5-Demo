//config配置
require.config({
	baseUrl:'js',
	waitSeconds: 0,
	paths:{
		"jquery":"lib/jquery.min",
		"index":"app/index",
		'demo':'app/demo',
		'url':'app/url',
		'time':'app/time',
		'mui.min':'lib/mui.min',
		'mui.picker':'lib/mui.picker.min',
		'mui.poppicker':'lib/mui.poppicker'
	},
	shim:{
		'mui.picker':['mui.min'],
		'mui.poppicker':['mui.min']
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});