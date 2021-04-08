const Comparator = require('../../../utils/comparator/Comparator')

/**
 * @param {*[]} sortedArray
 * @param {*} seekElement
 * @param {function(a,b)} [comparatorCallback]
 * @return {number}
 */
function jumpSearch(sortedArray, seekElement, comparatorCallback){
	const comparator = new Comparator(comparatorCallback)
	const arraySize = sortedArray.length

	// 空配列の時は-1を返す
	if(!arraySize){
		return -1
	}

	// 最大で((arraySize/jumpSize) + jumpSize - 1)回計算する。
	// 配列の長さをjumpSizeで割って、割られた塊の長さはjumpSizeと同じ。最後の一個が目的の値の場合が最大でその時の回数がjumpSize - 1回
	// ((arraySize/jumpSize) + jumpSize - 1)が最小になるのはjumpSize = √array.length.
	const jumpSize = Math.floor(Math.sqrt(arraySize))

	let blockStart = 0;
	let blockEnd = jumpSize
	// 目的の値 < 区切った塊の最初の値 まで計算
	while(comparator.greaterThan(seekElement, sortedArray[Math.min(blockEnd, arraySize) - 1])){
		blockStart = blockEnd
		blockEnd += jumpSize
		console.log('blockStart',blockStart,"blockEnd", blockEnd);

		// 次の塊が配列の長さより大きければ目的の値はなかった
		if(blockStart > arraySize){
			return -1
		}
	}

	// 目的の値 < 区切った塊の最初の値 なる一つ手前の配列のインデックスが入る
	let currentIndex = blockStart
	// 現在のインデックスが塊の大きさか配列の長さより小さい間で計算
	while(currentIndex < Math.min(blockEnd, arraySize)){
		if(comparator.equal(sortedArray[currentIndex], seekElement)){
			return currentIndex
		}

		// なかったら次のインデックスへ
		currentIndex += 1
	}

	return -1
}
