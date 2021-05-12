


/*************** 글로벌 설정 *****************/
var video = $('.video')[0]
var $btPlay = $('.bt-play')
var $btPause = $('.bt-pause')


/*************** 사용자 함수 *****************/
function isPlay(chk) {
	if (chk) {
		$btPlay.hide()
		$btPause.show()
	}
	else {
		$btPlay.show()
		$btPause.hide()
	}
}
/*************** 이벤트 등록 *****************/
$btPlay.click(onPlay).trigger('click')
$btPause.click(onPause)
video.addEventListener('ended',onEnded)

/*************** 이벤트 콜백 *****************/
function onPlay(){
	video.play()
	// video.currentTime = 10 10초 지점부터 비디오가 시작하게 만든다
	isPlay(true)
}
function onPause(){
	video.pause()
	isPlay(false)
}
function onEnded(){

}