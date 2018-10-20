import config from "@system/config";

import { createStore, combineReducers } from 'redux';
import { Provider, connect } from "react-redux";

import {reducer as boilerplatesReducer} from "@models/boilerplates/reducer";
import {reducer as appNavigationReducer} from "@models/appNavigation/reducer";

const initialState = function (state, action) {
	if(state) return state;
	state = config.get('store', {})
	return state;
}

const mainReducers = (state: any, action) => {
	state = initialState(state, action);
	state = boilerplatesReducer(state, action);
	state = appNavigationReducer(state, action);

	return state;
}


export let store = createStore(mainReducers);
export {Provider, connect};
export function dispatch(args){
	return store.dispatch(args);
}

store.subscribe(function(){
	let state = store.getState();
	config.set('store', state)
})