const pascalTriangle = require('../../math/pascal-triangle/pascalTriangle')

/**
 * @param {number} width
 * @param {number} height
 * @return {number}
 */
function uniquePath(width, height){
	const pascalLine = width + height - 2; // わからん
	const pascalLinePosition = Math.min(width, height) - 1 //わからん
	return pascalTriangle(pascalLine)[pascalLinePosition] // わからんけど紙に書いたら合ってそうだった
}

module.exports = uniquePath