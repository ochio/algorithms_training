/**
 * @param {number} radian
 * @return {number}
 */

function radianToDegree(radian){
	// 180°=π
	// θ(ラジアン) = θ° * π / 180を変形
	return radian * (180 / Math.PI)
}
