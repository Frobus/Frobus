import dotProp  from "@utils/dotProp";
import scope from "./scope";

import getItems from "./getItems";

export default function addItemsToState(state){
	if(!state) state = {};
	if(!dotProp.get(state, scope('list'))){
		state = dotProp.set(state, scope('list'), getItems());
	}
	return state;
}