class Comparator {
	/**
	 * 比較する関数を引数に取る。なければデフォルトの関数を設定。
	 * @param {function(a:*, b:*)} [compareFunction]
	 */
	constructor(compareFunction){
		this.compare = compareFunction || Comparator.defaultCompareFunction
	}

	/**
	 * デフォルトの比較ロジック
	 * @param {(string | number)} a
	 * @param {(string | number)} b
	 * @returns {number}
	 */
	static defaultCompareFunction(a,b){
		// 同じ数字or同じ文字列なら0
		if(a === b){
			return 0
		}
		// 数字ならaの方が小さいと-1,大きいと1
		// 文字列ならUnicode値で比較
		return a < b ? -1 : 1
	}

	/**
	 * 引数同士が等しいか比較
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	// this.compareは比較するロジック。それが-を返せば等しい
	equal(a,b){
		return this.compare(a,b) === 0
	}

	/**
	 * aがb未満であることを確認
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	lessThan(a,b){
		return this.compare(a,b) < 0
	}

	/**
	 * aがbより大きいことを確認
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	greaterThan(a,b){
		return this.compare(a,b) > 0
	}

	/**
	 * aがb以下であることを確認
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	lessThanOrEqual(a,b){
		return this.lessThan(a,b) || this.equal(a,b)
	}

	/**
	 * aがb以上であることを確認
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	greaterThanOrEqual(a,b){
		return this.greaterThan(a,b) || this.equal(a,b)
	}

	/**
	 * 比較のするa,bを入れ替える
	 */
	reverse(){
		const compareOriginal = this.compare
		this.compare = (a,b) => compareOriginal(b,a)
	}
}

module.exports = Comparator
