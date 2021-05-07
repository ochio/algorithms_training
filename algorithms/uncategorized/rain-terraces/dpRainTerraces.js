/**
 * ダイナミックプログラミング版
 * 
 * @param {number[]} terraces
 * @return {number}
 */
function dpRainTerraces(terraces){
	let waterAmount = 0

	// 左右から走査した時の最大の高さの場所を保持するために一旦初期化
	const leftMaxLevels = new Array(terraces.length).fill(0);
	const rightMaxLevels = new Array(terraces.length).fill(0);

	// 左から見て最大の高さの列を探す
	[leftMaxLevels[0]] = terraces // terracsの1番目をleftMaxLevelsの0番目に代入
	for(let terraceIndex = 1; terraceIndex < terraces.length; terraceIndex += 1){ // 一番左から二つ目から始める。
		leftMaxLevels[terraceIndex] = Math.max(
			terraces[terraceIndex],
			leftMaxLevels[terraceIndex - 1] // leftMaxLevels[terraceIndex - 1]番目までで最大のが入ってるのでterraces[terraceIndex]が今までのより大きければそっちで更新される。
		)
	}

	// 右から見て最大の高さの列を探す
	rightMaxLevels[terraces.length - 1] = terraces[terraces.length - 1] // terracsの末尾をrightMaxLevelsの末尾に代入
	for(let terraceIndex = terraces.length - 2; terraceIndex >= 0; terraceIndex -= 1){ // 一番右から二つ目から始める。
		rightMaxLevels[terraceIndex] = Math.max(
			terraces[terraceIndex],
			rightMaxLevels[terraceIndex + 1]
		)
	}

	for(let terraceIndex = 0; terraceIndex < terraces.length; terraceIndex += 1){
		const curretnTerraceBoundary = Math.min( // どの高さが水が溜まる高さの最大か調べる。
			leftMaxLevels[terraceIndex],
			rightMaxLevels[terraceIndex]
		)

		if(curretnTerraceBoundary > terraces[terraceIndex]){
			waterAmount += curretnTerraceBoundary - terraces[terraceIndex] // その列の溜まる最大 - その列の高さ = 実際の水の量
		}
	}

	return waterAmount
}

module.exports = dpRainTerraces
