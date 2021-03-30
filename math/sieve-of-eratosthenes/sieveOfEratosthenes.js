/**
 * @param {number} maxNumber
 * @return {number[]}
 */

function sieveOfEratosthenes(maxNumber){
	const isPrime = new Array(maxNumber + 1).fill(true) //引数の個数分の配列にtrueを代入
	isPrime[0] = false //0は素数ではない
	isPrime[1] = false //1は素数ではない

	const primes = [] //素数を入れる配列

	// 素数は2以上のため2から引数（最大の値）まで続ける
	for(let number = 2; number <= maxNumber; number ++){
		// for文でnumberの値が更新される。numberがすでにfalse（ある数同士の掛け算の結果で表せる）なら無視されてまだtrueならそれは素数と言える
		if(isPrime[number] === true){
			primes.push(number)
		}

		// この時点のnumberより小さい数はすでに計算されてるので2*numberではなくnumber*numberから始める
		/**
		 * number=2のとき
		 * 2*2,2*3,2*4,2*5,2*6 // <-nextNumber += numberで計算される
		 * number=3のとき
		 * 3*2,3*3,3*4,3*5,3*6 // 3*2は2*3で計算済み
		 * number=4のとき
		 * 4*2,4*3,4*4,4*5,4*6 // 4*2は2*4で、4*3は3*4で計算済み
		 * 
		 */
		let nextNumber = number * number

		while(nextNumber <= maxNumber){
			isPrime[nextNumber] = false //nextNumberはnumber*numberなので素数ではない
			nextNumber += number //nextNumberはnumberの倍数でそれも素数ではない。
		}
	}
	return primes
}

// console.log(
sieveOfEratosthenes(100)
// );