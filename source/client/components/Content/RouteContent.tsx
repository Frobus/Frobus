import * as React 		from "react";
import Route 			from "@components/Router/Route";

import Settings 		from "@scenes/Settings";
import Projects 			from "@scenes/Projects";
import Boilerplates 	from "@scenes/Boilerplates";

export default function RouteContent(){
	return (
		<React.Fragment>
			<Route<{key: string}> url="/projects/:key/">{
				(matched) => <Projects id={ matched.key.replace(/^project-/, '') } />
			}</Route>
			<Route<{key: string}> url="/boilerplates/:key/">{
				(matched) => <Boilerplates id={ matched.key.replace(/^boilerplate-/, '') } />
			}</Route>
			<Route<{page?: string}> url="/settings/(:page/)">{
				(matched) => <Settings page={ matched.page } />
			}</Route>
		</React.Fragment>
	);
};