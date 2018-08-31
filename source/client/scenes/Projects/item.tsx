import * as React from "react";

export default class Project extends React.PureComponent<{
	id: string,
}> {
	render(){
		return "Project: " + this.props.id;
	}
}