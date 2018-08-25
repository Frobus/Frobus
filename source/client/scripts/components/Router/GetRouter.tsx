import * as React from "react";
import IGetRouterProps from "./IGetRouterProps";
import RouterContext from "./RouterContext";

export default function GetRouter(props: IGetRouterProps){
	return (
		<RouterContext.Consumer>{
			(router) => props.children( router.instance )
		}</RouterContext.Consumer>
	);
};