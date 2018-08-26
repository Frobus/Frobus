import * as React from "react";
import * as ReactDOM from "react-dom";

import Browser from "@components/Browser/Browser";

let ref = React.createRef<Browser>();

let browser = (<Browser ref={ref} />);

ReactDOM.render(browser, document.querySelector('#root'));
export default {
	get(){
		return ref.current;
	}
};