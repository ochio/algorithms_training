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

	/**
	 * @param {*} item
	 * @return {Heap}
	 */
	add(item){
		// 配列の末尾にごっそり追加して
		this.heapContainer.push(item)
		// 並び替え
		this.heapifyUp()
		return this
	}

	/**
	 * @param {*} item
	 * @param {Comparator} [comparator]
	 * @return {Heap}
	 */
	remove(item, comparator = this.compare){
		// 取り除く要素の順番を取得
		const numberOfItemsToRemove = this.find(item, comparator).length

		for(let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1){
			//並び替える際にインデックスが変わり続けるので毎回取り除く要素のインデックスを見つける
			const indexToRemove = this.find(item, comparator).pop()

			// もしヒープの最後の要素を取り除くなら、そのあとに並び替える必要はない
			if(indexToRemove === (this.heapContainer.length - 1)){
				this.heapContainer.pop()
			}else{
				// ヒープの最後の要素を取り除き、空いてるところに挿入
				this.heapContainer[indexToRemove] = this.heapContainer.pop()

				const parentItem = this.parent(indexToRemove)

				// 親がないか親が正しい順番なら取り除いた後にheapdownで並び替える。
				// そうじゃなかったらheapup
				if(
					this.hasLeftChild(indexToRemove)
					&& (
						!parentItem 
						|| this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
					)
				){
					this.heapifyDown(indexToRemove)
				}else{
					this.heapifyUp(indexToRemove)
				}
			}

		}
		return this
	}

	/**
	 * @param {*} item
	 * @param {Comparator} [comparator]
	 * @return {Number[]}
	 */
	find(item, comparator = this.compare){
		const foundItemIndices = []

		for(let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1){
			if(comparator.equal(item, this.heapContainer[itemIndex])){
				foundItemIndices.push(itemIndex)
			}
		}

		return foundItemIndices
	}

	/**
	 * @return {boolean}
	 */
	isEmpty(){
		return !this.heapContainer.length
	}

	/**
	 * @return {string}
	 */
	toString(){
		return this.heapContainer.toString()
	}

	/**
	 * @param {number} [customStartIndex]
	 */
	heapifyUp(customStartIndex){
		// ヒープの最後の要素を正しい位置まで持ってくる
		let currentIndex = customStartIndex || this.heapContainer.length - 1

		while(
			this.hasPrarent(currentIndex)
			&& !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
		){
			this.swap(currentIndex, this.getParentIndex(currentIndex))
			currentIndex = this.getParentIndex(currentIndex)
		}
	}

	/**
	 * @param {number} [customStartIndex]
	 */
	heapifyDown(customStartIndex = 0){
		let currentIndex = customStartIndex;
		let nextIndex = null

		while(this.hasLeftChild(currentIndex)){
			if(
				this.hasRightChild(currentIndex) 
				&& this.pairIsInCorrectOrder(this.rightChild(currentIndex),this.leftChild(currentIndex))
			){
				nextIndex = this.getRightChildIndex(currentIndex)
			}else{
				nextIndex = this.getLeftChildIndex(currentIndex)
			}

			if(this.pairIsInCorrectOrder(
				this.heapContainer[currentIndex],
				this.heapContainer[nextIndex],
			)){
				break
			}

			this.swap(currentIndex, nextIndex)
			currentIndex = nextIndex
		}
	}

	/**
	 * ヒープの要素が正しい順番かチェックする
	 * MinHeapなら最初の要素がより小さいかイコール
	 * MaxHeapなら最初の要素がより大きいかイコール
	 * @param {*} firstElement
	 * @param {*} secondElement
	 * @return {boolean}
	 */
	pairIsInCorrectOrder(firstElement, secondElement){
		throw new Error(`You have to implement heap pair comparision method
		for ${firstElement} and ${secondElement} values.`)
	}

}
