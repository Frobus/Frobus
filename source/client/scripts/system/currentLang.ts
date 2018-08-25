import config from "./config";
import lang from "./lang";

if( config.get('current-lang') == null ){ config.set('current-lang', lang.EN); }
const currentLang: lang = config.get('current-lang', lang.EN);
export default currentLang;