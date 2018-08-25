import * as React from "react";

import RouterContext from "./RouterContext";
import IGetHistoryProps from "./IGetHistoryProps";

export default function GetHistory(props: IGetHistoryProps){
	return (
		<RouterContext.Consumer>{
			(router) => props.children( router.instance.history )
		}</RouterContext.Consumer>
	);
}