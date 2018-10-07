import * as React 			from "react";

export * 					from "./interfaces";
import {
	IAddBoilerplate,
	IBoilerplate,
	IState,
	IActions,
}							from "./interfaces";
import {store} 				from "@system/AppStore";
import dotProp 				from "@utils/dotProp";
import isDir				from "@utils/isDir";
import isFile				from "@utils/isFile";
import path					from "@utils/path";
import base64				from "@utils/base64";
import text					from "@system/text";
import throwError			from "@system/throwError";

export const STORE_NAMESPACE = "boilerplates";

export const NAMESPACE = (value = "") => `${STORE_NAMESPACE}.${value}`;
const getType = (type: any = "") => {
	if(!type) return null;
	if(!type.indeOf) return null;
	if(type.indeOf(NAMESPACE()) !== 0) return null;
	type = type.replace(NAMESPACE(), "");
	return type;
}


export const StoreActions = {
	getList(state) {
		return dotProp.get(NAMESPACE("list"), state, []);
	},
	addBoilerplate (boilerplate: IAddBoilerplate) {
		store.dispatch({
			type: NAMESPACE("add"),
			boilerplate: boilerplate,
		})
	}
}

export const reducer = (state, action: {type: string} & any) => {
	if(state[NAMESPACE("list")] == null) state[NAMESPACE("list")] = [];
	const type = getType("");
	if(type == null) return state;

	switch(type){
		case 'add':
			const boilerplate = action.boilerplate
			const _path = boilerplate.path;
			const _isDir = isDir(_path);
			try {
				if(!_path) throw new Error( text("Path in empty") )
				if(_isDir === false) throw new Error( text("Path not directory") )
				if(_isDir === undefined) throw new Error( text("Path not exists") )
				const packageJson = isFile(path(_path, "package.json"));
		
				if( packageJson === undefined ) throw new Error( `package.json ${text(`not exist`)}` );
				if( packageJson === false ) throw new Error( `package.json ${text(`not file`)}` );
			} catch(e){
				throwError(e);
				return state;
			}
			let list = dotProp.get(NAMESPACE("list"), state, []);
			list = list.concat([{
				key: base64.encode(boilerplate.path),
				options: {},
				...boilerplate,
			}])
			return {
				...state,
				list: list,
			}
	}

}


// const bolerplatesStore = addStore<Actions>('boilerplates', {
// 	items: [],
// }, Actions.prototype);



// export const {connect, actions} = bolerplatesStore;
// const configKey = 'boilerplates';

// const _actions = {
// 	addBoilerplate(state, actions, boilerplate: IAddBoilerplate){
// 		const _path = boilerplate.path;
// 		const _isDir = isDir(_path);
// 		try {
// 			if(!_path) throw new Error( text("Path in empty") )
// 			if(_isDir === false) throw new Error( text("Path not directory") )
// 			if(_isDir === undefined) throw new Error( text("Path not exists") )
// 			const packageJson = isFile(path(_path, "package.json"));
	
// 			if( packageJson === undefined ) throw new Error( `package.json ${text(`not exist`)}` );
// 			if( packageJson === false ) throw new Error( `package.json ${text(`not file`)}` );
// 		} catch(e){
// 			throwError(e);
// 			return state;
// 		}
// 		let list = actions.getList();
// 		list = list.concat([{
// 			key: base64.encode(boilerplate.path),
// 			options: {},
// 			...boilerplate,
// 		}])
// 		return {
// 			...state,
// 			list: list,
// 		}
// 	}
// }

// const state: IState = config.get(`${configKey}`, {
// 	list: [],
// });

// const boilerplatesStore = createStore({
// 	initialState: state,
// 	actionsCreators: _actions
// });

// Object.assign(boilerplatesStore.actions, {
// 	getList(state){
// 		return (state && state.list) || [];
// 	},
// 	getBoilerplate(state, actions, key: string): (IBoilerplate | null) {
// 		return actions.getList().filter( item => item.key === key )[0] || null;
// 	}
// })

// console.log('boilerplatesStore', boilerplatesStore)

// const actions: IActions = boilerplatesStore.actions;

// type IConnect = <OutState = {}>(mapStateToProps: (state: IState, actions: IActions) => OutState) => (Component: React.ComponentType) => React.ComponentType;
// const connect: IConnect = boilerplatesStore.connect;

// export {actions, connect};
// export const {Provider} = boilerplatesStore;