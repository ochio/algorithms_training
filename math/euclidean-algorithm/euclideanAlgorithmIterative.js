/**
 * 反復する版のユーグリッドの互除法
 * @param {number} originalA
 * @param {number} originalB
 * @return {number}
 */

function euclideanAlgorithmIterative(originalA, originalB){
	// 引数の絶対値をとって正の数にする
	let a = Math.abs(originalA)
	let b = Math.abs(originalB)

	// aとbが0ではなくて a = b じゃないとき
	while(a && b && a !== b) {
		console.log(a,b);
		[a,b]  = a > b ? [a - b, b] : [a, b - a]
	}

	return a || b
}

console.log(
euclideanAlgorithmIterative(252, 21)
);