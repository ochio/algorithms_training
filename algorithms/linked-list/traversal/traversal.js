/**
 * Traversal callback function
 * @callback traversalCallback
 * @param {*} nodeValue
 */

/**
 * @param {LinkedList} linkedList
 * @param {traversalCallback} callback
 */
function traversal(linkedList, callback){
	let currentNode = linkedList.head

	while(currentNode){
		callback(currentNode.value)
		currentNode = currentNode.next
	}
}

module.exports = traversal
