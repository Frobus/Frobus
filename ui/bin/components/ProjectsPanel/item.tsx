import * as React from "react";

require("./item.styl");

export interface IItem {
	caption: string;
	aside?: Array<IItemAsideButton>;
}

interface IItemAsideButton {
	onClick(event: React.MouseEvent): void;
}


interface IState {
	
}

export class Item extends React.Component<IItem, IState> {
	constructor(props: IItem){
		super(props);
	}
	createAside(){
		if( !(this.props.aside && this.props.aside.length) ) return '';
		return this.props.aside.map( (asideButton, index) => {
			return this.createAsideButton(asideButton, index);
		});
	}
	createAsideButton(item: IItemAsideButton, index?: number){
		return (
			<div className="projects-panel-item__aside" >
				<a href="#" className="projects-panel-item__button" onClick={ item.onClick.bind(this) }></a>
			</div>
		)
	}
	render() {
		return (
			<div className="projects-panel-item">
				<div className="projects-panel-item__inner">
					<div className="projects-panel-item__caption">{ this.props.caption }</div>
					{ this.createAside() }
				</div>
			</div>
		)
	}
}