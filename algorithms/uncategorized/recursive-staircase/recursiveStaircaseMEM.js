/**
 * Recursive Staircase Problem メモ化
 *
 * @param {number} totalStairs - Number of stairs to climb on.
 * @return {number} - Number of ways to climb a staircase.
 */
function recursiveStaircaseMEM(totalStairs){
	// 計算結果を保持するためのメモテーブル
	const memo = []

	const getSteps = (stairsNum) => {
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

		// すでに計算してたら繰り返しの処理を省く
		if(memo[stairsNum]){
			return memo[stairsNum]
		}

		memo[stairsNum] = getSteps(stairsNum - 1) + getSteps(stairsNum - 2)

		return memo[stairsNum]
	}

	return getSteps(totalStairs)
}

module.exports = recursiveStaircaseMEM
