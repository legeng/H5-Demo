
    function getWX(){
        var dataJson = '{ "localUrl": "'+ window.location.href+'"}';
        $.post(getUrl() + "api/v2/common/sdk/generateConfig", {
            "methodName": "generateConfig",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "MOBILE",
            "data": dataJson
        },function (data,status) {
        		var json = $.parseJSON(data);
	        	if(status == "success"){
	        		 wx.config({
	                debug : json.body.debug,
	                appId : json.body.appId,
	                timestamp : json.body.timestamp,
	                nonceStr :json.body.nonceStr,
	                signature : json.body.signature,
	                jsApiList : json.body.jsApiList
	            });
	        	}
        });
    }
	function share(etitle,elink,eimgUrl,edesc,quanurl,friendurl){
		wx.ready(function () {
        //分享朋友圈
        wx.onMenuShareTimeline({
            title: etitle,
            link: quanurl,
            imgUrl: eimgUrl
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: etitle,
            link: friendurl,
            imgUrl: eimgUrl,
            desc:edesc
        });
        //分享到qq
        wx.onMenuShareQQ({
            title: etitle,
            link: elink,
            imgUrl: eimgUrl,
            desc: edesc
        });
        wx.onMenuShareQZone({
            title: etitle,
            link: elink,
            imgUrl: eimgUrl,
            desc: edesc,
            success: function (res) {
                
            },
            cancel: function (res) {
               
            }
        });
    });
	}
    
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
                'color': '#fff',
                'line-height': '1.5rem',
                'text-align': 'center',
                'border-radius': '0.1rem'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
    

