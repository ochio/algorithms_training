/**
 * 総当たりで計算
 * @param {number[]} terraces
 * @return {number}
 */
function bfRainTerraces(terraces) {
	// 左右の高い列の間で水が溜まる。その高い列のうちで小さい方の高さーその列の高さ=溜まる水
	let waterAmount = 0

	for(let terraceIndex = 0; terraceIndex < terraces.length; terraceIndex += 1){ 
		let leftHighestLevel = 0
		// その列より左で一番高い列を探す
		for(let leftIndex = terraceIndex - 1; leftIndex >= 0; leftIndex -= 1){ //左に向かって探すから-1して0番目より小さくなれば終わる。
			leftHighestLevel = Math.max(leftHighestLevel, terraces[leftIndex])
		}

		let rightHighestLevel = 0
		// その列より右で一番高い列を探す
		for(let rightIndex = terraceIndex + 1; rightIndex < terraces.length; rightIndex += 1){ // 右に向かって探すから、その配列の長さより大きくなれば終わり。
			rightHighestLevel = Math.max(rightHighestLevel, terraces[rightIndex])
		}

		// 左右の一番高い列の内、低い方が水がたまる最大の高さになる。
		const terraceBoundaryLevel = Math.min(leftHighestLevel, rightHighestLevel)
		// 左右の高い列より、現在の列の方が低ければ水が溜まる。
		if(terraceBoundaryLevel > terraces[terraceIndex]){
			waterAmount += terraceBoundaryLevel - terraces[terraceIndex]
		}
	}

	return waterAmount
}

module.exports = bfRainTerraces
