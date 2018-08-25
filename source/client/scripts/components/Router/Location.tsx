import * as React from "react";
import {GetRouter, ILocationProps} from "./index";
import {Location} from "history";


export function Location(props: ILocationProps) {
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