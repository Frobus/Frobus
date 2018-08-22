import * as React from "react";
import "./Button.css";
interface State {
	count: number;
}

interface Props {
	
}

export default class Button extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			count: 0
		};
	}
	clickHandler(event: React.MouseEvent<HTMLAnchorElement>){
		event.preventDefault();
		this.setState({
			count: this.state.count + 1,
		})
	}
	render(){
		return (
			<a href="#" className="button" onClick={ this.clickHandler.bind(this) }>{ this.state.count }</a>
		)
	}
}