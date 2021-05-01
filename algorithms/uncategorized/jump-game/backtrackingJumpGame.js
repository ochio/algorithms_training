/**
 * @param {number[]} numbers - array of possible jump length.
 * @param {number} startIndex - index from where we start jumping.
 * @param {number[]} currentJumps - current jumps path.
 * @return {boolean}
 */
function backtrackingJumpGame(numbers, startIndex = 0, currentJumps = []){
	if(startIndex === numbers.length - 1){
		// 最後の要素に直接ジャンプした時が解。
		return true
	}

	// ジャンプできる最大の距離を調べる。
	const maxJumpLength = Math.min(
		numbers[startIndex], 
		numbers.length - 1 - startIndex // これ何？
	)

	for(let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1){
		const nextIndex = startIndex + jumpLength;
		currentJumps.push(nextIndex)

		const isJumpSuccessful = backtrackingJumpGame(numbers, nextIndex, currentJumps)

		// 現在のジャンプが成功ならtrueを返す
		if(isJumpSuccessful){
			return true
		}

		currentJumps.pop()
	}

	return false

}

module.exports = backtrackingJumpGame
