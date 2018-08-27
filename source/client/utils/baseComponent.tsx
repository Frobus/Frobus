import * as React from "react";

export default class BaseComponent<P = {}, S = {}> extends React.PureComponent<P & IProps, S & IState > {
	private stateInited = false;
	constructor(props){
		super(props);
		
		this.setState(Object.assign({
			tagName: 'div',
		}, props));
	}
	componentWillMount(){
		this.stateInited = true;
	}
	setState(state){
		if( this.stateInited ) return React.PureComponent.prototype.setState(state);
		this.state = Object.assign({}, this.state, state);
	}
	render(){
		return React.createElement(this.state.tagName, this.getAttributes(), this.content());
	}
	content(): React.ReactNode | string {
		return this.props.children || '';
	}
	getAttributes(){
		let attrs: any = Object.assign({}, this.state);
		delete attrs['tagName'];
		return attrs;
	}
	addClass(className:string[]|string){
		let classes = (this.state.className || "").split(' ');
		if( !Array.isArray(className) ){ className = [className]; }
		let changed = false;
		className.forEach( className => {
			if( classes.indexOf(className) === -1 ){
				classes.push(className);
				changed = true;
			}
		});
		if( changed ){
			this.setState({
				className: classes.join(' ')
			})
		}
		return this;
	}
	removeClass(className:string[]|string){
		let classes = (this.state.className || "").split(' ');
		if( !Array.isArray(className) ){ className = [className]; }
		let changed = false;
		classes = classes.filter(_className => {
			if(className.indexOf(_className) === -1) return true;
			changed = true;
			return false;
		});
		if( changed ){
			this.setState({
				className: classes.join(' ')
			})
		}
		return this;
	}
	hasClass(className:string):boolean {
		let classes = (this.state.className || "").split(' ');
		return (classes.indexOf(className) === -1);
	}
}

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {

}
export interface IState extends React.HTMLAttributes<HTMLDivElement> {
	tagName: string;
}