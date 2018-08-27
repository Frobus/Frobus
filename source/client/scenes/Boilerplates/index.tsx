import React from "react";

export default class PageBoilerplates extends React.PureComponent<{
	boilerplateKey: string,
}> {
	render (){
		return "PageBoilerplates:" + this.props.boilerplateKey;
	}
}