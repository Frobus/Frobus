import * as electron 	from "electron";

export default function openExternalUrl(url){
	electron.shell.openExternal(url);
}