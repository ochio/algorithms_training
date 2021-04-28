const Stack = require('../../../data-structures/stack/Stack')

/**
 * @param {number} numberOfDiscs
 * @param {Stack} fromPole
 * @param {Stack} withPole
 * @param {Stack} toPole
 * @param {function(disc: number, fromPole: number[], toPole: number[])} moveCallback
 */
function hanoiTowerRecursive({
	numberOfDiscs,
	fromPole,
	withPole,
	toPole,
	moveCallback
}){
	if(numberOfDiscs === 1){
		// ディスクの数が1つのとき
		moveCallback(fromPole.peek(), fromPole.toArray(), toPole.toArray())
		const disc = fromPole.pop()
		toPole.push(disc)
	} else {
		// 2つい上ディスクがある時は再帰的に動かす

		// 一番下のディスク以外を移動
		hanoiTowerRecursive({
			numberOfDiscs: numberOfDiscs - 1,
			fromPole,
			withPole: toPole,
			toPole: withPole,
			moveCallback
		})

		// 最後の目的地へ残ったディスクを動かす
		hanoiTowerRecursive({
			numberOfDiscs: 1,
			fromPole,
			withPole,
			toPole,
			moveCallback
		})

		// 退避させてたディスク達を最終目的地へ動かす
		hanoiTowerRecursive({
			numberOfDiscs: numberOfDiscs - 1,
			fromPole: withPole,
			withPole: fromPole,
			toPole,
			moveCallback
		})
	}
}

/**
 * @param {number} numberOfDiscs
 * @param {function(disc: number, fromPole: number[], toPole: number[])} moveCallback
 * @param {Stack} [fromPole]
 * @param {Stack} [withPole]
 * @param {Stack} [toPole]
 */
function hanoiTower({
	numberOfDiscs,
	moveCallback,
	fromPole = new Stack(),
	withPole = new Stack(),
	toPole = new Stack(),
}){
	for(let discSize = numberOfDiscs; discSize > 0; discSize -= 1){
		fromPole.push(discSize)
	}

	hanoiTowerRecursive({
		numberOfDiscs,
		fromPole,
		withPole,
		toPole,
		moveCallback
	})
}

module.exports = hanoiTower
