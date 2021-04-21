const Sort = require('../Sort')

class CountingSort extends Sort {
	/**
	 * @param {number[]} originalArray
	 * @param {number} [smallestElement]
	 * @param {number} [biggestElement]
	 */
	sort(originalArray, smallestElement = undefined, biggestElement = undefined){
		// 最小と最大を初期化
		let detectedSmallestElement = smallestElement || 0
		let detectedBiggestElement = biggestElement || 0

		if(smallestElement === undefined || biggestElement === undefined){
			originalArray.forEach(element => {
				this.callbacks.visitingCallback(element)

				// 最大の値を見つける
				if(this.comparator.greaterThan(element, detectedBiggestElement)){
					detectedBiggestElement = element
				}

				// 最小の値を見つける
				if(this.comparator.lessThan(element, detectedSmallestElement)){
					detectedSmallestElement = element
				}
			})
		}

		// buckets arrayの初期化
		// この配列には、元の配列で各値がどれくらいの頻度であるか入れる。
		// bucketsの長さは最大ー最小+1
		const buckets = Array(detectedBiggestElement - detectedSmallestElement + 1).fill(0)

		originalArray.forEach(element => {
			this.callbacks.visitingCallback(element)

			// elementの頻度をバケットに格納
			buckets[element - detectedSmallestElement] += 1
		})
		console.log(0,buckets);

		// バケットのそのインデックスより前の数字を足す
		// 整列後の配列でバケットの頻度はそれ以前の頻度が出尽くした後から出てくる
		for(let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex += 1){
			buckets[bucketIndex] += buckets[bucketIndex - 1]
		}


		// バケットの最後の数はその数字も含めた数になるから右にシフトさせる。
		// 最後の要素を取り除く
		buckets.pop()
		// 最初に0を追加
		buckets.unshift(0)


		const sortedArray = Array(originalArray.length).fill(null)
		for(let elementIndex = 0; elementIndex < originalArray.length; elementIndex += 1){
			const element = originalArray[elementIndex]

			this.callbacks.visitingCallback(element)

			// 正しい位置を取得
			const elementSortedPosition = buckets[element - detectedSmallestElement]

			//正しい位置に置く
			sortedArray[elementSortedPosition] = element

			// 同じ数の要素が複数あった場合、連続して並べる。
			// +1しないと上書きし続けてしまう。
			buckets[element - detectedSmallestElement] += 1
		}

		return sortedArray
	}
}

module.exports = CountingSort
