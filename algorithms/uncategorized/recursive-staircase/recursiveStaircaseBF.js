/**
 * Recursive Staircase Problem 総当たり版
 * 
 * @param {number} stairsNum - Number of stairs to climb on.
 * @return {number} - Number of ways to climb a staircase.
 */
function recursiveStaircaseBF(stairsNum){
	if(stairsNum <= 0){
		// 階段がないので0通り
		return 0
	}

	if(stairsNum === 1){
		// 1段登るだけなので1通り
		return 1
	}

	if(stairsNum === 2){
		// 2段の登り方は(1+1)か(2)の2通り
		return 2
	}

	// 階段を登り切るとき、最後に1段登る場合と2段登る場合がある。
	// なので1段前と2段前の数を足せばいい
	return recursiveStaircaseBF(stairsNum - 1) + recursiveStaircaseBF(stairsNum - 2)
}

module.exports = recursiveStaircaseBF
