/**
 * @param {*[][]} originalMatrix
 * @return {*[][]}
 */
function squareMatrixRotation(originalMatrix){
	const matrix = originalMatrix.slice()

	// 斜めの入れ替え
	for(let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1){
		for(let columnIndex = rowIndex + 1; columnIndex < matrix.length; columnIndex += 1){
			// 入れ替え
			[
				matrix[columnIndex][rowIndex],
				matrix[rowIndex][columnIndex]
			] = [
				matrix[rowIndex][columnIndex],
				matrix[columnIndex][rowIndex]
			]
		}
	}

	// console.log(1,matrix);

	// 横の入れ替え
	for(let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1){
		for(let columnIndex = 0; columnIndex < matrix.length / 2; columnIndex += 1){ // その行での入れ替えになるから、行の半分の長さまでが実行回数になる。
			// 入れ替え
			[
				matrix[rowIndex][matrix.length - columnIndex - 1],
				matrix[rowIndex][columnIndex]
			] = [
				matrix[rowIndex][columnIndex],
				matrix[rowIndex][matrix.length - columnIndex - 1]
			]
		}
	}

	// console.log(2,matrix);

	return matrix
}

module.exports = squareMatrixRotation

// const a = [
// [1, 2, 3, 4],
// [5, 6, 7, 8],
// [9, 10, 11, 12],
// [13, 14, 15, 16]
// ]
// console.log('0',a);
// squareMatrixRotation(a)