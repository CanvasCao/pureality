;
(function (w, d, $, undefined) {
    function Products(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {};
        this.init();
    }

    Products.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
        },
        createDom: function () {
            var products = ""

            this.data.products.forEach(function (e, i) {
                var productImg =
                    '<div class="productImg background-image-center">' +
                    '<div class="title">' + e.title + '</div>' +
                    '<div class="subTitle">' + e.subTitle + '</div>' +
                    '<div class="desc1">' + e.desc1 + '</div>' +
                    '<div class="desc2">' + e.desc2 + '</div>' +
                    '<img class="img" height="500" src="' + e.productImg + '">' +
                    '</div>'

                var descList = ''
                e.descList.forEach(function (desc) {
                    descList += '<li>' + desc + '</li>'
                })

                var productDesc =
                    '<div class="productDesc">' +
                    '<ul>' +
                    descList +
                    '</ul>' +
                    '<div className="icons">' +
                    '<img src="img/icon/icon1.png"><img src="img/icon/icon2.png">' +
                    '</div>' +
                    '</div>'


                var clear = '<div style="clear: both;"></div>'
                var sum = ''
                if (i % 2 == 0) {
                    sum = productImg + productDesc + clear
                } else {
                    sum = productDesc + productImg + clear
                }
                sum = '<div class="product">' + sum + '</div>';
                products += sum;
            })

            $(this.C).html(products);


        },
        initCSS: function () {
            var that = this;
        },
        bindEvent: function () {
            var that = this;
        },
    }
    w.Products = Products;
})(window, document, jQuery)


