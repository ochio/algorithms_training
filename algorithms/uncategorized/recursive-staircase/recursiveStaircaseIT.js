/**
 * Recursive Staircase Problem 繰り返し
 *
 * @param {number} stairsNum - Number of stairs to climb on.
 * @return {number} - Number of ways to climb a staircase.
 */
function recursiveStaircaseIT(stairsNum){
	if(stairsNum <= 0){
		// 0段以下の時は0を返す。（登る条件のみのため）
		return 0
	}

	// 初期化。1段と2段のときを定義
	const steps = [1,2]

	if(stairsNum <= 2){
		// 2段以下の時は初期化したstepsから対応するインデックスの値を返す。
		// 1段の時は0番目、2段の時は1番目
		// 0段の時は関数の最初でreturnしている。
		return steps[stairsNum - 1]
	}

	// 動的計画法と違って前の2つ分の値しか保持しない
	for(let currentStep = 3; currentStep <= stairsNum; currentStep += 1) {
		[steps[0], steps[1]] = [steps[1], steps[0] + steps[1]] // 1段前と2段前の値を更新する。
	}

	return steps[1] // step[1]には1段前と2段前が足された値が格納されている
}

module.exports = recursiveStaircaseIT

console.log(recursiveStaircaseIT(4));
