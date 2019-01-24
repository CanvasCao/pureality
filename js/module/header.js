;
(function (w, d, $, undefined) {
    function Header(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {
            curJson: {
                'background-color': '#3881e0',
                color: 'white'
            },
            oriJson: {
                'background-color': 'white',
                color: 'black'
            },
            hrefArr: ['首页', '关于肌秘'],
            urlArr: ['index.html', 'about.html']
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

            $(this.C).find('.hInnerC').html("<div class='options'></div>");

            var str = '';
            for (i = 0; i < this.config.hrefArr.length; i++) {
                str += '<div>' + this.config.hrefArr[i] + '</div>';

            }
            $(this.C).find('.options').html(str);


        },
        initCSS: function () {
            var that = this;
            //this.C就是class=.header的容器 自动fixed zindex=2 高度80
            $(this.C).css({
                position: 'fixed',
                height: '80',
                width: '100%',
                'background-color': 'white',
                'z-index': '100',
                top: '0',
                'box-shadow': '0px 3px 15px rgba(0, 0, 0, 0.4)'
            })


            $(this.C).find('.hInnerC').css({
                width: '1024',
                margin: '0 auto',
                height: '100%',
                'box-sizing': 'border-box'
            })

            $(this.C).find('.options').css({
                float: 'right',
                'padding-top': '24px'
            })

            $(this.C).find('.options>div').css({
                'text-align': 'center',
                display: 'block',
                float: 'left',
                width: '75',
                height: '30',
                'line-height': '30px',
                'margin-right': '10px',
                'border-radius': '20px',
                'font-size': '12px',
                padding: '0px 8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease 0s'
            })
        },
        bindEvent: function () {
            var that = this;

            //event...........................................
            //点击跳转
            $(this.C).find('.options>div').each(function (i, e) {
                $(e).click(function () {
                    window.location.href = that.config.urlArr[i];
                })
            })
            //init.................................
            this.initCur(0);

        },
        initCur: function (index) {
            var that = this;
            $(this.C).find('.options>div').eq(index).css(that.config.curJson).siblings().css(that.config.oriJson);
        }

    }
    w.Header = Header;
})(window, document, jQuery)


