import * as dotProp 	from 'dot-prop';
import copy 			from "@utils/copy";
import Conf 			= require('conf');

export default class ConfBuffered {
	private conf: Conf;
	private bufferStore: any;
	private saveTimeout: any;
 
	constructor(options = {}){
		this.conf = new Conf(options);
		this.bufferStore = this.conf.store;
	}
	get(key, defaultValue = null){
		return dotProp.get(this.bufferStore, key, defaultValue);
	}
	set(key, value){
		if( this.saveTimeout == null ){ this.bufferStore = this.conf.store; };
		const oldBuffer = copy(this.bufferStore);
		dotProp.set(this.bufferStore, key, value);
		if( JSON.stringify(this.bufferStore) == JSON.stringify(oldBuffer) ) return;
		if( this.saveTimeout ){ clearTimeout(this.saveTimeout) };
		this.saveTimeout = setTimeout(() => {
			this.saveTimeout = undefined;
			this.conf.store = this.bufferStore;
		}, 300);
	}
	getConf() {
		return this.conf;
	}
}