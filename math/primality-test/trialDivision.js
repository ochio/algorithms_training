/**
 * @param {number} number
 * @return {boolean}
 */
function trialDivision(number){
	if(number % 1 !== 0){  //1で割って余りが0じゃないのは整数じゃない
		return false
	}

	if(number <= 1){ //負の整数は素数ではない。1も素数ではないので1以下で比較してる
		return false
	}

	if(number <= 3){ //1は上のif文で弾かれてるので、ここで当てはまるのは2,3だけ
		return true
	}

	if(number % 2 === 0){ //偶数は素数ではない
		return false
	}

	const dividerLimit = Math.sqrt(number) // ある数字の平方根が約数の対になる折り返し地点
	for(let divider = 3; divider <= dividerLimit; divider += 2){ //偶数は上で省いているので3から割る。かつ1を足すと偶数→奇数→偶数になるが偶数ではないことは分かっているので奇数だけで割っていく。
		if(number % divider === 0){
			return false
		}
	}

	return true
}

console.log(trialDivision(20));