import {BasicClass} from "./BasicClass";
import {EventEmitter} from 'events';

interface IConnection extends EventEmitter {
	send: any;
}

export class WSBasicClass extends BasicClass {
	protected connection: IConnection;
	private actions: object;

	connectionReady(){
		var self = this;
		this.connection.on('message', function(message){
			message = self.parseMessage(message);
			switch(message.type){
				case 'call':
					self.callHandler(message);
				break;
				case 'result':
					self.emit("result:" + message.id, message.result, message.error);
				break;
			}
		})
	}
	createMessage(message: object){
		return JSON.stringify(message);
	}
	parseMessage(message: string){
		return JSON.parse(message);
	}
	send(message: any){
		message = this.createMessage(message);
		this.connection.send(message);
	}
	call( objectName, methodName, ...args ) {
		let req = {
			id: Date.now() + "." + Math.round(Math.random()*1000000),
			type: "call",
			objectName: objectName,
			methodName: methodName,
			args: args,
		}
		let promise = new Promise((resolve, reject) => {
			this.once('result:' + req.id, function(result, error){
				if(error){
					reject(error);
					return;
				}
				resolve(result);
			})
		})
		this.send(req);
		return promise;
	}
	callHandler(obj){
		var root = this.getActions();
		var result = {
			id: obj.id,
			type: "result",
			error: false,
			result: false,
		}
		try {
			result.result = root[obj.objectName][obj.methodName].apply(root[obj.objectName], obj.args);
		} catch (error){
			result.error = error;
		}
		this.send(result);
	}
	setActions(root: object){
		this.actions = root;
	}
	getActions(){
		return this.actions;
	}
	addActions(newAction){
		var actions = this.getActions();
		Object.keys(newAction).forEach((key) => {
			if( !actions[key] ) actions[key] = {};
			actions[key] = {...actions[key], ...newAction[key]};
		})
		this.setActions(actions);
	}
}


