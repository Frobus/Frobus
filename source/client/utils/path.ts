import * as _path from "path";
export default function path(...args){
	return _path.normalize(_path.join(...args));
}