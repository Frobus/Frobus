import * as hash from "hash.js";

export default function _hash(str: string){
	return hash.sha256().update(str).digest("hex");
}