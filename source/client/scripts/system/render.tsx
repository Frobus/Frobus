import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from 'react-hot-loader';

import Layout from "@components/Layout/Layout";

import "./styles.styl";

import Router from "@components/Router/Router";

import history from "./history";

const HotApp = hot(module)(() =>
	<Router history={ history }>
		<Layout />
	</Router >
)


history.listen(function(location){
	// location.
})


export default function render(){
	ReactDOM.render(<HotApp />, document.querySelector('#root'));
}