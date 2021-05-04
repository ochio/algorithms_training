/**
 * @param {number} width - Width of the board.
 * @param {number} height - Height of the board.
 * @return {number} - Number of unique paths.
 */
function dpUniquePaths(width, height) {
	// 初期化
	const board = Array(height).fill(null).map(() => {
		return Array(width).fill(0)
	})

	for(let rowIndex = 0; rowIndex < height; rowIndex += 1){
		for(let columnIndex = 0; columnIndex < width; columnIndex += 1){
			if(rowIndex === 0 || columnIndex === 0){
				board[rowIndex][columnIndex] = 1 // 0行目,0列目は１通りしか行き方がないので1が入る
			}
		}
	}

	for(let rowIndex = 1; rowIndex < height; rowIndex += 1){
		for(let columnIndex = 1; columnIndex < width; columnIndex += 1){
			const uniquesFromTop = board[rowIndex - 1][columnIndex] // そのセルの一つ上のセルの値
			const uniqueFromLeft = board[rowIndex][columnIndex - 1] // そのセルの一つ左のセルの値
			board[rowIndex][columnIndex] = uniquesFromTop + uniqueFromLeft
		}
	}

	return board[height - 1][width - 1]
}

module.exports = dpUniquePaths