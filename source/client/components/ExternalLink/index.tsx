import * as React from "react";
import onClickExternal from "@system/onClickExternal";

export default class ExternalLink extends React.PureComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
	render(){
		let props = Object.assign({
			onClick: onClickExternal,
		}, this.props);
		return (
			<a {...props }>{this.props.children}</a>
		);
	}
}