/**
 * Recursive Staircase Problem 動的計画法
 * 1段前と2段前の数を足すのは同じ。この方法では各段の値を配列に入れて漸化式でループ
 *
 * @param {number} stairsNum - Number of stairs to climb on.
 * @return {number} - Number of ways to climb a staircase.
 */
function recursiveStaircaseDP(stairsNum) {
	if(stairsNum < 0){
		return 0
	}

	// 段数に対応する値を格納する。0段目の値も保持するので+1している。
	const steps = new Array(stairsNum + 1).fill(0)

	// 0,1,2段のとき
	steps[0] = 0
	steps[1] = 1
	steps[2] = 2

	if(stairsNum <= 2){
		// 2段以下の場合は初期化した配列の値を返す
		return steps[stairsNum]
	}

	// 3段以上の時の処理
	for(let currentStep = 3; currentStep <= stairsNum; currentStep += 1){
		steps[currentStep] = steps[currentStep - 1] + steps[currentStep - 2]
	}

	return steps[stairsNum]
}

module.exports = recursiveStaircaseDP
