import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import * as Router from "./components/Router";

import "./index.styl";

import Layout, {reducers} from "./components/Layout/index";

import App from "./logic/App";

import mainNavigation from './configs/mainNavigation';

var app = new App();

app.addReducers(Router.reducer);

app.addReducers(reducers);

app.addReducers(function(state:any = {}, action){
	if(state.mainNavigation == null){
		state = {...state};
		state.mainNavigation = mainNavigation;
	}

	return state;
})



const store = createStore(app.getReducers());

ReactDOM.render(
	<Provider store={store}>
		<Layout />
	</Provider>,
	document.getElementById("root")
);