import * as React from "react";
import {RouterContext, IGetHistoryProps} from "./index";

export function GetHistory(props: IGetHistoryProps){
	return (
		<RouterContext.Consumer>{
			(router) => props.children( router.instance.history )
		}</RouterContext.Consumer>
	);
}