var BNJSReady = function (readyCallback) {
    if (readyCallback && typeof readyCallback == 'function') {
        if (window.BNJS && typeof window.BNJS == 'object' && BNJS._isAllReady) {
            readyCallback();
        } else {
            document.addEventListener('BNJSReady', function () {
                readyCallback();
            }, false)
        }
    }
};
var title = document.getElementById('nuomi-title') ? document.getElementById('nuomi-title').innerHTML : '';
    //backHomeElem = document.getElementById('back-home');
    console.log(title);
BNJSReady(function () {
    title && BNJS.ui.title.setTitle(title);
  	$('header').hide(); 
    document.body.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName.toLowerCase() == 'a') {
            e.preventDefault();
           
            var url = target.href;
            if (url) {
                if (url.indexOf('bainuo') > -1) {
                    BNJS.page.start(url);
                } else {
                    url = 'bainuo://component?url=' + encodeURIComponent(e.target.href);
                    var category = target.getAttribute('data-category');
                    if (category && category.toLowerCase() == 'ahs-product') {
                        BNJS.page.start(url, {}, 1);
                    } else {
                        BNJS.page.start(url);
                    }
                }
            }
        }

    });
    //返回首页
    if (backHomeElem) {
        if (backHomeElem.getAttribute('data-back').toLowerCase() == 'home') {
            BNJS.page.onBtnBackClick({
                callback: function () {
                    if (backHomeElem.href) {
                        BNJS.page.start('bainuo://component?url=' + encodeURIComponent(backHomeElem.href));
                    } else {
                        BNJS.page.back();
                    }

                }
            });
        } else if (backHomeElem.getAttribute('data-back').toLowerCase() == 'nuomi') {
            BNJS.page.onBtnBackClick({
                callback: function () {
                    BNJS.page.start('bainuo://home');

                }
            });
        }
    }

});
document.body.addEventListener('click', function (e) {
    if (e.target.nodeName.toLowerCase() == 'a') {
        e.preventDefault();
    }
});
