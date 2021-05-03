function sortAsc(key) {
	return function (a, b) {
		return key ? a[key] - b[key] : a - b
	}
}
function sortDesc(key) {
	return function (a, b) {
		return key ? b[key] - a[key] : b - a
	}
}


// function sum(a, b, fn){     
// 	fn (a + b)
// }
// sum(10,20,function(v){ //a=10,b=20,fn=v  sum의 값을 v에 넣어 함수 실행

// })

// // 30