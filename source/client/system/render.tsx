import * as React 			from "react";
import * as ReactDOM 		from "react-dom";

import _Content 			from "@components/Content/Layout";

import Router 				from "@components/Router/Router";

import history 				from "./history";
import config 				from "@system/config";
import {
	Provider as AppStoreProvider,
	store as AppStore
}							from "@system/AppStore";
import {ConnectModels}		from "@models"


const initLocation = history.createHref(config.get('location', {}));
location.hash = initLocation;

history.listen(location => {
	config.set('location', location);
});

let Content = _Content;

// @if SERVER
import { hot } from 'react-hot-loader';
Content = hot(module)(_Content);
// @endif

const RenderContent = () => {
	return (
		<AppStoreProvider store={AppStore}>
			<Router history={ history }>
				<ConnectModels />
				<Content />
			</Router >
		</AppStoreProvider>
	);
}


export default function render(){
	ReactDOM.render(RenderContent(), document.querySelector('#root'));
}