const Comparator = require('../../utils/comparator/Comparator')

/**
 * @typedef {Object} SorterCallbecks
 * @property {function (a: *, b:*)} compareCallback - If provided then all elements comparisons will be done this callback
 * @property {function(a:*)} visitingCallback - If provided it will be called each time the sorting function is visiting the next element
 */

class Sort {
	constructor(originalCallbacks){
		this.callbacks = Sort.initSortingCallback(originalCallbacks)
		this.comparator = new Comparator(this.callbacks.compareCallback)
	}

	/**
	 * @param {SorterCallbecks} originalCallbacks
	 * @returns {SorterCallbecks}
	 */
	static initSortingCallback(originalCallbacks){
		const callbacks = originalCallbacks || {}
		const stubCallbacks = () => {}

		callbacks.compareCallback = callbacks.compareCallback || undefined
		callbacks.visitingCallback = callbacks.visitingCallback || stubCallbacks

		return callbacks
	}

	sort(){
		throw new Error('sort method must be implemented')
	}
}

module.exports = Sort