;
(function (w, d, $, undefined) {
    function Header(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {
            curJson: {
                'background-color': '#C7A559',
                'box-shadow': '2px -2px 2px rgba(0,0,0,0.4)',
            },
            oriJson: {
                'background-color': 'inherit',
                'box-shadow': 'none',
            },
            hrefArr: [
                'HOME',
                'ABOUT US',
                'PERSONAL CARE',
                'CONTACT US'
            ],
            urlArr: [
                'index.html',
                'about-us.html',
                'personal-care.html',
                'contact-us.html'
            ]
        };
        this.init();
    }

    Header.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            $(this.C).html("<div class='hInnerC'></div>");//版心

            $(this.C).find('.hInnerC').html(
                "<div class='hLogo'><img src='./img/logo.png' width='100'></div>" +
                "<div class='hOptions'></div>"
            );

            var str = '';
            for (i = 0; i < this.config.hrefArr.length; i++) {
                str += '<span class="hOption">' + this.config.hrefArr[i] + '</span>';

            }
            $(this.C).find('.hOptions').html(str);

        },
        initCSS: function () {
            var that = this;

            $(this.C).addClass('background-image-center');

            $(this.C).css({
                position: 'fixed',
                height: 108,
                width: '100%',
                'z-index': 100,
                top: 0,
                'background-image': 'url("./img/commonBG.jpg")',
                overflow: 'hidden',
                'box-shadow': '0px 1px 30px rgba(0,0,0,0.2)',
            })

            $(this.C).find('.hInnerC').css({
                width: '1024',
                margin: '0 auto',
                height: '100%',
                position: 'relative',
                'padding-top': '10px',
            })

            $(this.C).find('.hLogo').css({
                'text-align': 'center',
            })

            $(this.C).find('.hOptions').css({
                position: 'absolute',
                width: '100%',
                bottom: -10,
                left: 0,
                'text-align': 'center',
            })

            $(this.C).find('.hOption').css({
                'text-align': 'center',
                display: 'inline-block',
                height: 48,
                'margin': '0 10px',
                'border-top-left-radius': 16,
                'border-top-right-radius': 16,
                // 'font-size': '12px',
                padding: '10px 24px',
                cursor: 'pointer',
                // transition: 'all 0.2s ease 0s',
                color: '#5E6568',
            })
        },
        bindEvent: function () {
            var that = this;

            //event...........................................
            //点击跳转
            $(this.C).find('.hOption').each(function (i, e) {
                $(e).click(function () {
                    window.location.href = that.config.urlArr[i];
                })
            })
            //init.................................
            this.initCur(0);

        },
        initCur: function (index) {
            var that = this;
            $(this.C).find('.hOption')
                .eq(index)
                .css(that.config.curJson)
                .siblings()
                .css(that.config.oriJson);
        }

    }
    w.Header = Header;
})(window, document, jQuery)


