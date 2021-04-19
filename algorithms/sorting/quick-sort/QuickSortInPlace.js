const Sort = require('../Sort')

class QuickSortInPlace extends Sort{
	/**
	 * @param {*[]} originalArray - not sorted array
	 * @param {number} inputLowIndex
	 * @param {number} inputHighIndex
	 * @param {boolean} recursiveCall
	 * @return {*[]} - sorted array
	 */
	sort(
		originalArray,
		inputLowIndex = 0,
		inputHighIndex = originalArray.length - 1,
		recursiveCall = false
	){
		// 1回目の実行なら配列コピー
		const array = recursiveCall ? originalArray : [...originalArray];

		/**
		 * partitionArray関数はlowIndexとHighIndexのサブ配列を扱う。
		 * サブ配列の任意に選ばれた最後の要素がピボットになる。
		 * そのピボットを元にサブ配列を部分的にならべかえる。
		 * partitionArray関数を実行するたびにピボットは最後に位置する要素になる。
		 * @param {number} lowIndex
		 * @param {number} highIndex
		 * @return {number}
		 */
		const partitionArray = (lowIndex, highIndex) => {
			/**
			 * swap two elements in array
			 * @param {number} leftIndex
			 * @param {number} rightIndex
			 */
			const swap = (leftIndex, rightIndex) => {
				const temp = array[leftIndex]
				array[leftIndex] = array[rightIndex]
				array[rightIndex] = temp
			}

			const pivot = array[highIndex]
			this.callbacks.visitingCallback(pivot)

			let partitionIndex = lowIndex
			for(let currentIndex = lowIndex; currentIndex < highIndex; currentIndex += 1){
				if(this.comparator.lessThan(array[currentIndex], pivot)){
					swap(partitionIndex, currentIndex)
					partitionIndex += 1
				}
			}

			swap(partitionIndex, highIndex)
			return partitionIndex
		}

		if(inputLowIndex < inputHighIndex){
			const partitionIndex = partitionArray(inputLowIndex, inputHighIndex)
			const RECURSIVE_CALL = true
			this.sort(array, inputLowIndex, partitionIndex - 1, RECURSIVE_CALL)
			this.sort(array, partitionIndex + 1,  inputHighIndex, RECURSIVE_CALL)
		}

		return array
	}
}

module.exports = QuickSortInPlace
