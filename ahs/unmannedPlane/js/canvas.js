   //
    	function showAlert(msg) {
        $('body').append($("<div id='message'><p>" + msg + "</p></div>"));
        $('#message')
            .css({
                'display': 'block',
                'position': 'fixed',
                'top': '46%',
                'left': '25%',
                'background-color': 'black',
                'width': '50%',
                'font-size':'14px',
                'height': '40px',
                'z-index': 60000,
                'color': 'white',
                'line-height': '40px',
                'text-align': 'center',
                'border-radius': '2px'
            });
        setTimeout(function () {
            $("#message").css({'display': 'none'});
            $("#message").remove();
        }, 1500);
    }
  var vh=$('body').height();
  var vw=$('body').width();
  var can=document.getElementById("canvasBox")
   var canT=can.getContext("2d")
   var can01=document.getElementById("canvasBox")
   var canT01=can.getContext("2d")
   var can02=document.getElementById("canvasBox")
   var canT02=can.getContext("2d")
   var can03=document.getElementById("canvasBox")
   var canT03=can.getContext("2d")
   var can04=document.getElementById("canvasBox")
   var canT04=can.getContext("2d")
   var can05=document.getElementById("canvasBox")
   var canT05=can.getContext("2d")
	canT.beginPath();
	canT.arc(0.221*vh,0.221*vh,0.205*vh,0*Math.PI,Math.PI*2)
	canT.strokeStyle="black"
	//canT.stroke()
	canT.closePath()
	//01
	canT01.beginPath();
	canT01.lineTo(0.221*vh,0.221*vh)
	canT01.arc(0.221*vh,0.221*vh,0.205*vh,-0.3*Math.PI,Math.PI*0.1)
	canT02.strokeStyle="white"
	canT01.lineTo(0.221*vh,0.221*vh)
	canT01.stroke()
	canT01.fillStyle="white"
	//canT01.fill()
	canT01.closePath()

	//02
	canT02.beginPath();
	canT02.lineTo(0.221*vh,0.221*vh)
	canT02.arc(0.221*vh,0.221*vh,0.205*vh,0.1*Math.PI,Math.PI*0.5)
	canT02.strokeStyle="white"
	canT02.lineTo(0.221*vh,0.221*vh)
	canT02.stroke()
	canT02.fillStyle="white"
	//canT02.fill()
	canT02.closePath()
	//03
	canT03.beginPath();
	canT03.lineTo(0.221*vh,0.221*vh)
	canT03.arc(0.221*vh,0.221*vh,0.205*vh,0.5*Math.PI,Math.PI*0.9)
	canT03.strokeStyle="white"
	canT03.lineTo(0.221*vh,0.221*vh)
	canT03.stroke()
	canT03.fillStyle="white"
	//canT03.fill()
	canT03.closePath()
	//04
	canT04.beginPath();
	canT04.lineTo(0.221*vh,0.221*vh)
	canT04.arc(0.221*vh,0.221*vh,0.205*vh,0.9*Math.PI,Math.PI*1.3)
	canT04.strokeStyle="white"
	canT04.lineTo(0.221*vh,0.221*vh)
	canT04.stroke()
	canT04.fillStyle="white"
	//canT04.fill()
	canT04.closePath()
	//05
	canT05.beginPath();
	canT05.lineTo(0.221*vh,0.221*vh)
	canT05.arc(0.221*vh,0.221*vh,0.205*vh,1.3*Math.PI,Math.PI*1.7)
	canT05.strokeStyle="white"
	canT05.lineTo(0.221*vh,0.221*vh)
	canT05.stroke()
	canT05.fillStyle="white"
	//canT05.fill()
	canT05.closePath()
