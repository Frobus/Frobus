import {EventEmitter} from 'events';
import {Core} from "./Core";


class ClassError extends Error {
	constructor(error, originalError?: Error){
		super(error.message);
		error.originalError = originalError;
	}
}

export class BasicClass extends EventEmitter {
	protected core: Core;
	constructor(){
		super();
	}
	setCore(core: Core){
		this.core = core;
	}
	error(text: string, originalError?: Error){
		var error = new ClassError({message: text}, originalError)
		this.emit('error', error);
		if( this.core ){
			this.core.emit('error', error);
		}
	}
}