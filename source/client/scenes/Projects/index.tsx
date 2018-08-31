import * as React 	from "react";
import ProjectNew 	from "./new";
import Project 		from "./item";


export default class PageProjects extends React.PureComponent<{
	id: string,
}> {
	render (){
		return (
			<React.Fragment>{
				this.props.id == 'new'
				? <ProjectNew />
				: <Project id={this.props.id} />
			}</React.Fragment>
		);
	}
}