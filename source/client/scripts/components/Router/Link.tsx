import * as React from "react";

import {GetRouter, ILinkProps, Router} from "./";

export class Link extends React.PureComponent<ILinkProps> {
	onClick(router: Router, event: React.MouseEvent<HTMLAnchorElement>){
		event.preventDefault();
		router.go( event.currentTarget.getAttribute('href') );
	}
	render(){
		return (
			<GetRouter>{ (router) => (
				<a href={ this.props.href } onClick={ this.onClick.bind(this, router) } children={ this.props.children } />
			)}</GetRouter>
		);
	}
}