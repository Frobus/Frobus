import * as React from "react";
import {Menu as AntMenu, Icon } from 'antd';
import {Location as ILocation} from "history";

import appNavigation from "@models/appNavigation";
import GetRouter from "@components/Router/GetRouter";

export interface onSelectEvent {

}

export default class Nav extends React.PureComponent {
	constructor(props){
		super(props);
	}
	onSelectHandler(router, event){
		const url = appNavigation.getItemUrl(event.key);
		router.go(url);
	}
	getSelectedFromLocation(location: ILocation){
		return location.pathname.split('/').filter(Boolean);
	}
	renderNav(list: any[]){
		const renderItem = (item) => {
			return (
				<AntMenu.Item key={ item.key } >
					<Icon type={ item.icon } />
					<span className="nav-text">{ item.caption }</span>
				</AntMenu.Item>
			);
		}
		const renderSubmenu = (item) => {
			const title = <span><Icon type={ item.icon } /><span>{ item.caption }</span></span>;
			return (
				<AntMenu.SubMenu key={ item.key } title={ title }>
					{ item.children.map(render) }
				</AntMenu.SubMenu>
			);
		}
		const render = (item) => {
			return (item['children'] && item.children['length']) ? renderSubmenu(item) : renderItem(item);
		}

		return list.map(render);
	}
	render(){
		const navigation = appNavigation.getNavigation();
		return (
			<GetRouter>{ (router) => (
				<AntMenu
					onSelect={ this.onSelectHandler.bind(this, router) }
					theme="dark"
					selectable={true}
					mode="inline"
					defaultOpenKeys={ ['projects', 'boilerplates'] }
					selectedKeys={ this.getSelectedFromLocation( router.getLocation() ) }
				>
					{ this.renderNav(navigation) }
				</AntMenu>
			)}</GetRouter>
		);
	}
}