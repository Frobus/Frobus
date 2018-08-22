import {WSBasicClass} from "./WSBasicClass";
import {BasicClass} from "./BasicClass";
import * as WS from "ws";

interface IServerConfig {
	port?: number
}

class ClientConnection extends WSBasicClass {
	constructor(connection: WS){
		super();
		this.connection = connection;
	}
}

export class Server extends BasicClass {
	private config: IServerConfig;
	private server: WS.Server;

	public defaultConfig = {
		port: 7000,
	};

	constructor(config: IServerConfig){
		super();
		this.config = Object.assign(this.defaultConfig, config);
	}
	start(){
		this.server = new WS.Server({
			port: this.config.port,
			perMessageDeflate: {
				// Other options settable:
				clientNoContextTakeover: true, // Defaults to negotiated value.
				serverNoContextTakeover: true, // Defaults to negotiated value.
				clientMaxWindowBits: 10,       // Defaults to negotiated value.
				serverMaxWindowBits: 10,       // Defaults to negotiated value.

				// Below options specified as default values.
				concurrencyLimit: 10,          // Limits zlib concurrency for perf.
				threshold: 1024,               // Size (in bytes) below which messages
												// should not be compressed.
			}
		});
		var self = this;
		this.server.on('connection', function(connection: WS){
			var _connection = new ClientConnection(connection);

			var TestRoot = {
				Projects: {
					add: function(){
						console.log("Projects:add", arguments);
						return "added";
					}
				}
			}

			_connection.setRoot( TestRoot );
			_connection.connectionReady();

			// _connection.call("Client", "hello", "man!").then((...args) => console.log(args))
		})
	}
}