/**
 * @param {number} lineNumber - zero based
 * @return {number[]}
 */

function pascalTriangle(lineNumber){
	const currentLine = [1]
	// lineNumberは行に当たる。一番上は0行目として、n行目はn個数字が入るので+1している。
	const currentLineSize = lineNumber + 1

	for(let numIndex = 1; numIndex < currentLineSize; numIndex += 1){
		currentLine[numIndex] = (currentLine[numIndex - 1] * (lineNumber - numIndex + 1)) / numIndex
	}

	return currentLine
}
