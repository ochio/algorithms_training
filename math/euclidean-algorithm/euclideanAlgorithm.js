/**
 * 再帰的に最大公約数を見つけるユーグリッドの互除法
 * @param {number} originalA
 * @param {number} originalB
 * @return {number}
 */


// 余りを割っていくのなんで？
function euclideanAlgorithm(originalA, originalB){
// 引数の絶対値をとって自然数にする。
	const a = Math.abs(originalA)
	const b = Math.abs(originalB)

	// 合同式を使ってるらしいけど何してるか分からん
	console.log(a,"%",b, a%b);
	return (b === 0) ? a : euclideanAlgorithm(b, a % b) //→割る数を余りで割っていく
	// a < b だったら１回目で入れ替わる。a % b = a になるから。
}

console.log(euclideanAlgorithm(253,105))