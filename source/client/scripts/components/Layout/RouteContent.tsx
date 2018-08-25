import * as React 		from "react";
import Route 			from "@components/Router/Route";

import ProjectSettings 	from "@components/ProjectSettings";

export default function RouteContent(){
	return (
		<React.Fragment>
			<Route<{projectKey: string}> url="/projects/:projectKey/">{
				(matched) => <ProjectSettings projectKey={ matched.projectKey } />
			}</Route>
			<Route url="/boilerplates/boilerplate-new/">{
				(matched) => "New boilerplate"
			}</Route>
		</React.Fragment>
	);
};