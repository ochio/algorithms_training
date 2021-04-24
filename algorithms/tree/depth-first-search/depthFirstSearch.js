/**
 * @typedef {Object} TraversalCallbacks
 * @property {function(node: BinaryTreeNode, child: BinaryTreeNode): boolean} allowTraversal
 * - Determines whether DFS should traverse from the node to its child
 * 
 * @property {function(node: BinaryTreeNode)} enterNode - Called when DFS enters the node
 * @property {function(node: BinaryTreeNode)} leaveNode - Called when DFS leaves the node
 */

/**
 * コールバックが設定されてなければデフォルトのを設定する
 * @param {TraversalCallbacks} [callbacks] - The object that contains traversal callbacks.
 * @returns {TraversalCallbacks} - Traversal callbacks extended with defaults callbacks.
 */
function initCallbacks(callbacks = {}) {
	// 初期化
	const initiatedCallbacks = {}

	// コールバック関数引数に指定しない時は空のコールバックを返す
	const stubCallback = () => {}
	// コールバック関数をしていなくてもいいように、デフォルトで全要素を走査させる。
	const defaultAllowTraversalCallback = () => true

	// 引数に指定されたコールバックかデフォルトのコールバックを設定する
	initiatedCallbacks.allowTraversal = callbacks.allowTraversal || defaultAllowTraversalCallback
	initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback
	initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback
	
	return initiatedCallbacks
}

/**
 * Recursive depth-first-search traversal for binary
 * 
 * @param {BinaryTreeNode} node - binary tree node that we will start traversal from.
 * @param {TraversalCallbacks} callbacks - the object that contains traversal callbacks.
 */
function depthFirstSerchRecursive(node, callbacks){
	// 現在のノードの走査が始まることを知らせる。
	callbacks.enterNode(node)

	// 左ブランチの走査が許可されてたら左ブランチを走査
	if(node.left && callbacks.allowTraversal(node, node.left)){
		depthFirstSerchRecursive(node.left, callbacks)
	}

	// 右ブランチの走査が許可されてたら右ブランチを走査
	if(node.right && callbacks.allowTraversal(node, node.right)){
		depthFirstSerchRecursive(node.right, callbacks)
	}

	// 現在のノードとその子要素の走査が終わったことを知らせる。
	callbacks.leaveNode(node)
}

/**
 * Perform depth-first-search traversal of the rootNode.
 * For every traversal step call "allowTraversal", "enterNode" and "leaveNode" callbacks.
 * See TraversalCallbacks type definition for more details about the shape of callbacks object.
 * 
 * @param {BinaryTreeNode} rootNode - The node from which we start traversing.
 * @param {TraversalCallbacks} [callbacks] - Traversal callbacks.
 */
function depthFirstSearch(rootNode, callbacks){
	const processedCallbacks = initCallbacks(callbacks)
	depthFirstSerchRecursive(rootNode, processedCallbacks)
}

module.exports = depthFirstSearch