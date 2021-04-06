function factorial(number){
	let result = 1;

	for(let i = 2; i <= number; i+=1){
		result *= i
	}

	return result
}

console.log(factorial(3));

/**
 * @param {number} number
 * @return {number}
 */
function factorialRecursive(number){
	console.log("number",number);
	return number > 1 ? number * factorialRecursive(number - 1) : 1;
}

console.log(factorialRecursive(3));