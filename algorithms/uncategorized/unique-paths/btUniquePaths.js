/**
 * @param {number} width - Width of board.
 * @param {number} height - Height of the board.
 * @param {number[][]} steps - The steps that have been already made.
 * @param {number} uniqueSteps - Total number of unique steps.
 * @return {number} - Number of unique paths.
 */
function btUniquePaths(width, height, steps = [[0,0]], uniqueSteps = 0){
	const currentPos = steps[steps.length - 1]

	// ゴールにいるか確認
	if(currentPos[0] === width - 1 && currentPos[1] === height - 1){
		// ゴールについてたらuniqueStepsの数を増やす
		return uniqueSteps + 1
	}

	let rightUniqueSteps = 0
	let downUniqueSteps = 0

	if(currentPos[0] < width - 1){
		steps.push([
			currentPos[0] + 1,
			currentPos[1]
		])

		rightUniqueSteps = btUniquePaths(width, height, steps, uniqueSteps)

		steps.pop()
	}

	if(currentPos[1] < height - 1){
		steps.push([
			currentPos[0],
			currentPos[1] + 1
		])

		downUniqueSteps = btUniquePaths(width, height, steps, uniqueSteps)

		steps.pop()
	}

	return rightUniqueSteps + downUniqueSteps
}

module.exports = btUniquePaths
