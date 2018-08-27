import {shell} from "electron";
import * as fs from "fs";
import showNotification from "@system/showNotification";
import text from "@system/text";

export default function openExternalFile(filePath){
	if(!fs.existsSync(filePath)){
		showNotification( 'error', text("File not exist:"), filePath);
		return;
	}
	shell.openItem(filePath);
}