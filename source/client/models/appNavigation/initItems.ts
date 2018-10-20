import dotProp  from "@utils/dotProp";
import scope from "./scope";
import defaultItems from "./defaultItems";

export default function initItems(state){
	if(!dotProp.get(state, scope('list'))){
		state = dotProp.set(state, scope('list'), defaultItems);
	}
	return state;
}