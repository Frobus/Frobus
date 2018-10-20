import dotProp  from "@utils/dotProp";
import scope from "./scope";

export default function setItemsToState(state, items){
	state = dotProp.set(state, scope('list'), items);
	return state;
}