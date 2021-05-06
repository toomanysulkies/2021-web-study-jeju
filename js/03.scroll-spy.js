/*scroll spy 윈도우에 스크롤이 일어날 때마다 함수 실행!!
1. 선행학습 : dimension에 대한 완벽한 이해 필요!! 
- width(), innerWidth(), outerWidth(), outerWidth(true)
- height(), innerHeight(), innerWidth(), innerWidth(true)*/


/*************** 글로벌 설정 *****************/


/*************** 사용자 함수 *****************/


/*************** 이벤트 등록 *****************/
$(window).scroll(onScroll)


/*************** 이벤트 콜백 *****************/
function onScroll() {
	var windowHeight = $(this).innerHeight();
	var pageOffset = []
// console.log('windowHeight:', windowHeight)
// console.log('scrollTop:', scrollTop)
// console.log('pageOffset:', pageOffset)
	var scrollTop = $(this).scrollTop()
	for (var i = 0; i < $('.page').length; i++){ //page의 개수만큼 반복문
		pageOffset[i] = $('.page').eq(i).offset().top//문서로부터 page가 떨어져있는 간격을 pageOffest 배열에 넣는다(페이지와 페이지 옵셋값끼리)

		if (scrollTop >= pageOffset[3]) {		
		}
		else if (scrollTop >= pageOffset[2]) {			
		}
		else if (scrollTop >= pageOffset[1]) {
		}
		else {			
		}
	}
}
