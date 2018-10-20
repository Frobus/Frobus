import isDir				from "@utils/isDir";
import isFile				from "@utils/isFile";
import path					from "@utils/path";
import base64				from "@utils/base64";
import text					from "@system/text";
import throwError			from "@system/throwError";
import {
	IAddBoilerplate,
}							from "./interfaces";
import dotProp 				from "@utils/dotProp";
import {scope}				from "./scope";

export default function (state, boilerplate: IAddBoilerplate){
	console.log('state000', state);
	const _path = boilerplate.path;
	const _isDir = isDir(_path);
	try {
		if(!_path) throw new Error( text("Path in empty") )
		if(_isDir === false) throw new Error( text("Path not directory") )
		if(_isDir === undefined) throw new Error( text("Path not exists") )
		const packageJson = isFile(path(_path, "package.json"));

		if( packageJson === undefined ) throw new Error( `package.json ${text(`not exist`)}` );
		if( packageJson === false ) throw new Error( `package.json ${text(`not file`)}` );
	} catch(e){
		throwError(e);
		return state;
	}
	
	let list = dotProp.get(state, scope("list"), []);
	let item = {
		key: base64.encode(boilerplate.path),
		options: {},
		...boilerplate,
	}
	list.push(item)

	state = dotProp.set(state, scope("list"), list);

	return state;
}