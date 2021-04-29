const Stack = require('../../../data-structures/stack/Stack')

/**
 * n = 0 の場合
 * 	何もしなくてよい
 * n > 0 の場合
 * 	n - 1 枚の円盤を、柱 y を利用して柱 x から 柱 z へ移す
 * 	1 枚の円盤を、柱 x から 柱 y へ移す
 * 	n - 1 枚の円盤を、柱 x を利用して柱 z から 柱 y へ移す
 */

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
	moveCallback,
	mark
}){
	console.log("numberOfDiscs", numberOfDiscs, "mark", mark);
	if(numberOfDiscs === 1){
		// ディスクの数が1つのとき
		moveCallback(fromPole.toArray(), withPole.toArray(), toPole.toArray())
		const disc = fromPole.pop()
		toPole.push(disc)
	} else {
		// 2つ以上ディスクがある時は再帰的に動かす

		// 一番下のディスク以外を移動
		hanoiTowerRecursive({
			numberOfDiscs: numberOfDiscs - 1, // numberOfDiscsが1になるまで繰り返す
			fromPole,
			withPole: toPole, // 補助のポールとして目的のポールを設定
			toPole: withPole, // 目的のポールに補助のポールを設定
			moveCallback,
			mark: "A"
		})

		// 最後の目的地へ残ったディスクを動かす
		hanoiTowerRecursive({
			numberOfDiscs: 1, // 一番上のディスクを動かした後に実行されるので、元の状態の上から二つ目が動く。
			fromPole,
			withPole, // 一つ前に動かしたディスクのところには行けないのでwithPoleのまま
			toPole, // 同様にtoPoleのまま
			moveCallback,
			mark: "B"
		})

		// 退避させてたディスク達を最終目的地へ動かす
		hanoiTowerRecursive({
			numberOfDiscs: numberOfDiscs - 1, //numberOfDisc=1はif文で処理されるのでここでは2以上
			fromPole: withPole, // 最初の処理で退避させてたところ
			withPole: fromPole, 
			toPole,
			moveCallback,
			mark: "C"
		})
		// console.log('-----------------');
	}
	// console.log("処理後の状態", fromPole.toArray(), withPole.toArray(), toPole.toArray());
	// console.log('---------------------------------------------------');
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

// function cb(a,b,c){
// 	console.log("処理前のfromPole, withPole, toPole",a, b, c);
// }

// const a = hanoiTower({
// 	numberOfDiscs: 3,
// 	moveCallback: cb,
// })
// console.log(a);