const Heap = require('./Heap')

class MinHeap extends Heap{
	/**
	 * @param {*} firstElement
	 * @param {*} secondElement
	 * @return {boolean}
	 */
	pairIsInCorrectOrder(firstElement, secondElement){
		return this.compare.lessThanOrEqual(firstElement, secondElement)
	}
}

module.exports = MinHeap

const a = new MinHeap()
a.add(1)
a.add(3)

console.log(a);