import React from "react";

import Location from "@components/Router/Location";
import locationToString from "@utils/locationToString";

export default class LocationString extends React.PureComponent {
	render(){
		return (
			<Location>{ locationToString }</Location>
		)
	}
}