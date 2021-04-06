/**
 * Calculate fibonacci number at specific position using closed form function (Binet's formula).
 * @see: https://en.wikipedia.org/wiki/Fibonacci_number#Closed-form_expression
 *
 * @param {number} position - Position number of fibonacci sequence (must be number from 1 to 75).
 * @return {number}
 */
function fibnacciClosedForm(position){
	const topMaxValidPosition = 70

	if(position < 1 || position > topMaxValidPosition){
		throw new Error(`1より大きく、${topMaxValidPosition}より小さい数字で！`)
	}

	const sqrt5 = Math.sqrt(5)
	const phi = (1 + sqrt5) / 2

	console.log(phi, "*",position,"/",sqrt5);
	console.log((phi ** position)/sqrt5);
	return Math.floor((phi ** position)/sqrt5 + 0.5) //なんで0.5足す？
}

console.log(fibnacciClosedForm(3))