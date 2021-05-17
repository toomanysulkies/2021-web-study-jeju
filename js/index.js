/*main-wrapper에서 할 일
1. 배너가 움직인다.
2. 배너가 나타나면 그 후에 내부요소들이 animate
3. 동영상은 플레이가 끝난 이후에 다음으로 넘어간다.


/*************** main-wrapper *****************/
$(function() {


/*************** 글로벌 설정 *****************/
var $wrapper = $('.main-wrapper')  //main-wrapper의 변수 정의
var $slide = $('.main-wrapper .slide') //man-wrapper 속 슬라이드(사진과 동영상)
var len = $slide.length //mainSlide의 배열의 길이
var lastIdx = len - 1 //mainSlide들의 인덱스는 length-1
var depth = 2
var idx = 0
var interval
var gap = 3000
var speed = 500
init()

/*************** 사용자 함수 *****************/

	
		function init() {
		$slide.eq(idx).css('z-index', depth++)//후위연산자는 변수를 먼저 할당하고 계산한다. 즉 mainDepth의 값에 1을 증가시킴
		interval = setInterval(onAni, gap)
	}

/*************** 이벤트 등록 *****************/


/*************** 이벤트 콜백 *****************/
/*
onMainAni가 실행되면
조건문을 거친다 
- mainSlide가 마지막 배열의 인덱스라면 인덱스는 0,
- 아니라면 인덱스는 1씩 증가한다.

조건문을 거친 인덱스 값에 해당하는 mainSlide의 css의 z-index가 하나씩 증가한다(상위의 레이어로 올라옴)
----> 즉, 다음 사진이 window의 main-wrapper에 보인다!
*/
function onAni() {
		idx = (idx == lastIdx) ? 0 : idx + 1
		$slide.eq(idx).css('z-index', depth++)
	}

})