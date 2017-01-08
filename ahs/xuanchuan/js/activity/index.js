jQuery(function(){
	$('.children03box div').mouseover(function(){
		$(this).stop()
		$(this).animate({'margin-left':'0'},200,'linear')
	})
	$('.children03box div').mouseout(function(){
		$(this).stop()
		$(this).animate({'margin-left':'-150px'},200,'linear')
	})
	//按钮点击
	$('.children03').click(function(){
		$('html,body').animate({scrollTop:$('.ahs_company_section5').offset().top},400)
	});
	var index=[1,1,1];
	//input框特效  1
	$('#contentfir').focus(function(){
		$(this).css('border-color','#f9e72b');
		if(index[0]==0){
			$('#regMessage').hide();
		}
		$('.label1').css('color','#f9e72b')
		$(this).attr('placeholder','请输入公司全称')
		$('.label1').show()
		$('.label1').animate({'top':'45px','font-size':'12px'})
	})
	$('#contentfir').blur(function(){
		$(this).css('border-color','#CCCCCC');
		if($(this).val()!=''){
			$('.label1').css('color','#666')
		}else{
			$(this).attr('placeholder','公司名称')
			$('.label1').hide()
			$('.label1').animate({'top':'70px','font-size':'14px'})
		}	
	})	
	//抽取为函数

	//2
	$('#contentsec').focus(function(){
		$(this).css('border-color','#f9e72b');
		if(index[1]==0){
			$('#regMessage').hide();
		}
		$('.label2').css('color','#f9e72b')
		$(this).attr('placeholder','请输入真实姓名')
		$('.label2').show()
		$('.label2').animate({'top':'116px','font-size':'12px'})
	})
	$('#contentsec').blur(function(){
		$(this).css('border-color','#CCCCCC');
		if($(this).val()!=''){
			$('.label2').css('color','#666')
		}else{
			$(this).attr('placeholder','联系人')
			$('.label2').hide()
			$('.label2').animate({'top':'142px','font-size':'14px'})
		}	
	})
	// 3联系电话
	$('#contentthr').focus(function(){
		$(this).css('border-color','#f9e72b');
		if(index[2]==0){
			$('#regMessage').hide();
		}
		$('.label3').css('color','#f9e72b')
		$(this).attr('placeholder','请输入联系电话并保持电话畅通')
		$('.label3').show()
		$('.label3').animate({'top':'188px','font-size':'12px'})
	})
	$('#contentthr').blur(function(){
		$(this).css('border-color','#CCCCCC');
		if($(this).val()!=''){
			$('.label3').css('color','#666')
		}else{
			$(this).attr('placeholder','联系电话')
			$('.label3').hide()
			$('.label3').animate({'top':'214px','font-size':'14px'})
		}	
	})	
	//4描述
	$('#contentfou').focus(function(){
		$(this).css('border-color','#f9e72b');
		$('.label4').css('color','#f9e72b')
		$(this).attr('placeholder','请输入需回收的详细品牌、型号、设备数量等')
		$('.label4').show()
		$('.label4').animate({'top':'260px','font-size':'12px'})
	})
	$('#contentfou').blur(function(){
		$(this).css('border-color','#CCCCCC');
		if($(this).val()!=''){
			$('.label4').css('color','#666')
		}else{
			$('.label4').animate({'top':'280px','font-size':'14px'});
			$('.label4').hide()
			$(this).attr('placeholder','回收描述')
		}	
	})	
	//底部动画
	$('.contentSub_box').mouseover(function(){
		$(this).stop()
		$(this).animate({'left':'0'},200,'linear')
	})
	$('.contentSub_box').mouseout(function(){
		$(this).stop()
		$(this).animate({'left':'-150px'},200,'linear')
	})
	//最终提交信息
	$('#contentSub').click(function(){
		index[0]=1;index[1]=1;index[2]=1;
		if($('#contentfir').val().trim()==''){
			index[0]=0;
			$('#regMessage').html('请填写公司名称！');
			$('#regMessage').show();
			return;
		}else if($('#contentsec').val().trim()==''){
			index[1]=0;
			$('#regMessage').html('请填写联系人！');
			$('#regMessage').show();
			return;
		}else if($('#contentthr').val().trim()==''){
			index[2]=0;
			$('#regMessage').html('请填写联系电话！');
			$('#regMessage').show();
			return
		}
		var phoneReg = /1[3,4,5,7,8]\d{9}/;
	    if ( phoneReg.test($('#contentthr').val().trim()) ) {
	            
	    } else {
	        index[2]=0;
			$('#regMessage').html('联系电话格式不正确！');
			$('#regMessage').show();
			return;
	    }
	    var dataJson = '{"companyName":"' + $('#contentfir').val().trim() +'","linkmanName":"'+$('#contentsec').val().trim()+'","linkmanMobile":"'+$('#contentthr').val().trim()+'","notes":"'+$('#contentfou').val().trim()+'"}';
		$.post("http://mk.aihuishou.com/api/activity/bd/getCompanyOrder",{
    			"methodName": "getCompanyOrder",
            "timestamp": Date.parse(new Date()),
            "version": "2.0",
            "token": "",
            "sign": "",
            "channelCode": "",
            "clientType": "PC",
            "data": dataJson
    		}).success(function(data){
    			if(data.code == 0){
    				$("#contentfir").val("");
    				$("#contentfir").attr('placeholder','公司名称')
				$('.label1').hide()
				$('.label1').animate({'top':'70px','font-size':'14px'})
				//
				$("#contentsec").val("");
				$("#contentsec").attr('placeholder','联系人')
				$('.label2').hide()
				$('.label2').animate({'top':'142px','font-size':'14px'})
				//
				$("#contentthr").val("");
				$("#contentthr").attr('placeholder','联系电话')
				$('.label3').hide()
				$('.label3').animate({'top':'214px','font-size':'14px'})
				//
				$("#contentfou").val("");
				$('.label4').animate({'top':'280px','font-size':'14px'});
				$('.label4').hide()
				$("#contentfou").attr('placeholder','回收描述')
				//
				//$(".sub_info").html("提交信息成功，我们将尽快与您联系！");
				$('#regMessage').html('提交信息成功，我们将尽快与您联系');
				$('#regMessage').show();
			    setTimeout(function(){
			    		$('#regMessage').html('');
			    },2000)
    			}else{
    				$('#regMessage').html(data.msg);
    				$('#regMessage').show();
			    setTimeout(function(){
			    		$('#regMessage').html('');
			    },2000)
    			}
    		});
	})
	//$('#regMessage')提示信息
})
