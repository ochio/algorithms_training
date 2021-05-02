/**
 * @param {number[]} numbers - array of possible jump length.
 * @return {boolean}
 */
function dpBottomUpJumpGame(numbers){
	// テーブルの初期化
	const cellsGoodness = Array(numbers.length).fill(undefined)
	// 最後の要素はtrueにする
	cellsGoodness[cellsGoodness.length - 1] = true

	// 最後の要素の一つ前から走査する。（最後の要素はtrueだから）
	for(let cellIndex = numbers.length - 2; cellIndex >= 0; cellIndex -= 1){
		const maxJumpLength = Math.min(
			numbers[cellIndex],
			numbers.length - 1 -cellIndex
		)

		for(let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1){
			const nextIndex = cellIndex + jumpLength
			if(cellsGoodness[nextIndex] === true){
				cellsGoodness[cellIndex] = true
				break
			}
		}
	}

	return cellsGoodness[0] === true
}

