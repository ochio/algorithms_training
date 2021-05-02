/**
 * メモ化して判別する
 * 
 * @param {number[]} numbers - array of possible jump length.
 * @param {number} startIndex - index from where we start jumping.
 * @param {number[]} currentJumps - current jumps path.
 * @param {boolean{}} cellsGoodness - holds information about whether cell is "good" of "bad"
 * @@return {boolean}
 */
function dpTopDownJumpGame(
	numbers,
	startIndex = 0,
	currentJumps = [],
	cellsGoodness = []
) {
	if(startIndex === numbers.length - 1){
		// 最後の要素にジャンプしてたらok
		return true
	}

	// テーブルの初期化
	const currentCellsGoodness = [...cellsGoodness]
	if(!currentCellsGoodness.length){
		numbers.forEach(() => currentCellsGoodness.push(undefined))

		// 最後の要素は最終的にたどり着きたい要素なのでgood indexである
		currentCellsGoodness[cellsGoodness.length - 1] = true
	}

	// 現在の場所からジャンプできる最長は何か探す
	const maxJumpLength = Math.min(
		numbers[startIndex], // ジャンプは配列の中でする
		numbers.length - 1 - startIndex // ジャンプが配列を越える時
	)

	for(let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1){
		const nextIndex = startIndex + jumpLength

		// goodかunknownの要素だけにジャンプする
		if(currentCellsGoodness[nextIndex] !== false){
			currentJumps.push(nextIndex)

			const isJumpSuccessful = dpTopDownJumpGame(
				numbers,
				nextIndex,
				currentJumps,
				currentCellsGoodness
			)

			if(isJumpSuccessful){
				return true
			}

			// 前の要素が成功ではなかったら次のを試す
			currentJumps.pop()

			// 現在の要素がbadであることを記録する
			currentCellsGoodness[nextIndex] = false

		}
	}

	return false
}

module.exports = dpTopDownJumpGame