//转盘旋转js
//------------------------------------------------------------------------------
	function getCookie(cname) {
   		 var name = cname + "=";
   		 var ca = document.cookie.split(';');
    		for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
	     if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	//手机号MD5
	
	//旋转次数
	var rotNum = 0;
	//
	var prize;
	//旋转角度
	var angles=2880;
	//可抽奖次数
	var clickNum;
	//中奖公告
	var notice = null;
	var num;
	//转盘初始化
	var color = ["#626262","#787878","rgba(0,0,0,0.5)","#DCC722","white","#FF4350"];
	$('.panBtn').on('click',function(){
		   if($(".chanceCont").html()=="?"){
				$(".phone").css("display","block")
				$(".black1").css("display","block")
				$(".phone_Down").attr("placeholder","");
			}	
		else{
			if (clickNum >= 1) {
				//转盘旋转过程“开始抽奖”按钮无法点击
				$('.panBtn').attr("disabled", 'disabled');
				//可抽奖次数减一
				clickNum = clickNum-1;
				$(".chanceCont").html(clickNum);
				//runKong();
				//-------------------------------------------------
				 var dataJson = getCookie('phoneNumber');
				 console.log(dataJson)
			        $.post(getUrl()+'api/activity/ahs/common/getPrizeByChance', {
			            "methodName": "getPrizeByChance",
			            "timestamp": Date.parse(new Date()),
			            "version": "2.0",
			            "token": "",
			            "sign": "",
			            "channelCode": "",
			            "clientType": "MOBILE",
			            "data": dataJson
			        }).success(function (data) {
			        		console.log(data)
			            if(data.code == 0){
			            		//MD5=data.body.mobileMD5;
			            		num=data.body.result;
			            		runCup()  
			            		rotNum = rotNum + 1;
			            		
			            		//“开始抽奖”按钮无法点击恢复点击
			         		setTimeout(function(){
								$(prize).css("display","block")
								$(".black1").css("display","block")
								$('.panBtn').removeAttr("disabled", 'disabled');
							},3300);
			         		 
			            }else{//-1
			            		showAlert('抽奖失败')
			            }
			        });
			}
		    else{
		    		setTimeout(function(){
		    			$(".fenxiang").show()
		    		},1500)
			    showAlert('抽奖次数已用尽')
		    }
		}
		
	});
	//空转
		function runKong(){
		//angles=2880;
		$('.panBox').css("transition-timing-function","linear")
		$('.panBox').css("-webkit-transition-timing-function","linear")
		$('.panBox').css("-ms-transition-timing-function","linear")
		$('.panBox').css("-o-transition-timing-function","linear")
		$('.panBox').css("-moz-transition-timing-function","linear")
		$('.panBox').css("transition","3s")
		$('.panBox').css("-webkit-transition","3s")
		$('.panBox').css("-ms-transition","3s")
		$('.panBox').css("-o-transition","3s")
		$('.panBox').css("-moz-transition","3s")
		var degValue1 = 'rotateZ('+angles+'deg'+')';
		$('.panBox').css('-o-transform',degValue1);           //Opera
		$('.panBox').css('-ms-transform',degValue1);          //IE浏览器
		$('.panBox').css('-moz-transform',degValue1);         //Firefox
		$('.panBox').css('-webkit-transform',degValue1);      //Chrome和Safari
		$('.panBox').css('transform',degValue1);
	}
	//转盘旋转
	function runCup(){
		probability();
		$('.panBox').css("transition","3s")
		$('.panBox').css("-webkit-transition","3s")
		$('.panBox').css("-ms-transition","3s")
		$('.panBox').css("-o-transition","3s")
		$('.panBox').css("-moz-transition","3s")
		var degValue = 'rotateZ('+angles+'deg'+')';
		$('.panBox').css('-o-transform',degValue);           //Opera
		$('.panBox').css('-ms-transform',degValue);          //IE浏览器
		$('.panBox').css('-moz-transform',degValue);         //Firefox
		$('.panBox').css('-webkit-transform',degValue);      //Chrome和Safari
		$('.panBox').css('transform',degValue);
	}

	//各奖项对应的旋转角度及中奖公告内容
	function probability(){
		
		if ( num == 9 ) {
			angles =2160 * rotNum + 1800;
			prize=".prize1"
		}
		//概率
		else if ( num == 7 ) {
			angles =2160 * rotNum + 1872;
			prize=".prize2"
		}
		//概率
		else if ( num == 8 ) {
			angles =2160 * rotNum + 1944;
			prize=".prize3"
		}
		//概率
		else if ( num == 0 ) {
			angles =2160 * rotNum + 2016;
			prize=".prize4"
		}
		//概率
		else if ( num == 5 ) {
			angles =2160 * rotNum + 2088;
			prize=".prize5"
		}
	
	}
		//外圆
		function createCircle(){
	        var startAngle = 0;//扇形的开始弧度
	        var endAngle = 0;//扇形的终止弧度
	        //画一个5等份扇形组成的圆形
	        for (var i = 0; i< 5; i++){
	            startAngle = Math.PI*(i*0.4-0.7);
	            endAngle = startAngle+Math.PI*(0.4);
	            ctx.save();
	            ctx.beginPath(); 
	            ctx.arc(150,150,100, startAngle, endAngle, false);
	            ctx.lineWidth = 120;
	            if (i == 0) {
	            	ctx.strokeStyle =  'red';
	            }
	            else if(i==1){
	            	ctx.strokeStyle =  'greenyellow';
	            }
	            else if(i==2){
	            	ctx.strokeStyle =  'blue';
	            }
	            else if(i==3){
	            	ctx.strokeStyle =  'darkcyan';
	            }
	            else{
	            	ctx.strokeStyle =  'darksalmon';
	            }
	            ctx.stroke();
	            ctx.restore();
	        } 
	    }

	    //各奖项
	    function createCirText(){	 
		    ctx.textAlign='start';
		    ctx.textBaseline='middle';
		    ctx.fillStyle = color[3];
		    var step = 2*Math.PI/5;
		    for ( var i = 0; i < 5; i++) {
		    	ctx.save();
		    	ctx.beginPath();
		        ctx.translate(150,150);
		        ctx.rotate(i*step);
		        ctx.font = " 20px Microsoft YaHei";
		        ctx.fillStyle = color[3];
		        ctx.fillText(info[i],-30,-115,60);
		        ctx.font = " 14px Microsoft YaHei";
		        ctx.fillText(info1[i],-30,-95,60);
		        ctx.closePath();
		        ctx.restore();
		    }
		}
		function initPoint(){ 
	        //箭头指针
	        ctx1.beginPath();
	        ctx1.moveTo(100,24);
	        ctx1.lineTo(90,62);
	        ctx1.lineTo(110,62);
	        ctx1.lineTo(100,24);
	        ctx1.fillStyle = color[5];
	        ctx1.fill();
	        ctx1.closePath();
	        //中间小圆
	        ctx3.beginPath();
	        ctx3.arc(100,100,40,0,Math.PI*2,false);
	        ctx3.fillStyle = color[5];
	        ctx3.fill();
	        ctx3.closePath();
	        //小圆文字
	        ctx3.font = "Bold 20px Microsoft YaHei"; 
		    ctx3.textAlign='start';
		    ctx3.textBaseline='middle';
		    ctx3.fillStyle = color[4];
	        ctx3.beginPath();
	        ctx3.fillText('开始',80,90,40);
	        ctx3.fillText('抽奖',80,110,40);
	        ctx3.fill();
	        ctx3.closePath();
	        //中间圆圈
	        ctx2.beginPath();
	        ctx2.arc(75,75,75,0,Math.PI*2,false);
	        ctx2.fillStyle = color[2];
	        ctx2.fill();
	        ctx2.closePath();
		}
	




