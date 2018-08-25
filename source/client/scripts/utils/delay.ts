export default function(timeout){
	return function(...args){
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(...args), timeout);
		});
	}
}