import styled from "styled-components";
export {styled};

export function styles(styleObject){
	return function(elements) {
		let result = {...elements};
		for(let key in result){
			if( styleObject[key] ){
				result[key] = styleObject[key](result[key]);
			}
		}
		return result;
	}
}

export default function _styled(...args) {
	var self = this;
	return function(obj){
		return styled(obj).apply(self, args);
	}
}