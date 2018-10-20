import scope from "./scope";
import dotProp from "@utils/dotProp";

export default function $getList(state) {
	return dotProp.get(state, scope("list"), []);
}