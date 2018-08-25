import base64 from "@utils/base64";
import textDictionary from "./textDictionary";
import lang from "./lang";
import currentLang from "./currentLang";

export default function text(value, _lang: lang = lang.EN){
	const textKey = base64.encode(value);
	for(let langKey in lang){
		let langValue = textDictionary.get(`${ langKey }.${ textKey }`, null);
		if(langValue == null){
			textDictionary.set(`${ langKey }.${ textKey }`, value);
		}
	}

	return textDictionary.get(`${ currentLang }.${ textKey }`, value);
}