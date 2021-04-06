/**
 * @param {number} lineNumber- zero based
 * @return {number[]}
 */

function pascalTriangleRecursive(lineNumber) {
	// 0行目は1が入ってる
	if(lineNumber === 0) {
		return [1]
	}

	// 0行目から始まるので+1する
	const currentLineSize = lineNumber + 1
	// その前の行のサイズを格納する
	const previousLineSize = currentLineSize - 1

	const currentLine = []

	// 1行前のlineNumberを入れるて再帰的に計算している
	const previousLine = pascalTriangleRecursive(lineNumber - 1)

	// その行の何項目かを判別して前の行の値を取得→足し合わせる
	for(let numIndex = 0; numIndex < currentLineSize; numIndex += 1){
		// 一番左の項以外は、一つ上のn-1項目から値をもらうのでpreviousLine[numIndex - 1]が代入される
		// 一番左の項は、右上の項からしか値をもらわないから左の項には0が代入される
		const leftCoefficient = (numIndex - 1) >= 0 ? previousLine[numIndex - 1] : 0
		// 一番右の項以外は、一つ上のn項目から値をもらうのでpreviousLine[numIndex]が代入される
		// 一番右の項は、左上の項からしか値をもらわないから右の項には0が代入される
		const rightCoefficient = numIndex < previousLineSize ? previousLine[numIndex] : 0

		// 一つ上の左の項と右の項を足したら現在の項の値が分かる
		currentLine[numIndex] = leftCoefficient + rightCoefficient
	}

	return currentLine

}
