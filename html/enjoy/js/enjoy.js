$(function(){
	 var swiper = new Swiper('.swiper-container', {
		  pagination: '.swiper-pagination',
		  paginationClickable: true,
		  direction: 'vertical'
	});
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
    function closeMaster(){
        $("#overlay").remove();
    }
    
     $(".lc").on("click",function(){
       master();
        $(".pop-lc").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".pop-lc").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
     $(".gz").on("click",function(){
       master();
        $(".pop-gz").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".pop-gz").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
    $(".top-row").on("click",function(){
    		master();
    		$(".pop-yz").css({"display":"block"});
        $("#overlay").click(function(){
            $("#overlay").remove();
            $(".pop-yz").css({"display":"none"});
            $("html,body").css({"height": "100%","overflow":"auto"});
        });
    });
    
    $(".enjoy-btn").on("click",function(){
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
       var countJson = '{ "activityCode": "3","singleCode": "' + $("#tel").val() + '"}';
        $.post(getUrl()+"api/activity/ahs/common/enjoyActivity", {
                "methodName": "enjoyActivity",
                "timestamp": Date.parse(new Date()),
                "version": "2.0",
                "token": "",
                "sign": "",
                "channelCode": "",
                "clientType": "MOBILE",
                "data": countJson
           }).success(function (data) {
            		if(data.code == 0){
            			$(".pop-yz").css({"display":"none"});
            			showAlert(data.msg);
            			$("#overlay").remove();
            			setTimeout(function(){
            				window.location.href="http://m.aihuishou.com/shouji";
            			},200);
            		}else{
            			$("#tel").val("");
            			showAlert(data.msg);
            		}
            });
    		});
    function showAlert(msg) {
        $('body').append($("<div id='message'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'rgba(0,0,0,0.65)',
                'width': '8rem',
                'height': '1.5rem',
                'z-index': 60000,
                'color': '#fff',
                'line-height': '0.2rem',
                'text-align': 'center',
                'border-radius': '0.1rem'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
	
});
