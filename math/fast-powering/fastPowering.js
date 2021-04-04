/**
 * @param {number} base - Number that will be raised to the power.
 * @param {number} power - The power that number will be raised to.
 * @return {number}
 */

function fastPowering(base, power) {
	if(power === 0){
		// 0乗は1
		return 1
	}

	if(power % 2 === 0){
		// 指数が偶数のときn/2乗したもの同士を掛ける
		const multiplier = fastPowering(base, power / 2)
		return multiplier * multiplier
	}

	// 指数が奇数の時はn/2(切り捨て)乗したもの同士とn乗したものをかける
	const multiplier = fastPowering(base, Math.floor(power / 2))
	return multiplier * multiplier * base
}
