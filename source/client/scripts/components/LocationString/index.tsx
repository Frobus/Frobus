import * as React from "react";

import Location from "@components/Router/Location";

export default class LocationString extends React.PureComponent {
	render(){
		return (
			<Location>{ (location) => location.pathname + location.search + location.hash }</Location>
		)
	}
}