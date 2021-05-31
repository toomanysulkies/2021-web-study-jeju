/*************** getSwiper *****************/
function getSwiper(el, opt) {
    /*
        - cls : '.promo-wrapper
        - opt 
        {
            pager: true,
            navi: true,
            auto: true,
            autoEl:'.slide-stage'
            delay: 3000,
            loop: true,
            space: 40,
            break: 1
        }
        */
    var opt = opt || {}; //opt는 opt 그대로이거나 있다면 {} 적용
    var autoEl = el + ' ' + (opt.autoEl || '.slide-stage'); //새 값을 넣지 않으면
    var pagination =
        opt.pager === false
            ? false
            : {
                  el: el + ' .pager-wrapper',
                  clickable: true,
              };

    var navigation =
        opt.navi === false
            ? false
            : {
                  nextEl: el + ' .bt-slide.right',
                  prevEl: el + ' .bt-slide.left',
              };

    var autoplay =
        opt.auto === false
            ? false
            : {
                  // delay: opt.delay ? opt.delay : 3000
                  delay: opt.delay || 3000,
              };

    var breakpoints = {};
    if (opt.break == 2) {
        breakpoints = {
            768: { slidesPerView: 2 },
        };
    } else if (opt.break == 3) {
        breakpoints = {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
        };
    } else if (opt.break == 4) {
        breakpoints = {
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
        };
    } else if (opt.break == 5) {
        breakpoints = {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
        };
    }

    var swiper = new Swiper(el + '.swiper-container', {
        pagination: pagination,
        navigation: navigation,
        autoplay: autoplay,
        loop: opt.loop === false ? false : true,
        slidesPerView: 1,
        spaceBetween: opt.space || 40,
        breakpoints: breakpoints,
    });
    $(autoEl).hover(
        function () {
            swiper.autoplay.stop();
        },
        function () {
            swiper.autoplay.start();
        }
    );
    return swiper;
}

function swiperHover(swiper, el) {}

/*************** Scroll Spy *****************/
function scrollSpy(el, cls, _gap) {
    $(window).scroll(onscrollSpy).trigger('scroll');
    function onScrollSpy() {
        var scrollTop = $(this).scrollTop();
        var pageOffset = [];
        var page;
        var gap = _gap || 300;
        $(el).each(function (i) {
            pageOffset[i] = $(this).offset().top;
        });

        for (var i = 1; i < pageOffset.length; i++) {
            if (scrollTop < pageOffset[i] - gap) break;
        }
        page = i - 1;
        $(el).eq(page).addClass(cls);
    }
}

/***************************************** Array.sort() ********************************************* */

function sortAsc(key) {
    return function (a, b) {
        return key ? a[key] - b[key] : a - b;
    };
}
function sortDesc(key) {
    return function (a, b) {
        return key ? b[key] - a[key] : b - a;
    };
}

// function sum(a, b, fn){
// 	fn (a + b)
// }
// sum(10,20,function(v){ //a=10,b=20,fn=v  sum의 값을 v에 넣어 함수 실행

// })

// // 30
