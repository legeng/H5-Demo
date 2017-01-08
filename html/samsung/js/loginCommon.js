 	function showAlert(msg) {
        $('body').append($("<div id='message' style='display:none'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '8rem',
                'height': '1.5rem',
                'z-index': 10,
                'font-size':'0.8rem',
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem',
                'z-index':"2000000"
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
//提交订单参数
function urlParams() {
        var args = new Object();
        var query = location.search.substring(1);//获取查询串
        var pairs = query.split("&");//在逗号处断开
        for (var i = 0; i < pairs.length; i++) {
            var params = pairs[i].split('=');
            if (params.length < 2)continue;
            args[params[0]] = params[1];
        }
        return args;
  }

function pushOrder(){
	             //三星新机IMEI samImei
					var samImei=urlParams().samImei;
					//var samImei=Math.floor(Math.random()*99999000);
				//三星微信OPENID 
					var samWxOpenId=urlParams().samWxOpenId
				//三星活动码samCampaignId
					var samCampaignId=urlParams().samCampaignId
				//三星活动ID samActivityId
					var samActivityId=urlParams().samActivityId
				//三星新机销售日期samSaleDate
					var samSaleDate=urlParams().samSaleDate;
				//三星会员名称samName----
					var samName=decodeURIComponent(urlParams().samName);	
				//三星新机交易号samTradeNo
					var samTradeNo=urlParams().samTradeNo
				//品牌名称brandName
					var brands=urlParams().typeIndex;
					var brandName;
					if(brands=='iphone'){
						brandName='苹果'
					}else{
						brandName='三星'
					}
				//型号名称modelName
					var modelName=urlParams().pinPai;
				//订单总金额orderPrice
					var orderPrice=urlParams().priceNumber;
				//旧机回收价格oldFee
					var oldFee=parseInt(urlParams().priceNumber)-1000
				//三星补贴价格samSubsidyFee
					var samSubsidyFee=1000;
				//联系人姓名linkName
				var linkName=decodeURIComponent(urlParams().samName);
				//联系人手机号mobile  
				    var mobile= urlParams().samMobile;
				//银行卡号bankNo				  
				   var textDemo=$('.cOne').val();
						while(textDemo.indexOf("-")!=-1){
						  textDemo=textDemo.replace("-","");
						}
				   var bankNo=textDemo;
				//银行名称bankName
				    var bankName=$('.bankNotice').html(); 
				//证件号cardNo
				//   var cardNo= $('.cardNum').val(); 
				//用户登录令牌token
				//  var tokenOutRed = localStorage.getItem("token");
				//sign
				var sign=urlParams().sign;
				//
				 var data='{"linkName":"'+linkName+'","samImei":"'+samImei+'","samWxOpenId":"'+samWxOpenId+'","samCampaignId":"'+samCampaignId+'","samActivityId":"'+samActivityId+'","samSaleDate":"'+samSaleDate+'","samName":"'+samName+'","samTradeNo":"'+samTradeNo+'","brandName":"'+brandName+'","modelName":"'+modelName+'","orderPrice":"'+orderPrice+'","oldFee":"'+oldFee+'","samSubsidyFee":"'+samSubsidyFee+'","mobile":"'+mobile+'","bankNo":"'+bankNo+'","bankName":"'+bankName+'","sign":"'+sign+'"}'                 	
					
					$.post("http://m.mk.aiweixiu.com/api/activity/sam/samsung", {
			            "methodName": "samsung",
			            "timestamp": Date.parse(new Date()),
			            "version": "1.0",
			            "token":"",
			            "sign": '',
			            "channelCode": "",
			            "clientType": "mobile",
			            "data": data
		       	}).success(function (data) {
		       		console.log(data)
		       	   		if(data.code==0){
		       	   			//邮寄人姓名
		       	   			var thisName=data.body.name;
		       	   			//邮寄人手机号
		       	   			var thisPhone=data.body.mobile;
		       	   			//旧机型
		       	   			var content=data.body.content;
		       	   			//订单号
		       	   			var orderNo=data.body.orderNo;
		       	   			//回收总价
		       	   			//orderPrice;
		       	   			//订单状态
		       	   			var statusName=data.body.statusName;
		       	   			//
		       	   			var thisCanshu="content="+content+"&orderNo="+orderNo+"&orderPrice="+orderPrice+"&statusName="+statusName+"&thisName="+thisName+"&thisPhone="+thisPhone+""
		       	   			window.location='success-confirm.html?'+thisCanshu;
		       	   		}else{
		       	   			showAlert(data.msg);	       	   			
		       	   		}		       	   
		       	   })
}

$('.sendTic').on('click',function(){
//验证选择开户银行
		if($('.bankNotice').html()=='请选择开户银行'){
			showAlert("请选择开户银行");
            return;
		}	
//验证银行卡号
		if($('.cOne').val()==''){
			showAlert("请输入开户卡号");
            return;
		}
		pushOrder();			
})

