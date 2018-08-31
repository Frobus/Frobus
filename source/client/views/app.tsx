window['__viewType'] = 'app';

import * as React from "react";
import * as ReactDOM from "react-dom";

import "@components/antd/styles";
import "@client/styles/app.styl";

import App from "@components/App/App";
let ref = React.createRef<App>();

let browser = (<App ref={ref} />);

ReactDOM.render(browser, document.querySelector('#root'));
export default {
	get(){
		return ref.current;
	}
};