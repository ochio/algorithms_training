const LinkedListNode = require('./LinkedListNode')
const Comparator = require('../../utils/comparator/Comparator')

class LinkedList {
	/**
	 * @param {Function} [comparatorFunction]
	 */
	constructor(comparatorFunction){
		/** @var LinkedListNode */
		this.head = null

		/** @var LinkedListNode */
		this.tail = null

		this.compare = new Comparator(comparatorFunction)
	}

	/**
	 * 先頭にノードを挿入
	 * @param {*} value
	 * @return {LinkedList}
	 */
	prepend(value){
		// 先頭に新しいノードを追加
		const newNode = new LinkedListNode(value, this.head) //先頭に来たノードの次のは元々先頭だったノード
		this.head = newNode

		// 最後がなかったら=一つもノードがない状態で追加されたら
		if(!this.tail){
			this.tail = newNode
		}

		return this
	}

	/**
	 * @param {*} value
	 * @return {LinkedList}
	 */
	append(value){
		// 新しいノードを作成
		const newNode = new LinkedListNode(value)

		// 先頭にノードがなかったら=一つもノードがない状態で追加されたら
		if(!this.head){
			this.head = newNode
			this.tail = newNode

			return this
		}

		// 新しいノードを最後尾に追加
		this.tail.next = newNode
		this.tail = newNode

		return this
	}

	/**
	 * @param {*} value
	 * @return {LinkedListNode}
	 */
	delete(value){
		// 先頭のノードがない=リンクリストが存在しない場合
		if(!this.head){
			return null
		}

		let deletedNode = null

		// 先頭のノードが削除されたら、次のノードが繰り上がる
		while(this.head && this.compare.equal(this.head.value, value)){
			deletedNode = this.head;
			this.head = this.head.next
		}

		let currentNode = this.head
		if(currentNode !== null){
			// もし次のノードが削除されるなら「次の次のノード」を「次のノードにする」
			while(currentNode.next){
				if(this.compare.equal(currentNode.next.value, value)){
					deletedNode = currentNode.next;
					currentNode.next = currentNode.next.next
				}else{
					currentNode = currentNode.next
				}
			}
		}

		// 最後尾が削除される場合
		if(this.compare.equal(this.tail.value, value)){
			this.tail = currentNode  // ループが終わった後の処理なのでcurrentNodeには最後から2番目のノードが入っている。
		}
		return deletedNode
	}

	/**
	 * @param {Object} findParams
	 * @param {*} findParams.value
	 * @param {function} [findParams.callback]
	 * @return {LinkedListNode}
	 */
	find({ value = undefined, callback = undefined}){
		// 先頭のノードがない=リンクリストが存在しない場合
		if(!this.head){
			return null
		}

		let currentNode = this.head

		while(currentNode) {
			// コールバック関数から探す場合
			if(callback && callback(currentNode.value)){
				return currentNode
			}

			// 値から探す場合
			if(value !== undefined && this.compare.equal(currentNode.value, value)){
				return currentNode
			}

			currentNode = currentNode.next
		}

		return null
	}

	/**
	 * @return {LinkedListNode}
	 */
	deleteTail(){
		const deletedTail = this.tail

		// head と tailが等しいとき、つまりリンクリストの長さが1のとき
		if(this.head === this.tail){
			this.head = null
			this.tail = null

			return deletedTail
		}

		let currentNode = this.head
		while(currentNode.next){
			if(!currentNode.next.next){ // 最後から二つ目のノードが該当する
				currentNode.next = null // 最後尾のノードを削除して、最後から二つ目のノードが最後のノードになるから。ループも終わる
			}else{
				currentNode = currentNode.next
			}
		}

		this.tail = currentNode

		return deletedTail

	}

	/**
	 * @return {LinkedListNode}
	 */
	deleteHead(){
		// リンクリストの長さが0
		if(!this.head){
			return null
		}

		const deletedHead = this.head

		if(this.head.next){
			// リンクリストの長さが2以上
			this.head = this.head.next
		}else{
			// リンクリストの長さが1
			this.head = null
			this.tail = null
		}

		return deletedHead
	}

	/**
	 * @param {*[]} values - Array of values that need to be converted to linked list
	 * @return {LinkedList}
	 */
	fromArray(values){
		values.forEach((value) => this.append(value))

		return this
	}

	/**
	 * @return {LinkedListNode[]}
	 */
	toArray(){
		const nodes = []

		let currentNode = this.head
		while(currentNode){
			nodes.push(currentNode)
			currentNode = currentNode.next
		}

		return nodes
	}

	/**
	 * @param {function} [callback]
	 * @return {string}
	 */
	toString(callback){
		return this.toArray().map((node) => node.toString(callback)).toString()
	}

	/**
	 * Reverse a linked list.
	 * @returns {LinkedList}
	 */
	reverse(){
		let currNode = this.head
		let prevNode = null
		let nextNode = null

		while(currNode){
			// 次のノードを保持
			nextNode = currNode.next

			// 現在のノードの次のノードを前のノードと繋がるようにする
			// 反対にする処理
			currNode.next = prevNode

			// 前のノードと現在のノードを一つ前に進める
			prevNode = currNode // 反対にする処理（の準備）
			currNode = nextNode // 元のリンクリストの走査を進める処理
		}

		this.tail = this.head
		this.head = prevNode // ループで最後に設定されたprevNodeが先頭にくる

		return this
	}
}

module.exports = LinkedList
