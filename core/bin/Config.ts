import * as fs from 'fs';
import {BasicClass} from "./BasicClass";

export class Config<ObjectInterface> extends BasicClass {
	private config: ObjectInterface;
	private defaults: object;
	private file: string;
	private autosave: boolean;

	constructor(configFile: string, configDefaults: object = {}, autosave: boolean = true){
		super();
		this.defaults = configDefaults;
		this.file = configFile;
		this.autosave = autosave;
		this.config = <ObjectInterface>Object.assign({}, this.defaults);
		this.load();
	}
	load(){
		try {
			var config = fs.readFileSync(this.file, 'utf8');
			var configObject = JSON.parse(config);
			configObject = Object.assign({}, this.defaults, configObject);
			this.config = configObject;
			this.emit('loaded');
		} catch(error) {
			this.emit('error', error);
		}
	}
	save(){
		try {
			var fileContent = JSON.stringify(this.config, null, '\t');
			fs.writeFileSync(this.file, fileContent, 'utf8');
			this.emit('saved');
		} catch(error) {
			this.emit('error', error);
		}
	}
	set(newConfig: ObjectInterface){
		this.config = Object.assign({}, this.config, newConfig);
		if( this.autosave ){
			this.save();
		}
	}
	get(): ObjectInterface{
		return this.config;
	}
}