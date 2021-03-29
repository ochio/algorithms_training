const euclideanAlgorithm = require('../euclidean-algorithm/euclideanAlgorithm')
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

function leastCommonMultiple(a,b){
	// 絶対値を掛けたもの ÷ 最大公約数で求められる
	// aとbを構成する互いに素な数字に最大公倍数を掛けたら元の数字同士を掛けたものになるから？
	// https://www.geisya.or.jp/~mwm48961/kou3/k1gcm1.htm
	return ((a === 0) || (b === 0) ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b))
}

console.log(
	leastCommonMultiple(6,4)
);