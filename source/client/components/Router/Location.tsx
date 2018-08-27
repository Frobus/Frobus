import React from "react";
import {Location} from "history";

import ILocationProps from "./ILocationProps";
import GetRouter from "./GetRouter";

export default function Location(props: ILocationProps) {
	return (
		<GetRouter>{
			(router) => {
				return props.children(
					router.getLocation()
				)
			}
		}</GetRouter>
	);
}