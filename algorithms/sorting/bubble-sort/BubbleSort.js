const Sort = require('../Sort')

class BubbleSort extends Sort {
	// 継承前のSortではsortメソッドを定義していない
	sort(originalArray){
		// 入れ替えたかどうかのフラグ
		let swapped = false
		// 変更を防ぐために元の配列をクローン
		const array = [...originalArray]

		for(let i = 1; i < array.length; i += 1){
			swapped = false

			this.callbacks.visitingCallback(array[i])

			for(let j = 0; j < array.length - i; j += 1){
				this.callbacks.visitingCallback(array[j])

				// 順番が間違ってたら（次の数の方が小さければ）入れ替える
				if(this.comparator.lessThan(array[j + 1], array[j])){
					[array[j], array[j + 1]] = [array[j + 1], array[j]]

					swapped = true
				}
			}

			// 入れ替えが起きてなければ既に正しい並び順
			if(!swapped){
				return array
			}
		}

		return array
	}
}

module.exports = BubbleSort
