import * as React 						from "react";
import {Layout as AntLayout, Menu}		from 'antd';

import styles from "./styles";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;



export default function RenderHeader(){
	return (
		<SectionHeader>
			{/* <SectionHeaderLayout>
				<SectionHeaderMenu
					theme="dark"
					mode="horizontal"
				>
				</SectionHeaderMenu>
				<Lang theme="dark" mode="horizontal">
					<Menu.SubMenu title={<span>Lang</span>}>
						<Menu.Item key="setting:1">Option 1</Menu.Item>
						<Menu.Item key="setting:2">Option 2</Menu.Item>
					</Menu.SubMenu>
				</Lang>
			</SectionHeaderLayout> */}
		</SectionHeader>
	);
}




const {
	SectionHeader,
	// Lang,
	// SectionHeaderLayout,
	// SectionHeaderMenu
} = styles({
	SectionHeader: AntHeader,
	// Lang: Menu,
	// SectionHeaderLayout: AntLayout,
	// SectionHeaderMenu: Menu
});