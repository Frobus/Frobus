import {store} 				from "@system/AppStore";
import {scope}			from "./scope";

export default function(item: {
	key		 : string,
	icon	 : string,
	data	?: any,
	caption	 : string,
	parent	?: string,
}){
	console.log('addItem')
	
	store.dispatch({
		type: scope("add"),
		item: item,
	})
}