
import isDir				from "@utils/isDir";
import isFile				from "@utils/isFile";
import path					from "@utils/path";
import base64				from "@utils/base64";
import text					from "@system/text";
import throwError			from "@system/throwError";
import dotProp 				from "@utils/dotProp";

import {scope}				from "./scope";
import addItemToState 		from "@models/appNavigation/$addItem";

import {
	IAddBoilerplate,
}							from "./interfaces";

import $addItem 			from "./$addItem"


export const reducer = (state, action: {type: string} & any) => {
	const type = action.type;

	switch(type){
		case scope("add"): state = $addItem(state, action.boilerplate); break;
	}
	return state;

}