import React 			from "react";
import Route 			from "@components/Router/Route";

import Settings 		from "@scenes/Settings";
import Project 			from "@scenes/Projects";
import Boilerplates 	from "@scenes/Boilerplates";

export default function RouteContent(){
	return (
		<React.Fragment>
			<Route<{key: string}> url="/projects/:key/">{
				(matched) => <Project projectKey={ matched.key } />
			}</Route>
			<Route<{key: string}> url="/boilerplates/:key/">{
				(matched) => <Boilerplates boilerplateKey={ matched.key } />
			}</Route>
			<Route<{page?: string}> url="/settings/(:page/)">{
				(matched) => <Settings page={ matched.page } />
			}</Route>
		</React.Fragment>
	);
};