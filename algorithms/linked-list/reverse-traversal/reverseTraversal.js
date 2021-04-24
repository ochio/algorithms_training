/**
 * Traversal callback function
 * @callback traversalCallback
 * @param {*} nodeValue
 */

/**
 * @param {LinkedListNode} node
 * @param {traversalCallback} callback
 */
function reverseTraversalRecursive(node, callback){
	if(node){
		// コールスタックが積まれるので最後のから処理される。
		reverseTraversalRecursive(node.next, callback)
		callback(node.value)
	}
}

/**
 * @param {LinkedList} linkedList
 * @param {traversalCallback} callback
 */
function reverseTraversal(linkedList, callback){
	reverseTraversalRecursive(linkedList.head, callback)
}

module.exports = reverseTraversal
