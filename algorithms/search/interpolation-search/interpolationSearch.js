/**
 * 補間検索
 * @param {*[]} sortedArray - sorted array with uniformly distributed values
 * @param {*} seekElement
 * @return {number}
 */
function interpolationSearch(sortedArray, seekElement){
	let leftIndex = 0
	let rightIndex = sortedArray.length - 1
	
	while(leftIndex <= rightIndex){
		const rangeDelta = sortedArray[rightIndex] - sortedArray[lefIndex]
		const indexDelta = rightIndex - leftIndex
		const valueDelta = seekElement - sortedArray[leftIndex]

		// valueDelta が0より小さければ、その配列の一番小さい値は探したい値より大きいので存在しない
		if(valueDelta < 0){
			return -1
		}

		// rangeDeltaが0の時サブ配列は同じ要素を含んでいる。
		if(!rangeDelta){
			return sortedArray[leftIndex] === seekElement ? leftIndex : -1
		}

		const middleIndex = leftIndex + Math.floor((valueDelta * indexDelta) / rangeDelta)

		if(sortedArray[middleIndex] === seekElement){
			return middleIndex
		}

		// 次に右にの配列を探すか左の配列を探すかを判別する。
		if(sortedArray[middleIndex] < seekElement){
			// 右の配列にいく
			leftIndex = middleIndex + 1
		}else{
			//左の配列に行く
			rightIndex = middleIndex - 1
		}
	}

	return -1
}