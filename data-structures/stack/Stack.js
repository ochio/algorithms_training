const LinkedList = require ('../linked-list/LinkedList.js')

class Stack{
	constructor(){
		this.linkedList = new LinkedList()
	}

	/**
	 * @return {boolean}
	 */
	isEmpty(){
		// headがなければ空
		return !this.linkedList.head
	}

	/**
	 * @reutrn {*}
	 */
	peek(){
		if(this.isEmpty()){
			return null
		}

		// 先頭の要素を読み取る。削除はしない
		return this.linkedList.head.value
	}

	/**
	 * @param {*} value
	 */
	push(value){
		// スタックの一番上に置く。
		this.linkedList.prepend(value)
	}

	/**
	 * @return {*}
	 */
	pop(){
		// 最初の要素を削除する。先頭がなければnullを返す
		const removedHead = this.linkedList.deleteHead()
		return removedHead ? removedHead.value : null
	}

	/**
	 * @return {*[]}
	 */
	toArray(){
		return this.linkedList.toArray().map((linkedListNode) => linkedListNode.value)
	}

	/**
	 * @param {function} [callback]
	 * @return {string}
	 */
	toString(callback){
		return this.linkedList.toString(callback)
	}
}

module.exports = Stack
