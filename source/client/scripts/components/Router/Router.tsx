import * as React from "react";
import {RouterContext, IRouterProps} from "./index";
import {History, UnregisterCallback, createHashHistory, LocationDescriptorObject} from "history";

export class Router extends React.PureComponent<IRouterProps> {
	history: History = this.props.history || createHashHistory({
		hashType: "hashbang"
	});
	state = {
		location: this.history.location,
	};
	unregisterCallback: UnregisterCallback;

	componentDidMount(){
		this.unregisterCallback = this.history.listen((location) => {
			this.setState({
				location: location,
			})
		})
	}
	componentWillUnmount(){
		this.unregisterCallback();
	}

	render(){
		return <RouterContext.Provider children={ this.props.children } value={ {instance: this} } />
	}

	getLocation(){
		return this.state.location;
	}
	setLocation(location: LocationDescriptorObject){
		this.history.push(location);
	}
	go(path: string){
		this.history.push(path);
	}
}