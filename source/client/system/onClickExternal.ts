import * as React 		from "react";
import openExternalUrl  from "./openExternalUrl";

export default function onClickExternal(event: React.MouseEvent<HTMLAnchorElement>){
	event.preventDefault();
	openExternalUrl(event.currentTarget.href);
}