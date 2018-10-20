import dotProp  from "@utils/dotProp";
import scope from "./scope";

export default function getItemsFromState(state){
	return dotProp.get(state, scope('list'), [])
}