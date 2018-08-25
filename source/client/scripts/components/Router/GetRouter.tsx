import * as React from "react";
import {RouterContext, IGetRouterProps} from "./index";

export function GetRouter(props: IGetRouterProps){
	return (
		<RouterContext.Consumer>{
			(router) => props.children( router.instance )
		}</RouterContext.Consumer>
	);
};