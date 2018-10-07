import { createStore, combineReducers } from 'redux';
import { Provider, connect } from "react-redux";

import {reducer as boilerplatesReducer} from "@models/boilerplates";
console.log(boilerplatesReducer)
import {reducer as appNavigationReducer} from "@models/appNavigation";


const mainReducers = (state: any, action) => {
	if(state == null) state = {};
	state = boilerplatesReducer(state, action);
	state = appNavigationReducer(state, action);

	return state;
}


export let store = createStore(mainReducers);
export {Provider, connect};
export function dispatch(args){
	return store.dispatch(args);
}