import {EventEmitter} from 'events';
import ServerConnection from "./ServerConnection";
import * as React from "react";

export default class App extends EventEmitter {
	private server: ServerConnection;
	private reducers: any[];

	constructor (){
		super();

		this.reducers = [];

		this.server = new ServerConnection();

		this.server.setActions({
			Client: {
				hello: function(){
					console.log("Client:hello", arguments);
					return "welcome";
				}
			}
		})
	}

	startServer(){
		this.server.start();
	}

	addReducers(reducers){
		if( !Array.isArray(reducers) ) reducers = [reducers];
		reducers.forEach( (reducer) => this.reducers.push(reducer) );
	}

	getReducers(){
		return (state, action) => {
			var results = [];
			var resultState = state ? {...state} : {};
			if( state == undefined ){
				this.emit('actions:init', resultState, action, (_resultState) => {
					resultState = {...resultState, ..._resultState};
				});
			}
			this.emit('actions:begin', resultState, action, (_resultState) => {
				resultState = {...resultState, ..._resultState};
			});

			this.reducers.forEach((reducer) => {
				resultState =  {...resultState, ...reducer(resultState, action)};
			});

			this.emit('actions:end', resultState, action, (_resultState) => {
				resultState = {...resultState, ..._resultState};
			});
			
			console.log('resultState', resultState)

			return resultState;
		}
	}
}