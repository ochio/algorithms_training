const MergeSort = require('../merge-sort/MergeSort')
const Sort = require('../Sort')

class QuickSort extends Sort {
	/**
	 * @param {*[]} originalArray
	 * @return {*[]}
	 */
	sort(originalArray){
		//変更が元の配列に影響しないように複製
		const array = [...originalArray]

		// 配列の長さが1or0なら並び替える必要ない
		if(array.length <= 1){
			return array
		}

		// 左と右の配列の初期化
		const leftArray = []
		const rightArray = []

		// 配列の最初の要素をピボットとして取得
		const pivotElement = array.shift()
		const centerArray = [pivotElement]

		while(array.length){
			const currentElement = array.shift()

			this.callbacks.visitingCallback(currentElement)

			if(this.comparator.equal(currentElement, pivotElement)){
				centerArray.push(currentElement)
			}else if(this.comparator.lessThan(currentElement, pivotElement)){
				leftArray.push(currentElement)
			}else{
				rightArray.push(currentElement)
			}
		}

		const leftArraySorted = this.sort(leftArray)
		const rightArraySorted = this.sort(rightArray)

		return leftArraySorted.concat(centerArray, rightArraySorted)
	}
}

module.exports = MergeSort
