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
	 //notice-wrapper의 바깥높이는  noticeHeight	
	if (scTop == 0) {
		$notice.show()//notice-wrapper는 보이고
		$link.show()//'.link-wrappert도 보인다.
		$header.css('top', 'unset')
	}
	else if ( scTop < 150 ) { //스크롤이 내려가면
		$notice.hide() //notice-wrapper는 숨겨지고
		$link.hide()	//.link-wrapper도 숨겨진다
		
	}
	else {
		$notice.hide()
		$link.hide()
		headerHeight = $header.outerHeight()
		$header.css({ 'top':-headerHeight + 'px'})

	}
}

function scrollHeader(scTop) {
   	var linkHeight = $('.link-wrapper').outerHeight()
		var headerHeight = $('.header-wrapper').outerHeight()
	
	if (headerHeight < scTop) {//window의 scroll 위치가 header-wrapper의 높이값밑으로 내려가면

		$('.header-wrapper').stop().animate({ 'top': 0 }, 200, function(){$('.header-wrapper').css({ 'position': 'fixed', 'top':0}) })//header-wrapper의 position은 높이 0에 고정된다.
	}
	else {//100미만으로 내려가면
		$('.header-wrapper').css({ 'position': 'absolute', 'top': 'unset' })//position은 부모인 body에 고정되고 top은 초깃값을 유지한다(부모로부터 상속값이 없으면 초깃값유지)
}
}





/*************** 이벤트 등록 *****************/
$(window).scroll(onScroll).trigger('scroll')

$('.notice-wrapper .bt-show').click(onShowNotice)
$('.notice-wrapper .bt-hide').click(onHideNotice)
$('.notice-wrapper .bt-close').click(onCloseNotice)
$('.notice-wrapper .bt-today').click(onHideTodayNotice)

$('.header-wrapper .link-lang').click(onToggleLang)
$('.header-wrapper .link-lang').mouseenter(onShowLang)
$('.header-wrapper .link-lang').mouseleave(onHideLang)
$('.header-wrapper .link-lang .lang').click(onChgLang)


/*************** 이벤트 콜백 *****************/
<<<<<<< HEAD
function onScroll(e) {
	var scTop = $(this).scrollTop()
	scrollNotice(scTop)
}

=======
function onScroll(e)
{
	var scTop = $(this).scrollTop() //여기서 this는 window, window의 scroll 위치는 변수 scTop
  scrollNotice(scTop)
	scrollHeader(scTop)

}



>>>>>>> spare
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