// main-wrapper에서 할일
// 1. 배너가 자동으로 움직인다
// 2. 배너가 나타나면 그 후에 내부요소들이 animation으로 나타난다
// 3. 동영상은 플레이가 끝난 이후에 다음으로 넘어간다

	/* if(idx == lastIdx) mainIdx = 0
	else idx = idx + 1 */

/*************** main-wrapper *****************/
$(function() {

	/*************** 글로벌 설정 *****************/
	var $wrapper = $('.main-wrapper')
	var $slide = $('.main-wrapper .slide')
	var $pagerSlide = $('.main-wrapper .pager-slide')
	var video = $('.main-wrapper .video')[0]
	var len = $slide.length
	var lastIdx = len - 1
	var depth = 2
	var idx = 0
	var gap = 3000
	var speed = 500
	init()
	
	
	/*************** 사용자 함수 *****************/
	function init() {
		$slide.eq(idx).css('z-index', depth++)//현재 인덱스인 slide의 css에서 z-index가 증가한다.
		$slide.eq(idx).addClass('active')
		/*현재 인덱스인 slide에 클래스 active를 추가한다.
		css:{transform: translateY(0);
    transition-delay: 0;}
		\*/
     

		for(var i=0; i<len; i++) $pagerSlide.append('<i class="pager"></i>')//pagerSlide(=pager-slide, pager들이 있는 wrapper) 다음에 pager를 추가
		$pagerSlide.find('.pager').click(onPagerClick)//pager-slide 안의 pager를 누르면 onPagerClick 실행
		$pagerSlide.find('.pager').eq(idx).addClass('active')//pager 중에서  전달받은 인덱스에 해당하는 pager에 클래스 active를 추가한다.

		/* for(var i=0; i<len; i++) {
			$('<i class="pager"></i>').appendTo($pagerSlide).click(onPagerClick).addClass((idx === i) ? 'active': '')
		} */
		ani()
	}


	/*************** 이벤트 등록 *****************/

	video.addEventListener('loadeddata', onLoadedVideo)
	video.addEventListener('ended', onPlay)
	$('.bt-video').click(onModalVideo)
	$('.modal-video').find('.bt-close').click(onModalVideoClose)
	$('.cookie-wrapper').find('.bt-close').click(onCookieClose)

	/*************** 이벤트 콜백 *****************/
	function onPagerClick() {
		idx = $(this).index()
		$pagerSlide.find('.pager').removeClass('active')
		$(this).addClass('active')

		onPlay('pager')
	}
	function onCookieClose() {
		$('.cookie-wrapper').hide()
}


	function onModalVideo() {
	$('.modal-video').show()
}
	function onModalVideoClose() {
	$('.modal-video').hide()
}



	function onLoadedVideo() {
		if(video.readyState >= 2) {
			video.playbackRate = 4.0
		}
	}
	
	function ani() {
		$(this).addClass('active')
		video.currentTime = 0
		if($slide.eq(idx).hasClass('is-video')) video.play()
		else setTimeout(onPlay, gap)
	}

	function onPlay() {
		idx = (idx == lastIdx) ? 0 : idx + 1
		$slide.eq(idx).css({ 'z-index': depth++, 'left': '100%' })
		$slide.removeClass('active')
		$slide.eq(idx).stop().animate({'left': 0}, speed, ani)
	}

})
