import * as React 				from "react";

import AntLayout 				from '@components/antd/Layout';

import _package 				from "@system/package";
import getAppName				from "@system/getAppName";
import getAppVersion			from "@system/getAppVersion";
import Nav 						from "@components/Nav";
import ExternalLink  			from "@components/ExternalLink";
import LocationString 			from "@components/LocationString";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;

import RouteContent 		from "./RouteContent";
import RenderHeader 		from "./RenderHeader"

import "antd/dist/antd.css";
import "./styles.styl";

import styles from "./styles";


export default class Layout extends React.PureComponent {
	render(){
		return (
			<AntLayout>
				<Aside width={280}>
					{ RenderLogo() }
					<Nav />
				</Aside>
				<Section>
					{ RenderHeader() }
					{ RenderContent() }
				</Section>
			</AntLayout>
		);
	}
}



function RenderFooter(){
	const currentYear = (new Date(Date.now())).getFullYear();
	let yearLabel = '';

	if(_package.creationYear == currentYear){
		yearLabel = currentYear.toString();
	} else {
		yearLabel = `${ _package.creationYear } - ${ currentYear }`;
	}

	const url = _package.homepage;
	const name = getAppName();
	const version = getAppVersion();

	return (
		<Footer>
			<div><LocationString /></div>
			<div><ExternalLink href={ url }>{ name }</ExternalLink> v. { version } | { yearLabel }</div>
		</Footer>
	);
}

function RenderLogo(){
	return (<Logo><span>{ getAppName() }</span></Logo>);
}

function RenderContent(){
	return (
		<ContentScroll>
			<Content>
				<ContentInner>
					{ RouteContent() }
				</ContentInner>
			</Content>
			<RenderFooter />
		</ContentScroll>
	);
}



const {
	Aside,
	Section,
	Logo,
	ContentInner,
	ContentScroll,
	Content,
	Footer,
} = styles({
	Aside: AntSider,
	Section: AntLayout,
	Logo: "div",
	ContentInner: "div",
	ContentScroll: AntLayout,
	Content: AntContent,
	Footer: AntFooter,
});