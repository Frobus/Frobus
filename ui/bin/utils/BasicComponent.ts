// import * as React from "react";

// export class VBasicComponent<IItem, IState> extends React.Component<IItem, IState> {
// 	private moduleName: string = '';
// 	constructor(props, moduleName: string){
// 		super(props);
// 		this.moduleName = moduleName;
// 	}
// 	createClass(elementName?: string, modificator?:string):string {
// 		var result = this.moduleName;
// 		if( elementName ){
// 			result += "__" + elementName;
// 		}
// 		if( modificator ){
// 			result += "_" + modificator;
// 		}
// 		return result;
// 	}
// 	tag(props){
// 		const tag = props['tag'];
// 		delete props['tag'];
// 		return React.createElement(tag, props);
// 	}
// }
// export {React};

// interface IBEMProps extends React.HTMLProps<HTMLAllCollection> {
// 	tag: string;
// 	block?: string;
// 	element?: string;
// 	modificator?: string;
// }
// interface IState {
// 	props: object;
// }

// export class BEM extends React.Component<IBEMProps, IState> {
// 	constructor(props: IBEMProps){
// 		super(props);
// 		var filteredKeys = {
// 			tag: true,
// 		}
// 		var attributes = Object.keys(props).filter((key) => !filteredKeys[key]).reduce((obj, key) => {
// 			obj[key] = props[key];
// 			return obj;
// 		}, {});

// 		this.state = {
// 			props: attributes
// 		}
// 	}
// 	render(){
// 		const tag = this.props['tag'];
// 		return React.createElement(tag, this.state.props);
// 	}
// }

// export class Block extends React.Component {
// 	constructor(props){
// 		super(props)
// 	}
// }