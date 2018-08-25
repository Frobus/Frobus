const path = require('path');

function _path(...args) {
	return path.normalize( path.join(...args) );
}

export function root(...args){
	return _path(__dirname, "..", ...args);
}

export function source(...args){
	return root("source", ...args);
}

// export function docs(...args){
// 	return root("dist", ...args);
// }

export function dist(...args){
	return root("dist", ...args);
}

export function client(...args){
	return source('client', ...args);
}