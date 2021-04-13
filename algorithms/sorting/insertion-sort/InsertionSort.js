const Sort = require('../Sort')

class InsertionSort extends Sort {
	sort(originalArray){
		const array = [...originalArray]

		//全要素を走査
		for(let i = 1; i < array.length; i++){
			let currentIndex = i

			this.callbacks.visitingCallback(array[i])

			// 現在のインデックス-1があることを確認して、現在の要素と比較
			while(
				array[currentIndex - 1] !== undefined
				&& this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
			){
				this.callbacks.visitingCallback(array[currentIndex - 1]);

				[
					array[currentIndex - 1],
					array[currentIndex],
				] = [
					array[currentIndex],
					array[currentIndex - 1],
				]

				// 現在の要素の左に移動
				currentIndex -= 1
			}
		}
		return array
	}
}

module.exports = InsertionSort
