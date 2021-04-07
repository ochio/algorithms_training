const Comparator = require('../../../utils/comparator/Comparator')

/**
 * 探したい要素が配列のどこにあるかを見つける
 * @param {*[]} array
 * @param {*[]} seekElement
 * @param {function(a,b)} [comparatorCallback]
 * @return {number[]}
 */
function linearSearch(array, seekElement, comparatorCallback){
	const comparator = new Comparator(comparatorCallback)
	const foundIndices = []

	array.forEach((element,index) => {
		if(comparator.equal(element, seekElement)){
			foundIndices.push(index)
		}
	})

	return foundIndices
}
