/**
 * 2つのセットからデカルト積を生成する
 * @param {*[]} setA
 * @param {*[]} setB
 * @return {*[]}
 */

function cartesianProduct(setA, setB){
	// 各セットが空ではないことを確認
	// 空ならnullを返す
	if(!setA || !setB || !setA.length || !setB.length) {
		return null
	}

	// 初期化
	const product = []

	for(let indexA = 0; indexA < setA.length; indexA += 1){
		for(let indexB = 0; indexB < setB.length; indexB += 1){
			product.push([setA[indexA], setB[indexB]])
		}
	}

	return product
}
