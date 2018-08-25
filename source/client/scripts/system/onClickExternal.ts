import * as electron 	from "electron";
import * as React 		from "react";

export default function onClickExternal(event: React.MouseEvent<HTMLAnchorElement>){
	event.preventDefault();
	electron.shell.openExternal(event.currentTarget.href);
}