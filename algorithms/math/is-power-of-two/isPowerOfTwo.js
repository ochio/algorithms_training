/**
 * @param {number} number
 * @return {boolean}
 */

function isPowerOfTwo(number) {
	// 1 = 2^0が最小の2の累乗
	if(number<1){
		return false
	}

	// 2で割り続けて割り切れたら2の累乗と言えるのでtrueを返す。
	// dividedNumberが1だったら(割り続けて1になったら)2の累乗なのでループを抜ける。
	let dividedNumber = number
	while(dividedNumber !== 1) {
		// 2で割って余りが0じゃなかったら2の累乗ではない
		if(dividedNumber % 2 !== 0){
			return false
		}
		dividedNumber /= 2
	}

	return true
}
