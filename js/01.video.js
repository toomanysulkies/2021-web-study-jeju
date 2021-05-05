var options = {
	videoURL: 'MxvQCa2cEGU', //동영상의 소유자가 엠베드를 허용하지 않은 경우 재생이 안될 수 있다. 콘솔 창에 ypotube nocookie뜸!!! 
	containment: '.video-wrapper2',
	autoPlay: true,
	mute: true,
	startAt: 0,
	opacity: 1,
	loop: true,
	ratio: 'auto',
	addRaster: false,
	showControls: false,
	showYTLogo: false,


}
$('#youtubeBg').YTPlayer(options);

var $video = $('.video-wrapper video')
$('window').resize(onResize)
function onResize() {
	var windowWidth = $(this).innerWidth()
	var videoWidth = $video.innerWidth();
	if (windowWidth < videoWidth) {
		$video.css({ 'width': '100%', 'height': 'auto' })
		//즉 윈도우의 크기가 동영상의 크기보다 작으면 너비값을 100%로 맞춰라

	}
	else {
		$video.css({ 'height': '100%', 'width': 'auto' })
	}
}



// jQuery(function () {
// 	jQuery("#[playerID]").YTPlayer();
// });
