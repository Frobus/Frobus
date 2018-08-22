import {WSBasicClass} from "../../../core/bin/WSBasicClass";
import {CreateConntection} from "../../../core/bin/CreateConntection";

export default class ServerConnection extends WSBasicClass {
	private address = 'ws://' + window.document.location.host.replace(/:.*/, '');
	private port = 7000;

	constructor(){
		super();
		var self = this;
		console.log(self)
	}
	start(){
		var host = window.document.location.host.replace(/:.*/, '');
		this.connection = new CreateConntection(new WebSocket(this.address + ':' + this.port));
		this.connectionReady();
	}
}