import config from "@system/config";

enum lang {
	EN = 'en',
	RU = 'ru',
}
export default lang;

export function getCurrent(){
	return config.get('system.language', lang.EN);
}
export function setCurrent(lang: lang){
	return config.set('system.language', lang);
}
export const defaultLang = getCurrent();