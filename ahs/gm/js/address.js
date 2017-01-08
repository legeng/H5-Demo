$.fn.sjld = function(shenfen,chengshi,quyu){
	var sfli = shenfen+" li";
	var csli = chengshi+" li";
	var qyli = quyu+" li";
	//START
	var len = provinceList.length;
	for(var i = 0;i<len;i++){
		var chl = "<li>"+provinceList[i].name+"</li>";
		$(shenfen).append(chl);
	}
		//END
	$(sfli).click(function(){
		$(".slider").animate({"left":"2.8rem"},100);
		var sfnum = $(this).index();
		var txt = $(this).html();
		$(".sf_tab").html(txt);
		$(shenfen).hide();
		$(chengshi).show();
		var index = $(this).index();
		var csgs = provinceList[index].cityList;
		var yqgs = provinceList[index].cityList[0].areaList;
		for(i=0;i<csgs.length;i++){
			var csmc = csgs[i].name;
			var csnr = "<li>"+csmc+"</li>";
			$(chengshi).append(csnr);
		}
		for(j=0;j<yqgs.length;j++){
			var qymc = yqgs[j];
			var qynr = "<li>"+qymc+"</li>";
			$(quyu).append(qynr);
		}
		$("#sfdq_num").val(sfnum);
		$(csli).click(function(){
			$(".slider").animate({"left":"5.2rem"},100);
			$(qyli).remove();
			$(chengshi).hide();
			$(quyu).show();
			$(".cs_tab").html($(this).html());
			var dqsf_num = $("#sfdq_num").val();
			if (dqsf_num == "") {
				dqsf_num = 0
			} else {
				var dqsf_num = $("#sfdq_num").val()
			}
			var csnum = $(this).index();
			var qygs = provinceList[dqsf_num].cityList[csnum].areaList;
			for(j=0;j<qygs.length;j++){
				var qymc = qygs[j];
				var qynr = "<li>"+qymc+"</li>";
				$(quyu).append(qynr);
			}
			
			//区域点击 click!!!
			$(qyli).click(function(){
				$("#overlay").hide();
				$(".address_con").hide();
				$(".qy_tab").html($(this).html());
				$("#choose").html($(".cs_tab").html()+" "+$(this).html());
				$("#choose").css("color","#000");
			});
			if(catlog==55){
				$(qyli).each(function(i,elem){
					var index = i;
					if(index>10){
						$(elem).unbind("click");
						$(elem).css("background","#EFEFEF");
					}
				});
			}
		});
		
	});

}
/*---------------------------------------------------------------------*/		
var provinceList = [{
	name: "上海",
	cityList: [{
		name: "上海",
		areaList: ["宝山区","黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区","闸北区","浦东新区","嘉定区","松江区","青浦区",
"南汇区","奉贤区"]
	}, ]
},{
	name: "北京",
	cityList: [{
		name: "北京",
		areaList: ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "通州区", "顺义区", "昌平区", "大兴区"]
	}]
}, {
	name: "四川",
	cityList: [{
		name: "成都",
		areaList: ["金牛区", "成华区", "青羊区", "锦江区", "高新区","武侯区"]
	}, ]
}, 
//{
//	name: "河南",
//	cityList: [{
//		name: "郑州",
//		areaList: ["中原区", "二七区", "惠济区", "金水区", "管城回族区", "高新技术开发区"]
//	}]
//}, 
{
	name: "天津",
	cityList: [{
		name: "天津",
		areaList: ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区"]
	}, ]
},{
	name: "河北",
	cityList: [{
		name: "石家庄",
		areaList: ["长安区", "新华区", "桥东区", "桥西区", "裕华区"]
	}, ]
},{
	name: "重庆",
	cityList: [{
		name: "重庆",
		areaList: ["渝中区", "江北区",  "沙坪坝区", "九龙坡区", "大渡口区"]
	}, ]
}, {
	name: "云南",
	cityList: [{
		name: "昆明",
		areaList: ["五华区", "盘龙区", "官渡区", "西山区"]
	}]
}, {
	name: "湖北",
	cityList: [{
		name: "武汉",
		areaList: ["武昌区", "洪山区", "汉阳区", "江岸区", "江汉区", "硚口区"]
	}]
}, {
	name: "湖南",
	cityList: [{
		name: "长沙",
		areaList: ["天心区", "雨花区", "岳麓区", "开福区", "芙蓉区"]
	}]
}, {
	name: "广东",
	cityList: [{
		name: "深圳",
		areaList: ["南山区", "福田区", "罗湖区", "盐田区", "宝安区"]
	}, {
		name: "惠州",
		areaList: ["惠城区", "惠阳区"]
	},{
//		name: "广州",
//		areaList: ["白云区","天河区","越秀区","海珠区","荔湾区","黄浦区","番禹区"]
//	}, {
		name: "东莞",
		areaList: ["东城区","南城区","莞城区","万江区","厚街镇"]
	}]
}, {
	name: "陕西",
	cityList: [{
		name: "西安",
		areaList: ["新城区", "碑林区", "莲湖区", "雁塔区", "长安区", "灞桥区", "未央区"]
	}, {
		name: "咸阳",
		areaList: ["渭城区", "秦都区"]
	}]
}, {
	name: "新疆",
	cityList: [{
		name: "乌鲁木齐",
		areaList: ["天山区", "沙依巴克区", "开发区", "水磨沟区", "新市区", "米东区"]
	}]
}, {
	name: "江苏",
	cityList: [{
		name: "南京",
		areaList: ["鼓楼区（含下关区）", "玄武区", "秦淮区（含白下区）", "建邺区", "雨花台区"]
	}, {
		name: "常州",
		areaList: ["天宁区", "钟楼区", "武进区", "新北区"]
	}, {
		name: "苏州",
		areaList: ["沧浪区", "平江区", "金阊区", "工业园区", "虎丘区", "吴中区", "相城区", "吴江市"]
	},  {
		name: "徐州",
		areaList: ["泉山区", "云龙区", "鼓楼区"]
	},{
		name: "无锡",
		areaList: ["惠山区","锡山区","梁溪区","滨湖区","新吴区"]
	}]
}, {
	name: "浙江",
	cityList: [{
		name: "杭州",
		areaList: ["拱墅区", "下城区", "江干区", "上城区","滨江区","西湖区"]
	},{
		name: "宁波",
		areaList: ["江东区", "江北区", "海曙区"]
	}, {
		name: "嘉兴",
		areaList: ["秀洲区", "南湖区"]
	}]
}, {
	name: "福建",
	cityList: [{
		name: "福州",
		areaList: ["鼓楼区", "台江区", "仓山区", "马尾区", "晋安区"]
	},{
		name: "厦门",
		areaList: ["湖里区", "思明区", "海沧区", "同安区", "集美区"]
	}]
}, {
	name: "山东",
	cityList: [{
		name: "青岛",
		areaList: ["市南区", "市北区", "四方区", "李沧区", "崂山区", "城阳区"]
	}, {
		name: "济南",
		areaList: ["市中区", "槐荫区", "天桥区", "历城区", "历下区"]
	}]
}, {
	name: "辽宁",
	cityList: [{
		name: "鞍山",
		areaList: ["铁西区", "铁东区", "立山区", "千山区"]
	}]
}, {
	name: "吉林",
	cityList: [{
		name: "吉林",
		areaList: ["昌邑区", "龙潭区", "船营区", "丰满区"]
	}]
}, {
	name: "安徽",
	cityList: [{
		name: "合肥",
		areaList: ["庐阳区","瑶海区","蜀山区","包河区"]
	}]
}, {
	name: "黑龙江",
	cityList: [{
		name: "哈尔滨",
		areaList: ["南岗区","道里区","道外区","香坊区","松北区","平房区","阿城市","呼兰区"]
	}]
}];