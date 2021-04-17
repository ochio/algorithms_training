const Sort = require('../Sort')

class MergeSort extends Sort {
	sort(originalArray){
		this.callbacks.visitingCallback(null)

		// 配列が空or1個ならそのまま返す
		if(originalArray.length <= 1){
			return originalArray
		}

		// 配列を二つの値ずつに分けていく
		const middleIndex = Math.floor(originalArray.length / 2)
		const leftArray = originalArray.slice(0, middleIndex)
		const rightArray = originalArray.slice(middleIndex, originalArray.length)

		//半分に分けた配列を並び替える
		const leftSortedArray = this.sort(leftArray)
		const rightSortedArray = this.sort(rightArray)

		return this.mergeSortedArrays(leftSortedArray, rightSortedArray)
	}

	mergeSortedArrays(leftArray, rightArray){
		const sortedArray = []

		let leftIndex = 0
		let rightIndex = 0

		while(leftIndex < leftArray.length && rightIndex < rightArray.length){
			let minElement = null

			if(this.comparator.lessThanOrEqual(leftArray[leftIndex], rightArray[rightIndex])){
				minElement = leftArray[leftIndex]
				// インデックスを次の番号にする
				leftIndex += 1
			} else {
				minElement = rightArray[rightIndex]
				rightIndex += 1
			}

			// 並び替え後の配列に最小の要素を追加
			sortedArray.push(minElement)

			this.callbacks.visitingCallback(minElement)
		}

		// 残った要素を並び替え後の配列に追加
		return sortedArray
			.concat(leftArray.slice(leftIndex))
			.concat(rightArray.slice(rightIndex))

	}
}

module.exports = MergeSort
