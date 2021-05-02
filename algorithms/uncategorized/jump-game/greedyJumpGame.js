/**
 * @param {number[]} numbers - array of possible jump length
 * @return {boolean}
 */
function greedyJumpGame(numbers){
	let leftGoodPosition = numbers.length - 1

	for(let numberIndex = numbers.length - 2; numberIndex >= 0; numberIndex -= 1){
		const maxCurrentJumpLength = numberIndex + numbers[numberIndex]
		if(maxCurrentJumpLength >= leftGoodPosition){
			leftGoodPosition = numberIndex
		}
	}

	return leftGoodPosition === 0
}

module.exports = greedyJumpGame
