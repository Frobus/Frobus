import * as React from "react";

import {Location} from "@components/Router";

export default class LocationString extends React.PureComponent {
	render(){
		return (
			<Location>{ (location) => location.pathname + location.search + location.hash }</Location>
		)
	}
}