/**
 * 同じ長さで違う文字列同士を比べて、何文字違うか計測する。
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
function hammingDistance(a,b){
	// 引数の文字列の長さが違うならエラー
	if(a.length !== b.length){
		throw new Error('文字列の長さが違います。')
	}

	// a,bの文字列の違いの数の初期値
	let distance = 0;

	// 引数の文字列の長さ分回す
	for(let i = 0; i < a.length; i += 1){
		// １文字ずつ比べて一致しなければdistanceに+1する
		if(a[i] !== b[i]){
			distance += 1
		}

	}
	return distance
}
