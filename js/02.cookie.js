/*************** 글로벌 설정 *****************/
init()

/*************** 사용자 함수 *****************/
function init()
{

	setTimeout(onModalShow,2000)
	

}
/*************** 이벤트 등록 *****************/
$('.bt-close').click(onModalHide)
$('.bt-open').click(onModalShow)

/*************** 이벤트 콜백 *****************/

function onModalShow() {
	$('.modal-wrapper').show()
	$('.modal-wrapper').css('background-color')
	$('.modal-wrapper').css('background-color','rgba(0,0,0,0.8)')
    $('.modal-wrapper .modal-wrap').css('transform')
    $('.modal-wrapper .modal-wrap').css('transform', 'translate(-50%, -50%)')
//.modal-wrap{  top: 50%; left: 50%; transform: translate(-50%, -100vh);transition: all 0.75s;} 
/*.modal-wrap의 위치 
 1. css에서 부모인 .modal-wrapper로부터 상속받은 값의 top: 50%; left: 50%;
 2. css의 transform 실행: translate(-50%, -100vh);->너비의 가운데서 위로 올라감
 3. js의  $('.modal-wrapper .modal-wrap').css('transform', 'translate(-50%, -50%)')x좌표는 그대로 y값만 내려온다.
*/                  
}

function onModalHide() {
	$('.modal-wrapper').attr('style','')
    $('.modal-wrapper .modal-wrap').attr('style','')
    //attr은 비속성 프로퍼티에 접근할 수 있게 해준다.
    //onModalHide가 실행되면 .modal-wrapper와 . modal-wrap의 style값 사라져 보이지 않게 된다.
}