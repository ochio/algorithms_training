/**
 * ダイナミックプログラミング版
 * 
 * @param {number[]} terraces
 * @return {number}
 */
function dpRainTerraces(terraces){
	let waterAmount = 0

	// 左右から走査した時の最大の高さの場所を保持するために一旦初期化
	const leftMaxLevels = new Array(terraces.length).fill(0)
	const rightMaxLevels = new Array(terraces.length).fill(0)

	// 左から見て最大の高さの列を探す
	[leftMaxLevels[0]] = terraces
	for(let terraceIndex = 1; terraceIndex < terraces.length; terraceIndex += 1){
		leftMaxLevels[terraceIndex] = Math.max(
			terraces[terraceIndex],
			leftMaxLevels[terraceIndex - 1]
		)
	}

	// 右から見て最大の高さの列を探す
	rightMaxLevels[terraces.length - 1] = terraces[terraces.length - 1]
	for(let terraceIndex = terraces.length - 2; terraceIndex >= 0; terraceIndex -= 1){
		rightMaxLevels[terraceIndex] = Math.max(
			terraces[terraceIndex],
			rightMaxLevels[terraceIndex + 1]
		)
	}

	for(let terraceIndex = 0; terraceIndex < terraces.length; terraceIndex += 1){
		const curretnTerraceBoundary = Math.min(
			leftMaxLevels[terraceIndex],
			rightMaxLevels[terraceIndex]
		)

		if(curretnTerraceBoundary > terraces[terraceIndex]){
			waterAmount += curretnTerraceBoundary - terraces[terraceIndex]
		}
	}

	return waterAmount
}

module.exports = dpRainTerraces

console.log(dpRainTerraces([3, 0, 0, 2, 0, 4]));
