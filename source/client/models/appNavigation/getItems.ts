import {store} 				from "@system/AppStore";

import $getItems 	from "./$getItems"

export default function getItems(){
	let state = store.getState();
	return $getItems(state);
}