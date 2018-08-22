import * as React from "react";

import {Item, IItem} from "./item";

require("./index.styl?test=123");

interface IState {
	list: Array<IItem>;
}

interface IProps {
	list: Array<IItem>;
}

export { IItem };

export class ProjectsPanel extends React.Component<IProps, IState>  {
	constructor(props: IProps){
		super(props);
		this.state = {
			list: this.props.list || [],
		}
	}
	addChild(item: IItem){
		var newState = {
			list: this.state.list.concat([item])
		}
		this.setState(newState);
	}
	setProjects(){
		
	}
	createList(){
		return this.state.list.map((item: IItem, index) => {
			return ( <Item {...item} key={index} /> )
		})
	}
	render() {
		return (
			<div className="projects-panel">
				{ this.createList() }
			</div>
		)
	}
}