import * as React from "react";
import {Button} from "antd";
import showMessage from "@system/showMessage";

export default class PageProjects extends React.PureComponent<{
	projectKey: string,
}> {
	render (){
		return (
			<React.Fragment>
				<Button type="primary" onClick={ () => { showMessage("info", "Test") } }>Display normal message</Button>
				<span>"PageProjects: " + this.props.projectKey</span>
			</React.Fragment>
		);
	}
}