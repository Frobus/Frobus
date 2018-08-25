import app from "./app";
import path from "@utils/path";

export default function getAppPath(...args){
	return path(app.getAppPath(), ...args);
}