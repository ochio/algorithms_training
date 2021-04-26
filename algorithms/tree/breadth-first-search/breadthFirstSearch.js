const Queue = require('../../../data-structures/queue/Queue')

/**
 * @typedef {Object} Callbacks
 * @property {function (node: BinaryTreeNode, child: BinaryTreeNode): boolean} allowTraversal - Determines whether DFS should traverse from the node to its child.
 * @property {function(node: BinaryTreeNode)} enterNode - Called when DFS enters the node.
 * @property {function(node: BinaryTreeNode)} leaveNode - Called when DFS leaves the node.
 */

/**
 * @param {Callbacks} [callbacks]
 * @returns {Callbacks}
 */
function initCallbacks(callbacks = {}){
	const initiatedCallback = callbacks

	const stubCallback = () => {}
	const defaultAllowTraversal = () => true

	initiatedCallback.allowTraversal = callbacks.allowTraversal || defaultAllowTraversal;
	initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
	initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;

	return initiatedCallback
}

/**
 * @param {BinaryTreeNode} rootNode
 * @param {Callbacks} [originalCallbacks]
 */
function breadthFirstSearch(rootNode, originalCallbacks){
	const callbacks = initCallbacks(originalCallbacks)
	const nodeQueue = new Queue()

	nodeQueue.enqueue(rootNode)
	console.log(rootNode);

	while(!nodeQueue.isEmpty()){
		const currentNode = nodeQueue.dequeue()

		callbacks.enterNode(currentNode)

		if(currentNode.left && callbacks.allowTraversal(currentNode, currentNode.left)){
			nodeQueue.enqueue(currentNode.left)
		}

		if(currentNode.right && callbacks.allowTraversal(currentNode, currentNode.right)){
			nodeQueue.enqueue(currentNode.right)
		}

		callbacks.leaveNode(currentNode)
	}
}

module.exports = breadthFirstSearch