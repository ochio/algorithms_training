const DEFAULT_BASE = 37
const DEFAULT_MODULUS = 101

class polynomiaHash{
	/**
	 * @param {number} [base] - Base number that is used to create the polynomial
	 * @param {number} [modulus] - Modulus number that keeps the hash from overflowing.
	 */
	constructor({base = DEFAULT_BASE, modulus = DEFAULT_MODULUS} = {}) {
		this.base = base
		this.modulus = modulus
	}

	/**
	 * ハッシュ生成
	 * 
	 * 計算量: O(word.length)
	 * @param {string} word - String that needs to be hashed.
	 * @return {number}
	 */
	hash(word){
		const charCodes = Array.from(word).map((char) => this.charToNumber(char))

		let hash = 0
		for(let charIndex = 0; charIndex < charCodes.length; charIndex += 1){
			hash *= this.base
			hash += charCodes[charIndex]
			hash %= this.modulus
		}

		return hash
	}

	/**
	 * 前の単語に基づいたハッシュ生成関数
	 * 全ての単語を二回計算しない
	 * 
	 * 計算量: O(1)
	 * 
	 * @param {number} prevHash
	 * @param {string} prevWord
	 * @param {string} newWord
	 * @return {number}
	 */
	roll(prevHash, prevWord, newWord){
		let hash = prevHash

		const prevValue = this.charToNumber(prevWord[0])
		const newValue = this.charToNumber(newWord[newWord.length - 1])

		let prevValueMultiplier = 1
		for(let i = 1; i < prevWord.length; i += 1){
			prevValueMultiplier *= this.base
			prevValueMultiplier %= this.modulus
		}

		hash += this.modulus
		hash -= (prevValue * prevValueMultiplier) % this.modulus

		hash *= this.base
		hash += newValue
		hash %= this.modulus

		return hash
	}

	/**
	 * 文字を数字に変換
	 * 
	 * @param {string} char
	 * @return {number}
	 */
	charToNumber(char){
		let charCode = char.codePointAt(0)

		const surrogate = char.codePointAt(1)
		if(surrogate !== undefined){
			const surrogateShift = 2 ** 16
			charCode += surrogate * surrogateShift
		}

		return charCode

	}
	
}

module.exports = polynomiaHash

