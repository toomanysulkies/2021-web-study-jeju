var options = {
	videoURL: 'MxvQCa2cEGU', //동영상의 소유자가 엠베드를 허용하지 않은 경우 재생이 안될 수 있다. 콘솔 창에 ypotube nocookie뜸!!! 
	containment: '.video-wrapper',
	autoPlay: true,
	mute: true,
	startAt: 0,
	opacity: 1,
	loop: true,
	ratio: '4/3',
	addRaster: false,


}
$('#youtubeBg').YTPlayer(options);



// jQuery(function () {
// 	jQuery("#[playerID]").YTPlayer();
// });
