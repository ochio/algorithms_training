const Sort = require('../Sort')

class SelectionSort extends Sort {
	sort(originalArray){
		// 元の配列を変更しないために複製する
		const array = [...originalArray]

		// 配列の最後は比較するものがないので - 1してる
		for(let i = 0; i < array.length - 1; i += 1){
			let minIndex = i

			this.callbacks.visitingCallback(array[i])

			// 配列の残りの部分から最小の要素を探す
			for(let j = i + 1; j < array.length; j += 1){
				this.callbacks.visitingCallback(array[j])

				if(this.comparator.lessThan(array[j], array[minIndex])){
					minIndex = j
				}
			}

			// 新しく最小のが見つかればi番目のと入れ替える。
			if(minIndex !== i){
				[array[i], array[minIndex]] = [array[minIndex], array[i]]
			}
		}

		return array
	}
}

module.exports = SelectionSort
