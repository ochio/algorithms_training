const Sort = require('../Sort')

const BASE_CHAR_CODE = 97;
const NUMBER_OF_POSSIBLE_DIGITS = 10;
const ENGLISH_ALPHABET_LENGTH = 26;

class RadixSort extends Sort {
	/**
	 * @param {*[]} originalArray
	 * @return {*[]}
	 */
	sort(originalArray){
		const isArrayOfNumbers = this.isArrayOfNumbers(originalArray)

		let sortedArray = [...originalArray]
		
		const numPasses = this.determinNumPasses(sortedArray)

		for(let currentIndex = 0; currentIndex < numPasses; currentIndex += 1){
			const buckets = isArrayOfNumbers 
				? this.placeElementsIsNumberBuckets(sortedArray, currentIndex)
				: this.placeElementsIsCharacterBuckets(sortedArray, currentIndex, numPasses)
			
			sortedArray = buckets.reduce((acc, val) => {
				return [...acc, ...val]
			}, [])
		}

		return sortedArray
	}

	/**
	 * @param {*[]} array 
	 * @param {number} index
	 * @return {*[]}
	 */
	placeElementsIsNumberBuckets(array, index){
		//バケットの割り当てに使う桁を決めるために使われる
		const modded = 10 ** (index + 1)
		const divided = 10 ** index
		const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS)

		array.forEach(element => {
			this.callbacks.visitingCallback(element)
			if(element < divided) {
				buckets[0].push(element)
			}else{
				const currentDigit = Math.floor((element % modded) / divided)
				buckets[currentDigit].push(element)
			}
		})

		return buckets
	}

	/**
	 * @param {*[]} array 
	 * @param {number} index
	 * @param {number} numPasses
	 * @return {*[]}
	 */
	placeElementsIsCharacterBuckets(array, index, numPasses){
		const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH)
		array.forEach((element) => {
			this.callbacks.visitingCallback(element)
			const currentBucket = this.getCharCodeOfElementAtIndex(element, index, numPasses)
			buckets[currentBucket].push(element)
		})

		return buckets
	}

	/**
	 * @param {string} element
	 * @param {number} index
	 * @param {number} numPasses
	 * @return {number}
	 */
	getCharCodeOfElementAtIndex(element, index, numPasses){
		if((numPasses - index) > element.length){
			return ENGLISH_ALPHABET_LENGTH - 1
		}

		const charPos = index > element.length - 1 ? 0 : element.length - index - 1

		return element.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE
	}

	// パスの数が最大の要素の長さで決まる。
	// 整数ならlog10(num)で文字列ならその文字列の長さ
	determinNumPasses(array){
		return this.getLengthOfLongestElement(array)
	}

	/**
	 * @param {*[]} array 
	 * @return {number}
	 */
	getLengthOfLongestElement(array){
		// 数字の時
		if(this.isArrayOfNumbers(array)){
			return Math.floor(Math.log10(Math.max(...array))) + 1 // 何の1?
		}

		// 数字以外の時
		return array.reduce((acc, val) => {
			return val.length > acc ? val.length : acc
		}, -Infinity) // 何で-Infinity? 0じゃダメ？
	}

	/**
	 * @param {*[]} array
	 * @return {boolean}
	 */
	isArrayOfNumbers(array){
		// 全ての要素が同じ型の前提
		return this.isNumber(array[0])
	}

	/**
	 * @param {number} numBuckets
	 * @return {*[]}
	 */
	createBuckets(numBuckets){
		// バケットを配列にマッピングすると同じ配列への参照を含まなくなる
		return new Array(numBuckets).fill(null).map(() => [])
	}

	/**
	 * @param {*} element
	 * @return {boolean}
	 */
	isNumber(element){
		return Number.isInteger(element)
	}

}

module.exports = RadixSort

const a = ["a","d","b","s","b"]
const b = new RadixSort

console.log(b.sort(a));