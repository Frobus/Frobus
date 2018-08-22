import * as React from "react";
import { connect } from "react-redux";


import {Location, isMatch} from "./Location";

export let navigation = {
	back: () => window.history.back(),
	forward: () => window.history.forward(),
	go: (position: number) => window.history.go(position),
	next: (url) => window.history.pushState({}, url, url),
	change: (url) => window.history.replaceState({}, url, url),
}


let RouteComponent = () => function(Component: React.Component) {
	return function(props){
		
	}
}


let reducer = function(state:any = {}, action){
	if( state.currentPage == null ){
		var location = new Location(window.location.href.replace(window.location.origin, ""));
		state = {...state,
			location: location.getLocation(),
			locationString: location.toString(),
		}
	}
	if( action.type != "ROUTER" ) return state;
	var changed = false;
	switch(action.method){
		case "back": navigation.back(); changed = true; break;
		case "forward": navigation.forward(); changed = true; break;
		case "go": navigation.go(action.argument); changed = true; break;
		case "next": navigation.next(action.argument); changed = true; break;
		case "change": navigation.change(action.argument); changed = true; break;
	}
	if( changed ){
		var location = new Location(window.location.href.replace(window.location.origin, ""));
		state.location = location.getLocation();
		state.locationString = location.toString();
	}
	console.log('changed state', state)
	return state;
}

export let CreateNavigation = function(dispatch){
	var fabric = function(action, arg?){
		return {
			type: "ROUTER",
			method: action,
			argument: arg
		}
	}
	return {
		back(){
			return dispatch(fabric("back"));
		},
		forward(){
			return dispatch(fabric("forward"));
		},
		go(position: number){
			return dispatch(fabric("go", position));
		},
		next(url: string){
			return dispatch(fabric("next", url));
		},
		change(url: string){
			return dispatch(fabric("change", url));
		},
	}
}

export {reducer};
export {Location};
export {isMatch}