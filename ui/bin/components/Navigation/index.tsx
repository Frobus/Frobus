import * as React from "react";
import { connect } from "react-redux";

import {isMatch as urlIsMatch, CreateNavigation} from "../Router";

import "./index.styl";

class Navigation extends React.Component<any, any> {
	constructor(props: any){
		super(props);
	}
	render(){
		var list = this.props.navigation;
		return (
			<div className="navigation">
				<div className="navigation__list">
					{ list.map( item => this.renderItem(item) ) }
				</div>
			</div>
		)
	}
	renderItem(item){
		var isCurrentPage = urlIsMatch(this.props.location, item.url);
		return (
			<this.ItemElement item={item} gotoUrl={ this.props.gotoUrl.bind(this) } key={item.id} isCurrentPage={isCurrentPage}>
				<div className="navigation__item-icon">
					{
						(item.icon.indexOf('@') == 0)
						?
						<span className={item.icon.replace('@', '')}></span>
						:
						<img src={item.icon} alt={item.caption}/>
					}
				</div>
			</this.ItemElement>
		);
	}
	ItemElement (props){
		let item = props.item;
		var isCurrentPage = props.isCurrentPage;
		var isLink = !!(!isCurrentPage || isCurrentPage._);

		var className = "navigation__item";
		if( isCurrentPage ){
			className += " navigation__item_current";
		}

		if( isLink ){
			return (
				<a href={item.url} onClick={ (e) => {e.preventDefault(); props.gotoUrl(item.url) } } className={className} data-caption={item.caption}>
					{...props.children}
				</a>
			)
		}
		return (
			<span className={className} data-caption={item.caption}>
				{...props.children}
			</span>
		)
	}
}

var ConnectedNavigation = connect(function mapStateToProps(state: any, ownProps: any){
	console.log('arguments', arguments)
	return {
		navigation: ownProps.list ? ownProps.list : state.mainNavigation,
		location: state.location.string
	}
}, function mapDispatchToProps(dispatch){
	let navigation = CreateNavigation(dispatch);
	return {
		gotoUrl(url){
			console.log('url', url)
			navigation.next(url);
		}
	}
})(Navigation);

export {ConnectedNavigation as Navigation}