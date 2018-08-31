import base64 from "@utils/base64";
import textDictionary from "./textDictionary";
import lang from "./lang";
import {getCurrent} from "./lang";

function _singleText(){

}

export default function text(value){
	const textKey = base64.encode(value);
	for(let langKey in lang){
		let langValue = textDictionary.get(`${ langKey }.${ textKey }`, null);
		if(langValue == null){
			textDictionary.set(`${ langKey }.${ textKey }`, value);
		}
	}

	return textDictionary.get(`${ getCurrent() }.${ textKey }`, value);
}