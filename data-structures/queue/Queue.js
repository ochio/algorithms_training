const LinkedList = require('../linked-list/LinkedList')

class Queue{
	constructor(){
		this.linkedList = new LinkedList()
	}

	/**
	 * @return {boolean}
	 */
	isEmpty(){
		return !this.linkedList.head
	}

	/**
	 * 先頭の要素を取り除かずに読み取る。
	 * @return {*}
	 */
	peek(){
		if(!this.linkedList.head){
			return null
		}

		return this.linkedList.head.value
	}

	/**
	 * 末尾に要素を追加する。
	 * @param {*} value
	 */
	enqueue(value){
		this.linkedList.append(value)
	}

	/**
	 * 先頭の要素を取り除く。キューが空ならnullを返す。
	 * @return {*}
	 */
	dequeue(){
		const removeHead = this.linkedList.deleteHead()
		return removeHead ? removeHead.value : null
	}

	/**
	 * @param [callback]
	 * @return {string}
	 */
	toString(callback){
		return this.linkedList.toString(callback)
	}

}

module.exports = Queue
