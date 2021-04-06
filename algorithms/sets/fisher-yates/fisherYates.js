/**
 * @param {*[]} originalArray
 * @return {*[]}
 */

function fisherYates(originalArray){
	// 元の配列を複製する
	const array = originalArray.slice(0)

	for(let i = (array.length - 1); i > 0; i -= 1){
		// 0からi番目までの数字をランダムで取得
		const randomIndex = Math.floor(Math.random() * (i + 1));
		// i番目の数字をrandomIndexの数字と入れ替える。
		// iは1ずつ少なくなるから一回入れ替えられると再び移動しない。
		// 一つの配列で同時に入れ替える必要があるので↓の書き方
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]] 
	}

	return array
}

console.log(
	fisherYates([1,2,3,4,5,6,7])
);