import * as React from "react";
import * as ReactDOM from "react-dom";

import _Layout from "@components/Layout/Layout";

import "./styles.styl";

import Router from "@components/Router/Router";

import history from "./history";


let Layout = _Layout;

// @if WATCH
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