import * as React from "react";
import * as UrlPattern from "url-pattern";

import {Location} from "./";

export class Route<IMatched = any> extends React.PureComponent<{
	url: string,
	children: (router: IMatched) => React.ReactNode,
}> {
	pattern = new UrlPattern(this.props.url);

	render(){
		return (
			<Location>{(location) =>  {
				const matched: IMatched = this.pattern.match(location.pathname);
				if( matched ){
					return this.props.children(matched);
				}
				return '';
			}}</Location>
		)
	}
}