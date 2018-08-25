import * as Conf 		from 'conf';
import * as dotProp 	from 'dot-prop';
import copy 			from "@utils/copy";

export default class ConfBuffered {
	private conf: Conf;
	private bufferStore: any;

	constructor(options = {}){
		this.conf = new Conf(options);
		this.bufferStore = this.conf.store;
	}
	get(key, defaultValue = null){
		return dotProp.get(this.bufferStore, key, defaultValue);
	}
	set(key, value){
		this.bufferStore = this.conf.store;
		const oldBuffer = copy(this.bufferStore);
		dotProp.set(this.bufferStore, key, value);
		if( JSON.stringify(this.bufferStore) == JSON.stringify(oldBuffer) ) return;
		this.conf.store = this.bufferStore;
	}
}