import * as fs from "fs";
import errorHandler from "@system/errorHandler";

export default function isFile(path): undefined | boolean{
	try {
		if( !fs.existsSync(path) ) return undefined;
		return fs.lstatSync(path).isDirectory();
	} catch(e) {
		errorHandler(e);
		return undefined;
	}
}