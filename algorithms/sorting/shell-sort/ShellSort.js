const Sort = require('../Sort')

class ShellSort extends Sort {
	sort(originalArray){
		const array = [...originalArray]

		// ギャップの距離を定義
		let gap = Math.floor(array.length / 2)

		// ギャップが0以上の間で比較、交換する
		while(gap > 0){
			// ギャップの数は1/2ずつ小さくなる。
			// 比較する回数は元の配列の長さ-ギャップ になる？
			for(let i = 0; i < (array.length - gap); i += 1){
				let currentIndex = i;
				// サブ配列のindexはiにgapをたす
				let gapShiftedIndex = i + gap

				while(currentIndex >= 0){
					this.callbacks.visitingCallback(array[currentIndex])

					// ギャップを足した場所にある要素と現在の要素を比較。交換
					if(this.comparator.lessThan(array[gapShiftedIndex], array[currentIndex])){
						const tmp = array[currentIndex]
						array[currentIndex] = array[gapShiftedIndex]
						array[gapShiftedIndex] = tmp
					}

					// 動かした後にまた比較するため?
					gapShiftedIndex = currentIndex 
					currentIndex -= gap
				}
			}

			// ギャップを縮める。1/2ずつ小さくなる
			gap = Math.floor(gap / 2)
			console.log(gap);
		}

		return array
	}
}

module.exports = ShellSort

const a = [1,2,3,4,5,6,111,7]
const b = new ShellSort()

console.log(b.sort(a));