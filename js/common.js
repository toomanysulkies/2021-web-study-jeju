/*************** 글로벌 설정 *****************/
var isHeaderAni = false
initCommon()


/*************** 사용자 함수 *****************/
function initCommon() {
	if($.cookie('hideNotice') === 'Y') onCloseNotice()
	else {
		$('.notice-wrapper').find('.notice-content').hide()
		$('.notice-wrapper').find('.bt-hide').hide()
	}
}


function scrollNotice(scTop) {
	var $notice = $('.notice-wrapper')
	var $link = $('.link-wrapper')
	var $navi = $('.navi-wrapper')
	var $header = $('.header-wrapper')
	var noticeHeight , linkHeight , naviHeight,headerHeight

	if (scTop == 0) {//window 스크롤의 위치가 0일 때
		$notice.show()
		$link.show()// notice-wrapper, link-wrappert는 보인다.
		$header.css('top', 'unset')//header-wrapper의 top은 초기값을 가진다.
		$header.removeClass('active')//header-wrapper의 active 제거(흰바탕에 검은글씨 나타나지 않음)
	}
	else if ( scTop < 150 ) { //150보다 위로 스크롤이 내려가면
		$notice.hide() 
		$link.hide()//notice-wrapper와 link-wrapper는 숨겨진다
		$header.removeClass('active')//header-wrapper의 active 제거(흰바탕에 검은글씨 나타나지 않음)
	}
	else {//150보다 밑으로 내려가면
		$notice.hide()
		$link.hide() ///notice-wrapper와 link-wrapper는 숨겨진다
		headerHeight = $header.outerHeight()
		$header.css({ 'top': -headerHeight + 'px'})//header-wrapper의 위치는 header-wrappe의 높이만큼 위로 달려 올라가 바짝 붙는다
		$header.css('top')//header-wrapper css transition과 연결됨
		$header.css({ 'top': 0 })
		$header.addClass('active')//header-wrapper의 active 할당(흰바탕에 검은글씨 나타난다)
	}
}



/*************** 이벤트 등록 *****************/
$(window).scroll(onScroll).trigger('scroll')
$('.header-wrapper .navi').mouseenter(onNaviEnter)
$('.header-wrapper .navi').mouseleave(onNaviLeave)

$('.notice-wrapper .bt-show').click(onShowNotice)
$('.notice-wrapper .bt-hide').click(onHideNotice)
$('.notice-wrapper .bt-close').click(onCloseNotice)
$('.notice-wrapper .bt-today').click(onHideTodayNotice)

$('.header-wrapper .link-lang').click(onToggleLang)
$('.header-wrapper .link-lang').mouseenter(onShowLang)
$('.header-wrapper .link-lang').mouseleave(onHideLang)
$('.header-wrapper .link-lang .lang').click(onChgLang)

/*************** 이벤트 콜백 *****************/

function onNaviEnter() {
	$('.header-wrapper .sub-wrapper').hide()
	$(this).find('.sub-wrapper').show()
	$('.header-wrapper .navi').removeClass('active')
	$(this).addClass('active')
}
function onNaviLeave() {
	$('.header-wrapper .sub-wrapper').hide()
	$('.header-wrapper .navi').removeClass('active')
}

function onScroll(e)
{
	var scTop = $(this).scrollTop() //여기서 this는 window, window의 scroll 위치는 변수 scTop
  scrollNotice(scTop)


}



function onShowNotice() {
	$('.notice-wrapper').find('.bt-show').hide()
	$('.notice-wrapper').find('.bt-hide').show()
	$('.notice-wrapper').find('.notice-content').show()
}

function onHideNotice() {
	$('.notice-wrapper').find('.bt-show').show()
	$('.notice-wrapper').find('.bt-hide').hide()
	$('.notice-wrapper').find('.notice-content').hide()
}

function onCloseNotice() {
	$('.notice-wrapper').hide()
}

function onHideTodayNotice() {
	$.cookie('hideNotice', 'Y', { expires: 1, path: '/' })
	onCloseNotice()
}

function onToggleLang() {
	$('.header-wrapper .link-lang .hover-lang').toggle()
}

function onShowLang() {
	$('.header-wrapper .link-lang .hover-lang').show()
}

function onHideLang() {
	$('.header-wrapper .link-lang .hover-lang').hide()
}

function onChgLang() {
	var $span = $(this).parent().prev().find('span')
	var myLang = $(this).text()
	var spanLang = $span.text()
	$span.text(myLang)
	$(this).text(spanLang)
}