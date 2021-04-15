const Comparator = require('../../utils/comparator/Comparator')
const Sort = require('../../utils/comparator/Comparator')

/**
 * ヒープの親クラス
 */
class Heap {
	/**
	 * @constructs Heap
	 * @param {Function} [comparatorFunction]
	 */
	constructor(comparatorFunction){
		if(new.target === Heap){
			throw new TypeError('Cannot construct Heap instance directly')
		}

		this.heapContainer = []
		this.compare = new Comparator(comparatorFunction)
	}

	/**
	 * @param {number} parentIndex
	 * @return {number}
	 */
	getLeftChildIndex(parentIndex){
		return (2 * parentIndex) + 1
	}

	/**
	 * @param {number} parentIndex
	 * @return {number}
	 */
	getRightChildIndex(parentIndex){
		return (2 * parentIndex) + 2
	}

	/**
	 * @param {number} childIndex
	 * @return {number}
	 */
	getParentIndex(childIndex){
		return Math.floor((childIndex - 1) / 2)
	}

	/**
	 * @param {number} getRightChildIndex
	 * @return {boolean}
	 */
	hasPrarent(childIndex){
		return this.getParentIndex(childIndex) >= 0
	}

	/**
	 * @param {number} parentIndex
	 * @return {boolean}
	 */
	hasLeftChild(parentIndex){
		return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
	}

	/**
	 * @param {number} parentIndex
	 * @return {boolean}
	 */
	hasRightChild(parentIndex){
		return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
	}

	/**
	 * @param {number} parentIndex
	 * @return {*}
	 */
	leftChild(parentIndex){
		return this.heapContainer[this.getLeftChildIndex(parentIndex)]
	}

	/**
	 * @param {number} parentIndex
	 * @return {*}
	 */
	rightChild(parentIndex){
		return this.heapContainer[this.getRightChildIndex(parentIndex)]
	}

	/**
	 * @param {number} indexOne
	 * @param {number} indexTwo
	 */
	swap(indexOne, indexTwo){
		const tmp = this.heapContainer[indexTwo]
		this.heapContainer[indexTwo] = this.heapContainer[indexOne]
		this.heapContainer[indexOne] = tmp
	}

	/**
	 * @return {*}
	 */
	peek(){
		if(this.heapContainer.length === 0){
			return null
		}

		return this.heapContainer[0]
	}

	/**
	 * @return {*}
	 */
	poll(){
		if(this.heapContainer.length === 0){
			return null
		}

		if(this.heapContainer.length === 1){
			return this.heapContainer.pop()
		}

		const item = this.heapContainer[0]

		// 最後の要素を末尾から先頭に持っていく
		this.heapContainer[0] = this.heapContainer.pop()
		this.heapifyDown()

		return item
	}
}
