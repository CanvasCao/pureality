(function () {
    window.onload = function () {
        //窗口宽高
        var winH = $(window).height();
        var winW = $(window).width();
        var pageIndex = 0;
        var ease = 'easeInOutQuart';
        var isPageVelocited = false;

        //jqMap........................
        var $cirs = $('#circles');
        var $cirLis = $cirs.find('li');
        var $con = $('#container');
        var $pages = $con.find('.page');
        var pageNum = $pages.length - 1;//最大索引数所以-1
        var $header = $('.header');
        //jqPage对象
        var $page0 = $pages.eq(0);
        var $page1 = $pages.eq(1);
        var $page2 = $pages.eq(2);
        var $page3 = $pages.eq(3);

        //添加背景颜色
        // var colorArr = ['blue', 'red', 'blue', 'red',];
        // $pages.each(function (i, e) {
        //     $(this).css('backgroundColor', colorArr[i]);
        // })


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
            var lastPageHeight = 100;

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
                $page0.find('.sculpt').velocity({
                    'opacity': 0,
                    'top': '100%',
                    'translateX': 5,
                    'translateY': -176,
                }, 0).delay(1000).velocity({
                    'top': '50%',
                    'opacity': 1,
                }, (total + 1000), 'ease');

                $page0.find('.title').velocity({
                    'left': '20%',
                    'opacity': 0,
                    'translateX': '-374',
                    'translateY': '-50',
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 400), 'ease');

                $page0.find('.line').velocity({
                    'left': '80%',
                    'opacity': 0,
                    'translateX': -374,
                    'translateY': 35,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 800), 'ease');

                $page0.find('.more').velocity({
                    'left': '20%',
                    'opacity': 0,
                    'translateX': -180,
                    'translateY': 60,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 1200), 'ease');
            },
            function () {
                var total = 1200;
                $page1.find('.sculpt').velocity({
                    'opacity': 0,
                    left: '20%',
                    'translateX': -665,
                    'translateY': -186,
                }, 0).delay(2000).velocity({
                    left: '50%',
                    'opacity': 1,
                }, (total + 1000), 'ease');

                $page1.find('.title').velocity({
                    'left': '20%',
                    'opacity': 0,
                    'translateX': 6,
                    'translateY': '-50',
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 400), 'ease');

                $page1.find('.line').velocity({
                    'left': '80%',
                    'opacity': 0,
                    'translateX': 6,
                    'translateY': 35,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 800), 'ease');

                $page1.find('.more').velocity({
                    'left': '20%',
                    'opacity': 0,
                    'translateX': 146,
                    'translateY': 60,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 1200), 'ease');
            },
            function () {
                var total = 1200;
                $page2.find('.sculpt').velocity({
                    'opacity': 0,
                    'top': '100%',
                    'translateX': 55,
                    'translateY': -186,
                }, 0).delay(1000).velocity({
                    'top': '50%',
                    'opacity': 1,
                }, (total + 1000), 'ease');

                $page2.find('.title').velocity({
                    'left': '20%',
                    'opacity': 0,
                    'translateX': -409,
                    'translateY': -50,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 400), 'ease');

                $page2.find('.line').velocity({
                    'left': '80%',
                    'opacity': 0,
                    'translateX': -334,
                    'translateY': 35,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 800), 'ease');

                $page2.find('.more').velocity({
                    'left': '20%',
                    'opacity': 0,
                    'translateX': -190,
                    'translateY': 60,
                }, 0).delay(500).velocity({
                    'left': '50%',
                    'opacity': 1,
                }, (total + 1200), 'ease');
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
        ];

        //init.............................................................
        $cirLis.eq(pageIndex).addClass('cur').siblings().removeClass('cur');
        $header.velocity({top: -120}, 0).delay(1000).velocity({top: 0}, 1000, ease)
        $pages.eq(pageIndex).css({top: 0}).siblings('.page').css({top: '100%'})
        AnimateInArr[pageIndex]() //首页入场
    }


})()