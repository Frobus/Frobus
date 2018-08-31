import * as React from "react";

export default class Boilerplate extends React.PureComponent<{
	id: string,
}> {
	render(){
		return "Boilerplate: " + this.props.id;
	}
}