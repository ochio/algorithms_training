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
