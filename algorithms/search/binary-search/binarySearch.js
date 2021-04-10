const Comparator = require('../../../utils/comparator/Comparator')

/**
 * バイナリーサーチ
 * 
 * @param {*[]} sortedArray
 * @param {*} seekElement
 * @param {function(a,b)} [comparatorCallback]
 * @return {number}
 */
function binarySearch(sortedArray, seekElement, comparatorCallback){
	const comparator = new Comparator(comparatorCallback)

	let startIndex = 0;
	let endIndex = sortedArray.length - 1;

	while(startIndex <= endIndex) {
		// 元の配列を半分にする場所のインデックス		
		const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2)
		// console.log("startIndex",startIndex,"middleIndex",middleIndex,"endIndex",endIndex);

		// 目的の値があればそのインデックスを返す
		if(comparator.equal(sortedArray[middleIndex], seekElement)){
			return middleIndex
		}

		// 元の配列を1/2して、次に探す配列が右か左か判別する。
		if(comparator.lessThan(sortedArray[middleIndex], seekElement)){
			// 右側の配列に行く
			startIndex = middleIndex + 1
		} else {
			// 左側の配列に行く
			endIndex = middleIndex - 1
		}

	}

	// 何も見つからなかったら-1返す
	return -1
}
