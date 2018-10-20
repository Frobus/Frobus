
import {store} 				from "@system/AppStore";
import uniqId 				from "@utils/uniqId";
import {scope}				from "./scope";

import addItemToNav			from "@models/appNavigation/addItem";

import {
	IAddBoilerplate,
}							from "./interfaces";

export default function addBoilerplate (boilerplate: IAddBoilerplate) {
	console.log('addBoilerplate')
	boilerplate = {...boilerplate}

	if(!boilerplate.key) boilerplate.key = uniqId()
	
	store.dispatch({
		type: scope("add"),
		boilerplate: boilerplate,
	})

	addItemToNav({
		key: boilerplate.key,
		caption: boilerplate.name,
		icon: "file-add",
		parent: "boilerplates",
	})
}