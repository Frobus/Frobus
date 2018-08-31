import config 		from "@system/config";

enum lang {
	EN = 'en',
	RU = 'ru',
}
export default lang;

export function getCurrent(){
	return config.get('settings.language', defaultLang);
}
export function setCurrent(lang: lang){
	return config.set('settings.language', lang);
}
export const defaultLang = lang.EN;