import getAppPath from "./getAppPath";

export default function getDistPath(...args){
	return getAppPath('dist', ...args);
}