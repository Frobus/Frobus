import config 				from "@system/config";
import text 				from "@system/text";
import lang, {
	defaultLang
}							from "@system/lang";
import isDir 				from "@utils/isDir";

export type fields = ('language' | 'projectsPath' | 'boilerplatesPath');

export interface IField {
	key			 : fields,
	title		 : string,
	values		 : any,
	value		 : string,
	validator	?: (rule:any, value:any, callback: (error?: string) => void ) => void;
}

class Settings {
	private configKey = 'settings';
	private fields: IField[] = [
		{
			key: 'language',
			title: ('Language'),
			values: Object.keys(lang).map( langKey => { return {value: langKey, text: text(lang[langKey])} } ),
			value: defaultLang,
		},
		{
			key: 'projectsPath',
			title: ('Projects'),
			values: '',
			validator: this.pathValidator,
			value: '',
		},
		{
			key: 'boilerplatesPath',
			title: ('Boilerplates'),
			values: '',
			validator: this.pathValidator,
			value: '',
		},
	];

	pathValidator(rule, value, callback){
		const _isDir = isDir(value);
		if( !value ) return callback();
		if( _isDir === true ) return callback();
		if( _isDir === false ) return callback( text('Path is not directory') );
		callback( text('Path not exists') );
	}


	set(settings: any): boolean;
	set(propKey: fields, value: any): boolean;
	set():boolean {
		let propKey = this.configKey;
		let value = {};
		switch(arguments.length){
			case 1: value = arguments[0]; break;
			case 2: propKey += arguments[0] ? '.' + arguments[0] : ''; value = arguments[1]; break;
		}
		config.set(propKey, value);
		return true;
	}
	get(): any;
	get(propKey: string): any;
	get(propKey: string, defaultValue: any): any;
	get(){
		let propKey = this.configKey;
		let defaultValue = {};
		switch(arguments.length){
			case 1: propKey += arguments[0] ? '.' + arguments[0] : ''; defaultValue = ''; break;
			case 2: propKey += arguments[0] ? '.' + arguments[0] : ''; defaultValue = arguments[1]; break;
		}
		return config.get(propKey, defaultValue);
	}

	getFields(){
		return this.fields.map( field => {
			return {
				...field,
				value: this.getFieldValue(field.key)
			}
		});
	}
	getFieldValue(fieldKey: fields) {
		let defaultValue = '';
		this.fields.forEach( field => {
			if(field.key !== fieldKey) return;
			defaultValue = field.value;
			return false;
		})
		return this.get(fieldKey, defaultValue);
	}
	setFieldValue(fieldKey: fields, value) {
		this.set(fieldKey, value);
	}
}

export default new Settings();