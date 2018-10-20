import * as React 				from "react";
import {Location as ILocation} 	from "history";
import styled 					from "styled-components";

import {Menu as AntMenu, Icon} 	from 'antd';

import getItemUrl	 			from "@models/appNavigation/getItemUrl";
import GetRouter 				from "@components/Router/GetRouter";
import config 					from "@system/config";

interface INavItem {
	caption		 : string;
	key			 : string;
	icon		?: string;
	children	?: INavList;
}
type INavList = INavItem[];

interface INavProps {
	nav: INavList;
}

export default class Nav extends React.PureComponent<INavProps> {
	onSelectHandler(router, event){
		const url = getItemUrl(event.key);
		router.go(url);
	}
	getSelectedFromLocation(location: ILocation){
		return location.pathname.split('/').filter(Boolean);
	}
	renderNav(list: INavList){
		const renderItem = (item: INavItem) => {
			return (
				<AntMenu.Item key={ item.key } >
					<Icon type={ item.icon } />
					<span className="nav-text">{ item.caption }</span>
				</AntMenu.Item>
			);
		}
		const renderSubmenu = (item: INavItem) => {
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
		// let navigationList = appNavigation.getItems();
		
		// navigationList = navigationList.concat(this.props.boilerplates.map(item => ({
		// 	key: item.key,
		// 	icon: "file",
		// 	data: { id: item.key },
		// 	caption: item.name,
		// 	parent: "boilerplates",
		// })));

		// const navigation = createNavigation(navigationList);

		const navigation = this.props.nav;
		const defaultOpenKeys = config.get('nav.openKeys', navigation.map( item => item.key ));



		return (
			<GetRouter>{ (router) => {
				const selectedKeys = this.getSelectedFromLocation( router.getLocation() );
				const onSelect = this.onSelectHandler.bind(this, router);
				const onOpenChange = this.onOpenChange.bind(this)
				return (
					<NavStyled>
						<AntMenu
							theme="dark"
							mode="inline"
							selectable={true}
							selectedKeys={ selectedKeys }
							defaultOpenKeys={ defaultOpenKeys }

							onSelect={ onSelect }
							onOpenChange={ onOpenChange }
						>
							{ this.renderNav(navigation) }
						</AntMenu>
					</NavStyled>
				)
			}}</GetRouter>
		);
	}
	onOpenChange(openKeys: string[]){
		config.set('nav.openKeys', openKeys);
	}
}

// let ConnectedNav = boilerplatesConnect<IConnectedBoilerplates>(function mapStateToProps(state){
// 	return {
// 		boilerplates: state.list,
// 	}
// })(Nav);
// export default ConnectedNav;

const NavStyled = styled("div")`
	.ant-menu-dark.ant-menu-inline .ant-menu-submenu-title,
	.ant-menu-dark.ant-menu-inline .ant-menu-item {
		font-size: 16px;
		line-height: 20px;
		height: auto;
		padding-top: 10px;
		padding-bottom: 10px;
		white-space: normal;
		display: flex;
		align-items: flex-start;
	}
	.ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
		padding-top: 15px;
		padding-bottom: 15px;
	}
`