/*
&& AND 연산자 둘다 true일 때 true/ 그 외 false
||    OR 연산자   둘다 false일 때 false/ 그 외 true 
*/

/*************** regExp *****************/

function validEmail(v) {
    // Email 정규표현식
    var emailRegExp = /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i; // Email 정규표현식
    return v.match(emailRegExp) !== null ? true : false;
    //emailRegExp가 null이 아니라면? true를 반환하고 null이라면 false 반환
}

function validPass(v) {
    var passRegExp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 숫자, 문자, 특수문자를 포함한 8 ~ 16자리 정규표현식
    return v.match(passRegExp) !== null ? true : false;
}

function validMobile(v) {
    var mobileRegExp = /^\d{3}-\d{3,4}-\d{4}$/; // 핸드폰번호 정규식
    return v.match(mobileRegExp) !== null ? true : false;
}

function validPhone(v) {
    var phoneRegExp = /^\d{2,3}-\d{3,4}-\d{4}$/; //일반 전화번호 정규식
    return v.match(phoneRegExp) !== null ? true : false;
}
/*************** getSwiper *****************/
function getSwiper(el, opt) {
    /*
        - el: 
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
    var autoEl = el + '' + (opt.autoEl || '.slide-stage'); //새 값을 넣지 않으면 slide-stage가 el에 붙는다
    var pagination =
        opt.pager === false
            ? false
            : {
                  el: el + ' .pager-wrapper',
                  clickable: true,
              }; //, el에 페이저 래퍼를 붙인다

    var navigation =
        opt.navi === false
            ? false
            : {
                  nextEl: el + ' .bt-slide.right',
                  prevEl: el + ' .bt-slide.left',
              }; //좌우 방향 버튼 붙이기

    var autoplay =
        opt.auto === false
            ? false
            : {
                  // delay: opt.delay ? opt.delay : 3000
                  delay: opt.delay || 3000,
              }; //delay에 다른 값을 넣지 않으면 3초간 딜레이

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
    } else if (opt.break > 5) {
        breakpoints = {
            576: { slidesPerView: opt.break - 3 },
            768: { slidesPerView: opt.break - 2 },
            992: { slidesPerView: opt.break - 1 },
            1200: { slidesPerView: opt.break },
        };
    }

    var swiper = new Swiper(el + ' .swiper-container', {
        pagination: pagination,
        navigation: navigation,
        autoplay: autoplay,
        loop: opt.loop === false ? false : true,
        speen: opt.speed || 500,
        slidesPerView: opt.break && opt.break > 5 ? 3 : 1,
        spaceBetween: opt.space === undefined ? 40 : opt.space,
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

    function onResize(e) {
        $(el + ' .ratio-wrap').each(function (i) {
            //.ratio마다
            var ratio = $(this).data('ratio'); // ratio는 현재 객체의 data-ratio
            var width = $(this).innerWidth(); //현재 객체의 내부 너비
            var height = width * Number(ratio); //높이는 너비에 현재 객체의 비율(data-ratio) 곱하기
            $(this).innerHeight(height); //이 객체의 내부 높이는 너비에 현재 객체의 비율을 곱한 것이다 즉, 너비에 따라서 높이 비율이 고정된다
        });
    }
    $(window).resize(onResize).trigger('resize');
    return swiper;
}

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
