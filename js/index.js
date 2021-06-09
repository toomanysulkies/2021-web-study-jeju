// main-wrapper에서 할일
// 1. 배너가 자동으로 움직인다
// 2. 동영상은 플레이가 끝난 이후에 다음으로 넘어간다
// 3. 배너가 나타나면 그 후에 내부요소들이 animation으로 나타난다

/* if(idx == lastIdx) mainIdx = 0
else idx = idx + 1 */

/* for(var i=0; i<len; i++) {
	$('<i class='pager'></i>').appendTo($pagerSlide).click(onPagerClick).addClass((idx === i) ? 'active': '')
} */

/*************** Index *****************/
$(function () {
    weather();
    setCookie();
    slideMain();
    slideDream();
    slidePromo();
    initStyle();
    slideRoom();
    slideSvc();
    slideSns();
    initContact();

    function setCookie() {
        //쿠키
        /*
        쿠키에는 두 가지의 기능이 필요하다
        1. 단순하게 쿠키를 닫아주기만 하는 기능-.bt-close
        2. 쿠키를 하루동안 아예 닫아서 보이지 않게 하는 기능-.bt-confirm
        */
        var $cookieWrapper = $('.cookie-wrapper');
        var $cookieClose = $cookieWrapper.find('.bt-close');
        var $cookieConfirm = $cookieWrapper.find('.bt-confirm');

        if ($.cookie('hideCookie') === 'Y') onCloseTodayCookie(); //만약 쿠키의 hideCookie 가 Y라면 실행(하루동안 보지 않기)

        function onCloseCookie() {
            $('.cookie-wrapper').hide();
        }
        function onCloseTodayCookie() {
            $.cookie('hideCookie', 'Y', {
                expires: 1,
                path: '/',
            });
            onCloseCookie();
        }

        $cookieClose.click(onCloseCookie); //.bt-close를 누르면 쿠키 닫기 실행
        $cookieConfirm.click(onCloseTodayCookie); //.bt-confirm를 누르면 하루동안 쿠키 보지 않기
    }

    function slideMain() {
        //메인 래퍼의 함수 (비디오)
        /*
        메인 래퍼에서 구현해야할 기능
        1. 비디오 재생
        2. 영상보기를 누르면 비디오 모달
        3. 페이저를 누르면 다음 페이지의 비디오 또는 사진이 등장
        4. 메인 하단의 인포 래퍼에 날씨와 시간 데이터를 불러오기
        */

        //지역 변수 설정
        var $slide = $('.main-wrapper .slide');
        var $pagerSlide = $('.main-wrapper .pager-slide');
        var video = $('.main-wrapper .video')[0];
        var len = $slide.length; //전체 배열 수
        var lastIdx = len - 1; //마지막 인덱스는 늘 전체 배열 빼기 1
        var depth = 2; //z-index
        var idx = 0;
        var gap = 5000; //메인 래퍼 스와이프의 시간 간격은 5초로 설정
        var speed = 500;
        var timeout;

        function onPagerClick() {
            idx = $(this).index();
            onPlay('pager');
        }

        function onModalVideo() {
            //비디오 모달 열기
            $('.modal-video').show();
        }

        function onModalVideoClose() {
            //비디오 모달 닫기
            $('.modal-video').hide();
        }
        function onLoadedVideo() {
            //비디오 속도
            if (video.readyState >= 2) {
                video.playbackRate = 4.0;
            }
        }

        function onAni() {
            //비디오 플레이 실행 함수 ani
            $(this).addClass('active'); //지금 객체에 액티브 클래스 실행
            video.currentTime = 0; //0초부터 시작
            if ($slide.eq(idx).hasClass('is-video')) video.play();
            //현재 인덱스의 객체가 클래스is-video를 가지고 있다면 비디오 재생
            else {
                //아니라면 타임아웃
                clearTimeout(timeout);
                timeout = setTimeout(onPlay, gap);
            }
        }

        function onPlay(e) {
            //페이저 클릭 시
            if (e !== 'pager') idx = idx == lastIdx ? 0 : idx + 1;
            $pagerSlide.find('.pager').removeClass('active');
            $pagerSlide.find('.pager').eq(idx).addClass('active');
            $slide.eq(idx).css({
                'z-index': depth++,
                left: '100%',
            });
            $slide.removeClass('active');
            $slide.eq(idx).stop().animate(
                {
                    left: 0,
                },
                speed,
                onAni
            );
        }

        $slide.eq(idx).css('z-index', depth++);
        $slide.eq(idx).addClass('active');
        for (var i = 0; i < len; i++) $pagerSlide.append('<i class="pager"></i>');
        $pagerSlide.find('.pager').click(onPagerClick);
        $pagerSlide.find('.pager').eq(idx).addClass('active');
        video.addEventListener('loadeddata', onLoadedVideo);
        video.addEventListener('ended', onPlay);
        $('.bt-video').click(onModalVideo); //비디오 플레이 버튼 누르면 비디오 모달열기
        $('.modal-video').find('.bt-close').click(onModalVideoClose); //비디오 모달 열린 상태에서 닫기 누르면 비디오 모달 닫기

        video.addEventListener('loadedmetadata', onAni);
    }

    function weather() {
        var $weather = $('.main-wrapper .weather');
        var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
        var weatherData = {
            appid: '02efdd64bdc14b279bc91d9247db4722',
            units: 'metric',
        };
        var weatherIcon = {
            i01d: 'bi-brightness-high',
            i01n: 'bi-brightness-high-fill',
            i02d: 'bi-cloud-sun',
            i02n: 'bi-cloud-sun-fill',
            i03d: 'bi-cloud',
            i03n: 'bi-cloud-fill',
            i04d: 'bi-clouds',
            i04n: 'bi-cloud-fills',
            i09d: 'bi-cloud-rain-heavy',
            i09n: 'bi-cloud-rain-heavy-fill',
            i10d: 'bi-cloud-drizzle',
            i10n: 'bi-cloud-drizzle-fill',
            i11d: 'bi-cloud-lightning',
            i11n: 'bi-cloud-lightning-fill',
            i13d: 'bi-cloud-snow',
            i13n: 'bi-cloud-snow-fill',
            i50d: 'bi-cloud-haze',
            i50n: 'bi-cloud-haze-fill',
        };

        function onGetWeather(r) {
            // console.log(r);
            $weather.find('.icon').addClass(weatherIcon['i' + r.weather[0].icon]);
            $weather.find('.temp').text(r.main.temp);
            $weather.find('.date').text(moment(r.dt * 1000).format('YYYY. M. D. ddd'));
            $weather.find('.time > span').text(moment(r.dt * 1000).format('hh:mm'));
            $weather.find('.time > small').text(moment(r.dt * 1000).format('A'));
        }

        function onGetGeo(r) {
            weatherData.lat = r.coords.latitude;
            weatherData.lon = r.coords.longitude;
            $.get(weatherURL, weatherData, onGetWeather);
        }

        function onErrorGeo() {
            weatherData.lat = 33.485739737138786;
            weatherData.lon = 126.48154043372092;
            $.get(weatherURL, weatherData, onGetWeather);
        }
        // 위치정보 가져오기(못 가져오면 제주도 보이기 33.485739737138786, 126.48154043372092)
        navigator.geolocation.getCurrentPosition(onGetGeo, onErrorGeo);
    }

    function slideDream() {
        var swiper = getSwiper(' .dream-wrapper', { break: 3 });
    }

    function slidePromo() {
        var $promoWrapper = $('.promo-wrapper');
        $slideWrapper = $promoWrapper.find('.slide-wrapper');
        function onGetData(r) {
            // for (var i = 0; i < r.promo.length; i++){}  아래와 같은 다른 표현 방식
            r.promo.forEach(function (v, i) {
                //파라미터 순서 반드시 밸류 다음 인덱스
                var html = '';
                html += '<li class="slide swiper-slide">';
                html += '<div class="img-wrap ratio-wrap" data-ratio="1">';
                html += '<div class="ratio-bg" style="background-image: url(' + v.src + ');"></div>';
                html += '</div>';
                html += '<div class="cont-wrap">';
                html += '<h3 class="title">' + v.title + '</h3>';
                html += '<div class="desc">' + v.desc + '</div>';
                html += '</div>';
                html += '</li>';
                $slideWrapper.append(html);
            });

            var swiper = getSwiper('.promo-wrapper', { break: 4, pager: false }); //스와이퍼 만들 때 이 한줄이면 끝!
            /*
            util.js에서 가져온 getSwiper 함수
            container('.promo-wrapper .swiper-container)에 적용한다
            변화 옵션값은 break:4
        
        
                                                       */
        }
        $.get('../json/promotion.json', onGetData);
    }

    function initStyle() {
        $(window).resize(onResize).trigger('resize');
        function onResize() {
            $(' .style-wrapper .ratio-wrap').each(function (i) {
                var ratio = $(this).data('ratio');
                var width = $(this).innerWidth();
                var height = width * Number(ratio);
                $(this).innerHeight(height);
            });
        }
    }

    function slideRoom() {
        /*
        1. 클릭하면 다음 슬라이드로 slideChange(현재 활성 슬라이드 변경 후 이벤트 실행)
        2. desc 내려간다  onBefore(이벤트) / onBefore은 active 클래스를 제거한다.  (active가 활성화되면 moving-box=desc를 올라오게 한다) 
        즉 {transform:translate(100%)}가 되어 desc 내려오게 된다.
        3. 그리고 바로 다음 슬라이드 올라오면 slideChangeTransitionEnd 다른 슬라이드로 애니메이션 후 이벤트 실행
        4. 다음 슬라이드에 해당하는 desc 올라온다 onAfter(이벤트)active 클래스를 추가 =>{transform:translate(0%)}되어 moving-box 위로 올라오게 됨
        */
        var room = [], //room은 json에서 가져온 "room";[]배열
            swiper; //swiper도 지역변수 선언
        var $movingBox = $('.room-wrapper .desc-wrapper .moving-box');
        var $tag = $('.room-wrapper .desc-wrapper .tag > div');
        var $title = $('.room-wrapper .desc-wrapper .title > div');
        var $desc = $('.room-wrapper .desc-wrapper .desc > div');
        function onGetData(r) {
            room = r.room.slice(); //room의 배열을 하나씩 잘라서 room 안에 넣기
            console.log(room);

            showDesc(0);
        }
        swiper = getSwiper('.room-wrapper', { break: 2, speed: 600 });
        swiper.on('slideChange', onBefore); //slideChange는 swiper.API의 키워드다.
        //slideChange: 현재 활성 슬라이드가 변경되면 이벤트가 시작된다
        swiper.on('slideChangeTransitionEnd', onAfter); //slideChangeTransitionEnd:다른 슬라이드 (다음 또는 이전)로 애니메이션 후 이벤트가 시작됩니다.

        function onBefore(e) {
            $movingBox.removeClass('active'); //css에서 active는 translateY(0)-아예 밑으로 사라짐
        }
        function onAfter(e) {
            var idx = e.realIndex;
            showDesc(idx);
        }
        function showDesc(n) {
            $tag.text(room[n].tag);
            $title.text(room[n].title);
            $desc.text(room[n].desc);
            $movingBox.addClass('active');
        }

        $.get('../json/room.json', onGetData);
    }

    function slideSvc() {
        var $slideWrapper = $('.svc-wrapper .slide-wrapper');
        var swiper, lastIdx;
        function onGetData(r) {
            lastIdx = r.svc.length - 1;
            r.svc.forEach(function (v, i) {
                var html = '';
                html += '<li class="slide swiper-slide" title="' + i + '">';
                html += '<div class="img-wrap">';
                html += '<img src="' + v.src + '" alt="svc" class="w-100">';
                html += '</div>';
                html += '<h4 class="title">' + v.title + '</h4>';
                html += '</li>';
                $slideWrapper.append(html);
            });
            swiper = getSwiper('.svc-wrapper', { break: 2, speed: 600, pager: false });
            swiper.on('slideChange', onChange);
            showAni(0);
        }
        function onChange(e) {
            showAni(e.realIndex == lastIdx ? 0 : e.realIndex + 1);
        }
        function showAni(n) {
            $slideWrapper.find('.slide').removeClass('active');
            $slideWrapper.find('.slide[title="' + n + '"]').addClass('active');
        }
        $.get('../json/svc.json', onGetData);
    }

    function slideSns() {
        var $slideWrapper = $('.sns-wrapper .slide-wrapper');
        var swiper;
        function onGetData(r) {
            r.sns.forEach(function (v, i) {
                var html = '';
                html += '<li class="slide swiper-slide">';
                html += '<img src="' + v.src + '" alt="이벤트" class="w-100">';
                html += '<i class="icon fab fa-instagram"></i>';
                html += '</li>';
                $slideWrapper.append(html);
            });
            swiper = getSwiper('.sns-wrapper', { break: 7, pager: false, space: 0 });
        }
        $.get('../json/sns.json', onGetData);
    }
    function initContact() {
        /******************Global******************/
        var emailChk = false; //이메일 검증을 통과했는가?
        var agreeChk = false; //이용 약관을 동의했는가?
        var $form = $('.contact-wrapper .mail-form'); //mail-form은  form-input과 form-check의 부모
        var $input = $('.contact-wrapper .mail-input'); //form-input의 자식 - 이메일 입력창
        var $button = $('.contact-wrapper .mail-send'); //form-input의 자식 - 이메일 전송 버튼
        var $alert = $('.contact-wrapper .valid-alert'); //form-check의 자식 -이메일 오류 경고창
        var $check = $('.contact-wrapper .agree-mail'); //form-check의 자식 - 이용약관동의

        /******************Event Init******************/
        $input.blur(onBlur); // 이메일 입력 이후 경고창 활성화/비활성화 함수
        $check.change(onChange);
        $form.submit(onSubmit);

        /******************Event Callback******************/

        function onBlur() {
            //경고창 함수
            var email = $(this).val().trim(); //변수 email은 지금 value의 공백이 제거된 것
            if (validEmail(email)) {
                //만약 현재 입력된 이메일의 공백이 제거된 것이 이메일 정규식과 매치된다면,
                emailChk = true; //이메일 체크 통과
                $alert.removeClass('active'); //경고창은 비활성화
            } else {
                /*validEmail은 이메일 정규식과 value가 매치된 것이면 true   */
                emailChk = false; //아니라면 이메일체크 실패
                $alert.addClass('active'); //경고창 활성화
            }
            changeButton(); //버튼 활성화 함수
        }

        function onChange() {
            agreeChk = $(this).is(':checked'); //이 체크박스가 체크되면 약관 동의
            changeButton(); //버튼 활성화 함수
        }

        function onSubmit(e) {
            e.preventDefault(); // submit이므로 전송되어야 하는데 전송기능을 막는다.
            $form[0].contact_number.value = (Math.random() * 100000) | 0;
            emailjs.sendForm('service_gmail', 'template_gmail', this).then(
                function () {
                    console.log('SUCCESS!');
                },
                function (error) {
                    console.log('FAILED...', error);
                }
            );
            return false;
        }

        function changeButton() {
            if (emailChk && agreeChk) {
                // 만약 이메일체크와 약관동의 체크 둘 다 통과라면,
                $button.addClass('active'); //전송 버튼의 효과 활성화
                $button.attr('disabled', false); //버튼 속성의 disabled 비활성화
            } else {
                //위와 반대
                $button.removeClass('active');
                $button.attr('disabled', true);
            }
        }
        /******************User Function******************/
        emailjs.init('user_qy9VVDk0BDS9SmFEEMW4h');
        /******************Global******************/
    }
});
