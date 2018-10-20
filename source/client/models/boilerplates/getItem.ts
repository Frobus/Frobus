import {store} from "@system/AppStore";
import $getItem from "./$getItem"

export default function (itemKey) {
	let item = $getItem(store.getState(), itemKey);
	// item.module = require(item.path);
	return item;
}