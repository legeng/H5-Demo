﻿$.fn.sjld = function(shenfen, chengshi, quyu, riqi) {
	var sfp = shenfen + " p";
	var csp = chengshi + " p";
	var qyp = quyu + " p";
	var riqitxt = riqi + "p";
	var sfs = shenfen + " .m_zlxg2";
	var css = chengshi + " .m_zlxg2";
	var qys = quyu + " .m_zlxg2";
	var riqis = riqi + " .m_zlxg2";
	var sfli = shenfen + " ul li";
	var csli = chengshi + " ul li";
	var qyli = quyu + " ul li";
	var riqili = riqi + " ul li";
	$(".m_zlxg").click(function() {
		$(this).find(".m_zlxg2").slideDown(200)
	});
	$(".m_zlxg").mouseleave(function() {
		$(this).find(".m_zlxg2").slideUp(200)
	});
	$("#shenfen ul").delegate("li", "click", function(e) {
		e.stopPropagation();
		$(".m_zlxg2").slideUp(200)
	});
	$("#chengshi ul").delegate("li", "click", function(e) {
		e.stopPropagation();
		$(".m_zlxg2").slideUp(200)
	});
	$("#quyu ul").delegate("li", "click", function(e) {
		e.stopPropagation();
		$(".m_zlxg2").slideUp(200)
	});
	$("#riqi ul").delegate("li", "click", function(e) {
		e.stopPropagation();
		$(".m_zlxg2").slideUp(200)
	});
	var sfgsmr = provinceList;
	var csgsmr = provinceList[0].cityList;
	var qygsmr = provinceList[0].cityList[0].areaList;
	var kuandu = new Array();
	$(sfp).text(sfgsmr[0].name);
	$(csp).text(csgsmr[0].name);
	$(qyp).text(qygsmr[0]);
	$("#riqi p").html($(riqili).eq(0).html());
	for (a = 0; a < sfgsmr.length; a++) {
		var sfmcmr = sfgsmr[a].name;
		var sfnrmr = "<li>" + sfmcmr + "</li>";
		$(shenfen).find("ul").append(sfnrmr)
	}
	for (b = 0; b < csgsmr.length; b++) {
		var csmcmr = csgsmr[b].name;
		var csnrmr = "<li>" + csmcmr + "</li>";
		$(chengshi).find("ul").append(csnrmr);
		kuandu[b] = csmcmr.length * 14 + 20
	}
	for (c = 0; c < qygsmr.length; c++) {
		var qymcmr = qygsmr[c];
		var qynrmr = "<li>" + qymcmr + "</li>";
		$(quyu).find("ul").append(qynrmr)
	}
	$(sfli).click(function() {
		var dqsf = $(this).text();
		$(shenfen).find("p").text(dqsf);
		$(shenfen).find("p").attr("title", dqsf);
		var sfnum = $(this).index();
		var csgs = provinceList[sfnum].cityList;
		var csgs2 = provinceList[sfnum].cityList[0].areaList;
		$(chengshi).find("ul").text("");
		var kuandu = new Array();
		for (i = 0; i < csgs.length; i++) {
			var csmc = csgs[i].name;
			var csnr = "<li>" + csmc + "</li>";
			$(chengshi).find("ul").append(csnr);
			kuandu[i] = csmc.length * 14 + 20;
		}
		var qygsdqmr = provinceList[sfnum].cityList[0].areaList;
		$(quyu).find("ul").text("");
		for (j = 0; j < qygsdqmr.length; j++) {
			var qymc = qygsdqmr[j];
			var qynr = "<li>" + qymc + "</li>";
			$(quyu).find("ul").append(qynr);
		}
		$(csp).text(csgs[0].name);
		$(qyp).text(csgs2[0]);
		
		$("#sfdq_num").val(sfnum);
		$(csli).click(function() {
			var dqcs = $(this).text();
			var dqsf_num = $("#sfdq_num").val();
			if (dqsf_num == "") {
				dqsf_num = 0
			} else {
				var dqsf_num = $("#sfdq_num").val()
			}
			$(chengshi).find("p").text(dqcs);
			$(chengshi).find("p").attr("title", dqcs);
			var csnum = $(this).index();
			var qygs = provinceList[dqsf_num].cityList[csnum].areaList;
			$(quyu).find("ul").text("");
			for (j = 0; j < qygs.length; j++) {
				var qymc = qygs[j];
				var qynr = "<li>" + qymc + "</li>";
				$(quyu).find("ul").append(qynr)
			}
			
			$(qyp).text(qygs[0]);
			$("#csdq_num").val(csnum);
			$(qyli).click(function() {
				var dqqy = $(this).text();
				$(quyu).find("p").text(dqqy);
				$(quyu).find("p").attr("title", dqqy)
			})
			if(catlog==55&&$(csp).html()=='上海'){
				$("#quyu li").each(function(i,elem){
					var index = i;
					if(index>10){
						$(elem).unbind("click");
						$(elem).css("background","#EFEFEF");
					}
				});
			}
		});
		
		$(qyli).click(function() {
			var dqqy = $(this).text();
			$(quyu).find("p").text(dqqy);
			$(quyu).find("p").attr("title", dqqy)
		})
		if(catlog==55&&$(csp).html()=='上海'){
			$("#quyu li").each(function(i,elem){
				var index = i;
				if(index>10){
					$(elem).unbind("click");
					$(elem).css("background","#EFEFEF");
				}
			});
		}
	});
	$(csli).click(function() {
		var dqcs = $(this).text();
		var dqsf_num = $("#sfdq_num").val();
		if (dqsf_num == "") {
			dqsf_num = 0
		} else {
			var dqsf_num = $("#sfdq_num").val()
		}
		$(chengshi).find("p").text(dqcs);
		$(chengshi).find("p").attr("title", dqcs);
		var csnum = $(this).index();
		var qygs = provinceList[dqsf_num].cityList[csnum].areaList;
		$(quyu).find("ul").text("");
		for (j = 0; j < qygs.length; j++) {
			var qymc = qygs[j];
			var qynr = "<li>" + qymc + "</li>";
			$(quyu).find("ul").append(qynr)
		}
		$(qyp).text(qygs[0]);
		$("#csdq_num").val(csnum);
		$(qyli).click(function() {
			var dqqy = $(this).text();
			$(quyu).find("p").text(dqqy);
			$(quyu).find("p").attr("title", dqqy)
		})
		if(catlog==55&&$(csp).html()=='上海'){
				$("#quyu li").each(function(i,elem){
					var index = i;
					if(index>10){
						$(elem).unbind("click");
						$(elem).css("background","#EFEFEF");
					}
				});
			}
	});
	$(qyli).click(function() {
		var dqqy = $(this).text();
		$(quyu).find("p").text(dqqy);
		$(quyu).find("p").attr("title", dqqy)
	});
	$("#riqi ul").delegate("li", "click", function() {
		var rq = $(this).html();
		$("#riqi p").html(rq)
	});
	$(".m_zlxg").click(function() {
		$("#sfdq_tj").val($(sfp).text());
		$("#csdq_tj").val($(csp).text());
		$("#qydq_tj").val($(qyp).text());
		$("#sfdq_rq").val($("#riqi p").html())
	})
};
setDay();

function setDay() {
	var parNode = $("#riqi .m_zlxg2 ul");
	for (var i = 0; i < 7; i++) {
		var d = new Date();
		var day = i;
		var time = d.getHours();
		if (time >= 20) {
			day = day + 1
		}
		var dayStr = getDay(day);
		var childNode = $("<li>" + dayStr + "</li>");
		parNode.append(childNode)
	}
}
function getDay(num) {
	var d = new Date();
	d.setDate(d.getDate() + num);
	var m = d.getMonth() + 1;
	m = m < 10 ? "0" + m : m;
	var d1 = d.getDate();
	d1 = d1 < 10 ? "0" + d1 : d1;
	var w = d.getDay();
	var day;
	switch (w) {
	case 0:
		day = "星期日";
		break;
	case 1:
		day = "星期一";
		break;
	case 2:
		day = "星期二";
		break;
	case 3:
		day = "星期三";
		break;
	case 4:
		day = "星期四";
		break;
	case 5:
		day = "星期五";
		break;
	case 6:
		day = "星期六";
		break
	}
	return m + "-" + d1 + "(" + day + ")"
}
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
	}, {
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
		areaList: ["铁西区","铁东区", "立山区", "千山区"]
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