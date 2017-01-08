
$('.bankNotice').on('click',function(){
	$('.blackMeng').css('display','block')
	$('.bankList').css('display','block')
})

$('.blackMeng').on('click',function(){
	$(this).css('display','none')
	$('.bankList').css('display','none')
})

$('.allBank li').on('click',function(){
	$('.bankNotice').html($(this).html());
	$(this).parent().parent().css('display','none');
	$('.blackMeng').css('display','none')
})


//获取url价格
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
	$('.twoAllto').html(urlParams().priceNumber);	
	$('.priceFirst').html(parseInt(urlParams().priceNumber)-1000);
	//姓名
		$('.cTwo').val(decodeURIComponent(urlParams().samName))
	//手机号
	    $('.cThr').val(urlParams().samMobile)
	
//重新询价
function hah() {
        var args = new Object();
        var query = location.search.substring(1);//获取查询串
        var pairs = query.split("&priceNumber");//在逗号处断开
        return pairs[0];
 }	
	$('.newPrice').on('click',function(){		
		window.location='first-confirm.html?'+ hah()+''
	})

//showAlert
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

//js正则实现用户输入银行卡号的控制及格式化
function formatBankNo (BankNo){
    if (BankNo.value == "") return;
    var account = new String (BankNo.value);
    account = account.substring(0,24); /*帐号的总数, 包括空格在内 */
    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
        /* 对照格式 */
        if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
            var accountNumeric = accountChar = "", i;
            for (i=0;i<account.length;i++){
                accountChar = account.substr (i,1);
                if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
                if (i == 4) account = account + "-"; /* 帐号第四位数后加空格 */
                if (i == 8) account = account + "-"; /* 帐号第八位数后加空格 */
                if (i == 12) account = account + "-";/* 帐号第十二位后数后加空格 */
                if (i == 16) account = account + "-";/* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr (i,1)
            }
        }
    }
    else
    {
        account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
    }
    if (account != BankNo.value) BankNo.value = account;
}

function formatBankNo3 (BankNo){
    if (BankNo.value == "") return;
    var account = new String (BankNo.value);
    account = account.substring(0,11); /*帐号的总数, 包括空格在内 */
    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
        /* 对照格式 */
        if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
            var accountNumeric = accountChar = "", i;
            for (i=0;i<account.length;i++){
                accountChar = account.substr (i,1);
                if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
                if (i == 4) account = account + ""; /* 帐号第四位数后加空格 */
                if (i == 8) account = account + ""; /* 帐号第八位数后加空格 */
                if (i == 12) account = account + "";/* 帐号第十二位后数后加空格 */
                if (i == 16) account = account + "";/* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr (i,1)
            }
        }
    }
    else
    {
        account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
    }
    if (account != BankNo.value) BankNo.value = account;
}

function rr(val){
 
 reg = /^[\u4E00-\u9FA5]{2,4}$/;
 
 if(!reg.test(val)){
 
  	alert('不符合标准') ;
 
 }else{
 
	alert('ok')
 
 }
 
}








