import {EventEmitter} from 'events';

export class CreateConntection extends EventEmitter {
	private connection: WebSocket;
	constructor(connection: WebSocket){
		super();
		var self = this;
		this.connection = connection;
		this.connection.onmessage = function(event){
			self.emit('message', event.data)
		}
		this.connection.onopen = function(event){
			self.emit('open', event)
		}
		this.connection.onclose = function(event){
			self.emit('close', event)
		}
		this.connection.onerror = function(event){
			self.emit('error', event)
		}
	}
	send(obj: any){
		if( typeof obj == 'string' ){
			this.connection.send(obj);
		} else if (typeof obj =='object'){
			this.connection.send(JSON.stringify(obj));
		}
	}
}