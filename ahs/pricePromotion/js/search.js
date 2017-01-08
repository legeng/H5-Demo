$(function(){
	$("#getCode").on("click",function(){
		getCode();
	});
	function init() {
		var clip = new ZeroClipboard.Client();
		clip.setHandCursor( true );
		clip.setText($('#cardid').val()); 
		clip.addEventListener( "mouseUp", function(client) {
			alert("复制成功！");
		});
		clip.glue("copycardid"); 
	}
	 function getCode() {
	 	var tel = $("#tel").val();
	 	var phoneReg = /1[3,4,5,7,8]\d{9}/;
        if ($("#tel").val() == '') {
        		$("#tel").attr("placeholder","请输入手机号");
            return;
        }
       if (!phoneReg.test($('#tel').val())) {
       	$("#tel").val("");
       	$("#tel").attr("placeholder","手机号不正确");
            return;
       }
        var dataJson = tel;
        $.post(getUrl()+"api/activity/ahs/common/getActivityCode", {
            "methodName": "getActivityCode",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "PC",
            "data": dataJson
        }).success(function (data) {
            if(data.code == 0){
            		var couponCode = data.body.couponCode;
            		$("#cardid").val(couponCode);
            		master();
	       		$("#overlay").click(function(){
		            $("#overlay").remove();
		            $(".pop").css({"display":"none"});
		            $("html,body").css({"height": "100%","overflow":"auto"});
	        		});
		       $(".pop").css("display","block");
		       init();
            }else{
            		alert(data.msg);	
            }
	       });
    }
	function master() {
        $("html,body").css({"height": "100%","overflow":"hidden"});
        var docHeight = $(document.body).height();
        $('body').append('<div id="overlay"></div>');
        $('#overlay').height(docHeight)
            .css({
                'display': 'block',
                'opacity': .8,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': '#000000',
                'width': '100%',
                'height': '100%',
                'z-index':100
            });
    };
    
	
});
