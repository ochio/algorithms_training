const radianToDegree = require('../radian/radianToDegree')

class ComplexNumber {
	/**
	 * re = 実数 im = 虚数  
	 * z = re + im * i  
	 * z = radius * e^(i * phase)
	 * 
	 * @param {number} [re]
	 * @param {number} [im]
	 */
	constructor({re = 0, im = 0} = {}){
		this.re = re;
		this.im = im
	}

	/**
	 * @param {ComplexNumber|number} addend
	 * @return {ComplexNumber}
	 */
	add(addend){
		// 複素数を扱ってるか確認
		const complexAddend = this.toComplexNumber(addend)

		return new ComplexNumber({
			re: this.re + complexAddend.re,
			im: this.im + complexAddend.im
		})
	}

	/**
	 * @param {ComplexNumber|number} subtrahend  
	 * @return {ComplexNumber}
	 */
	substract(subtrahend){
		// 複素数を扱ってるか確認
		const complexSubtrahend = this.toComplexNumber(subtrahend)

		return new ComplexNumber({
			re: this.re - complexSubtrahend.re,
			im: this.im - complexSubtrahend.im,
		})
	}

	/**
	 * @param {ComplexNumber|number} multiplicand
	 * @return {ComplexNumber}
	 */
	multiply(multiplicand) {
		// 複素数を扱ってることを確認
		const complexMultiplicand = this.toComplexNumber(multiplicand)

		// (a+bi)*(c+di)= (ac-db) + (ad + bc)iになる
		return new ComplexNumber({
			re: this.re * complexMultiplicand.re - this.im * complexMultiplicand.im,
			im: this.re * complexMultiplicand.im + this.im * complexMultiplicand.re
		})
	}

	/**
	 * @param {ComplexNumber|number} divider
	 * @return {ComplexNumber}
	 */
	// 共役な数で通分する
	divide(divider){
		// 複素数を扱ってることを確認
		const complexDivider = this.toComplexNumber(divider)

		// 共役な数を取得
		const dividerConjugate = this.conjugate(complexDivider)

		// 最終的な分子。共役な数で通分するため、分子は元の数*共役な数
		const finalDivident = this.multiply(dividerConjugate)

		// 最終的な分母。分母の数と共役な数で通分するため右の公式を使える。(a + bi)(a − bi) = a^2 + b^2
		// 虚数の二乗になるため計算したら実数になる。
		const finalDivider = (complexDivider.re ** 2) + (complexDivider.im ** 2)

		return new ComplexNumber({
			re: finalDivident.re / finalDivider,
			im: finalDivident.im / finalDivider
		})
	}

	/**
	 * @param {ComplexNumber|number} number 
	 */
	conjugate(number){
		// 複素数を扱ってることを確認
		const complexNumber = this.toComplexNumber(number)

		return new ComplexNumber({
			re: complexNumber.re,
			im: -1 * complexNumber.im
		})
	}

	/**
	 * @retrun {number}
	 */
	// 複素数平面で半径を取得する
	getRadius(){
		return Math.sqrt((this.re ** 2) + (this.im ** 2))
	}

	/**
	 * @param {boolean} [inRadians]
	 * @return {number}
	 */
	getPhase(inRadians = true){
		// 複素数平面上でtan取得
		let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re))

		// tanの性質で場合分け
		if(this.re < 0 && this.im > 0){ // 1.左上の場合180°-tan
			phase = Math.PI - phase
		} else if(this.re < 0 && this.im < 0){ //左下の場合パターン1にマイナス1掛ける
			phase = -(Math.PI - phase)
		} else if(this.re > 0 && this.im < 0){ //右下の場合x軸に対照だからマイナスつける
			phase = -phase
		} else if(this.re === 0 && this.im > 0){ // y軸上かつ上にあるとき
			phase = Math.PI / 2
		} else if(this.re === 0 && this.im > 0){ // y軸上かつ下にあるとき
			phase = -Math.PI / 2
		} else if(this.re < 0 && this.im === 0){ //x軸上かつ左のとき
			phase = Math.PI
		} else if(this.re > 0 && this.im === 0){ //x軸上かつ右のとき
			phase = 0
		} else if(this.re === 0 && this.im === 0){ //原点のとき
			// 厳密には「定義されてない」が正しい。簡略化のため0にする
			phase = 0
		}

		if(!inRadians){
			phase = radianToDegree(phase)
		}

		return phase
	}

	/**
	 * @param {boolean} number 
	 * @return {{radius: number, phase: number}}
	 */
	getPolarForm(inRadius = true){
		return {
			radius: this.getRadius(),
			phase: this.getPhase(inRadius)
		}
	}

	/**
	 * 実数を複素数に変換
	 * 複素数が渡された場合(ComplexNumberのインスタンスだった場合)はそのまま
	 * @param {ComplexNumber|number} number
   * @return {ComplexNumber}
	 */
	toComplexNumber(number){
		if(number instanceof ComplexNumber){
			return number
		}
		return new ComplexNumber({re: number})
	}
}