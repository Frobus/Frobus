import React 			from "react";
import ReactDOM 	from "react-dom";

import _Layout 			from "@components/Layout/Layout";

import Router 			from "@components/Router/Router";

import history 			from "./history";
import config 			from "@system/config";


const initLocation = history.createHref(config.get('location', {}));
location.hash = initLocation;

history.listen(location => {
	config.set('location', location);
});

let Layout = _Layout;
// @if SERVER
import { hot } from 'react-hot-loader';
Layout = hot(module)(_Layout);
// @endif

const RenderLayout = () => {
	return (
		<Router history={ history }>
			<Layout />
		</Router >
	);
}


export default function render(){
	ReactDOM.render(RenderLayout(), document.querySelector('#root'));
}