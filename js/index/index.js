(function () {
    //#3881e0
    //窗口宽高
    var winH = $(window).height();
    var winW = $(window).width();
    var pageIndex = 0//当前页面（初始化用）

    var isPageVelocited = false;
    //操作的jq对象
    var $cirs = $('#circles');
    var $cirLis = $cirs.find('li');
    var $con = $('#container');
    var $pages = $con.find('.page');
    var pageNum = $pages.length - 1;//最大索引数所以-1

    //jqPage对象
    var $page0 = $pages.eq(0);
    var $page1 = $pages.eq(1);
    var $page2 = $pages.eq(2);
    var $page3 = $pages.eq(3);

    //添加背景颜色
    var colorArr = ['#fff', '#fff', '#fff', 'white', 'white'];
    $pages.each(function (i, e) {
        $(this).css('backgroundColor', colorArr[i]);
    })


    //Events....................................................................
    $(window).mousewheel(function (e, delta) {
        var e = e || event;
        e.preventDefault();	//阻止页面的默认滚动。

        if (!isPageVelocited) {

            var oldIndex = pageIndex;
            if (delta == -1) {
                pageIndex++;
            }
            else if (delta == 1) {
                pageIndex--;
            }
            pageIndex = pageIndex > pageNum ? pageNum : pageIndex;//验收
            pageIndex = pageIndex < 0 ? 0 : pageIndex;

            DoPageChange(oldIndex, pageIndex);
        }
    })

    $(window).keydown(function (e) {
            var e = e || event;
            if (!isPageVelocited) {
                var oldIndex = pageIndex;

                if (e.keyCode == 38 || e.keyCode == 40) {
                    e.preventDefault();	//阻止页面的默认滚动。
                    if (e.keyCode == 38) {
                        pageIndex--;
                    }
                    else if (e.keyCode == 40) {
                        pageIndex++;
                    }
                    pageIndex = pageIndex > pageNum ? pageNum : pageIndex;//验收
                    pageIndex = pageIndex < 0 ? 0 : pageIndex;

                    DoPageChange(oldIndex, pageIndex);
                }
            }
        }
    )


    $cirLis.each(function (i, e) {
        $(this).click(function () {
            var oldIndex = pageIndex;
            pageIndex = i;
            DoPageChange(oldIndex, pageIndex);
        })
    })

    //functions...................................................................
    function DoPageChange(oldIndex, pageIndex) {
        if (oldIndex == pageIndex) {
            return;
        }

        isPageVelocited = true;
        var duration = 1000;
        var ease = 'easeInOutQuart';
        var lastPageHeight = 150;

        //滚到底部 右侧点消失....................................................
        if (pageIndex == pageNum) {
            $cirs.fadeOut('normal');
        }
        else {
            $cirs.fadeIn('normal');
        }


        //判断当前的page是上移还是下移
        var dir = (oldIndex < pageIndex) ? 'up' : 'down'; //-1 1

        //上移的代码
        if (dir == 'up') {
            var oldIndexTop = parseInt($pages.eq(oldIndex).css('top'));
            var newTop = (pageIndex == pageNum) ? lastPageHeight : winH;//是最后一页只移动150 不然就移动整屏
            $pages.eq(oldIndex).velocity({'top': (oldIndexTop - newTop)}, duration, ease);
            $pages.eq(pageIndex).velocity({top: winH}, 0).velocity({'top': winH - newTop}, duration, ease);
        }
        //下移的代码
        else {
            var oldIndexTop = parseInt($pages.eq(oldIndex).css('top'));
            var newTop = (oldIndex == pageNum) ? lastPageHeight : winH;//是最后一页只移动150 不然就移动整屏
            $pages.eq(oldIndex).stop().velocity({'top': (oldIndexTop + newTop)}, duration, ease);
            $pages.eq(pageIndex).stop().velocity({top: 0 - newTop}, 0).velocity({'top': 0}, duration, ease);
        }

        setTimeout(function () {   //滚轮截流
            isPageVelocited = false;
        }, 2000)

        //var cirArr = [0, 1, 2, 3];//
        $cirLis.eq(pageIndex).addClass('cur').siblings().removeClass('cur');

        if (oldIndex != pageNum) { //如果是5到4这一步不需要出入场动画
            AnimateInArr[pageIndex]();
            AnimateOutArr[oldIndex]();
        }
    }

    //AnimateJSON.................................................................
    window.AnimateInArr = AnimateInArr = [
        function () {
            var total = 1200;
            // $page0.velocity({
            //     'opacity': 0,
            // }, 0).delay(0).velocity({'opacity': 1}, (total), 'ease');

            $page0.find('.sculpt').velocity({
                'opacity': 0,
                'top': '100%',
                'translateX': '5',
                'translateY': '-236',
            }, 0).delay(0).velocity({
                'top': '60%',
                'opacity': 1,
            }, (total ), 'ease');

            $page0.find('.title').velocity({
                'left': '80%',
                'opacity': 0,
                'translateX': '-374',
                'translateY': '-50',
            }, 0).delay(500).velocity({
                'left': '50%',
                'opacity': 1,
            }, (total + 400), 'ease');

            $page0.find('.more').velocity({
                'left': '20%',
                'opacity': 0,
                'translateX': '-170',
                'translateY': '60',
            }, 0).delay(500).velocity({
                'left': '50%',
                'opacity': 1,
            }, (total + 800), 'ease');
        },
        function () {
        },
        function () {
        },
        function () {
        },
        function () {
        },
    ];

    window.AnimateOutArr = AnimateOutArr = [
        function () {
        },
        function () {
        },
        function () {
        },
        function () {
        },
        function () {
        },
    ];

    //init.............................................................
    $cirLis.eq(pageIndex).addClass('cur').siblings().removeClass('cur');

    $pages.eq(pageIndex).css({top: 0}).siblings('.page').css({top: '100%'}) //siblings 有page 也有pageSvg
    AnimateInArr[pageIndex]() //首页入场

})()