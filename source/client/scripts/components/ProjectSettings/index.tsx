import * as React from "react";

export default class ProjectSettings extends React.PureComponent<{
	projectKey: string,
}> {
	render (){
		return "ProjectSettings: " + this.props.projectKey;
	}
}