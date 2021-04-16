const Sort = require('../Sort')
const MinHeap = require('../../../data-structures/heap/MinHeap')

class HeapSort extends Sort {
	sort(originalArray){
		const sortedArray = []
		const minHeap = new MinHeap(this.callbacks.compareCallback)
		// ヒープの全ての要素を挿入
		originalArray.forEach(element => {
			this.callbacks.visitingCallback(element)

			minHeap.add(element)
		});

		while(!minHeap.isEmpty()){
			const nextMinElement = minHeap.poll()

			this.callbacks.visitingCallback(nextMinElement)

			sortedArray.push(nextMinElement)
		}

		return sortedArray
	}
}

module.exports = HeapSort
