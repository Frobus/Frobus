import initItems 			from "./initItems";
import {scope}			from "./scope";
import dotProp 				from "@utils/dotProp";
import addItemToState 		from "./$addItem";

export const reducer = function (state, action) {
	if(!dotProp.get(state, scope("list"))){
		state = {...state, ...initItems(state)}
	}

	const type = action.type;
	switch (type) {
		case scope("add"):
			const item = action.item;
			state = addItemToState(state, item);
		break;
	}
	
	return state;
}