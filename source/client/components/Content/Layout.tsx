import * as React 				from "react";

import { Layout as AntLayout } 	from 'antd';

import * as system 				from "@system";
import Nav 						from "@components/Nav";
import ExternalLink  			from "@components/ExternalLink";
import LocationString 			from "@components/LocationString";

import delay from "@utils/delay";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;

import RouteContent from "./RouteContent";

import "antd/dist/antd.css";
import "./styles.styl";

import styled from "./styles";


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

	if(system.package.creationYear == currentYear){
		yearLabel = currentYear.toString();
	} else {
		yearLabel = `${ system.package.creationYear } - ${ currentYear }`;
	}

	const url = system.package.homepage;
	const name = system.getAppName();
	const version = system.getAppVersion();

	return (
		<Footer>
			<div><LocationString /></div>
			<div><ExternalLink href={ url }>{ name }</ExternalLink> v. { version } | { yearLabel }</div>
		</Footer>
	);
}

function RenderHeader(){
	return (<SectionHeader></SectionHeader>);
}

function RenderLogo(){
	return (<Logo><span>{ system.getAppName() }</span></Logo>);
}

function RenderContent(){
	return (
		<ContentScroll>
			<Content>
				<ContentInner>
					{ RouteContent() }
					{ "1235" }
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
	SectionHeader
} = styled({
	Aside: AntSider,
	SectionHeader: AntHeader,
	Section: AntLayout,
	Logo: "div",
	ContentInner: "div",
	ContentScroll: AntLayout,
	Content: AntContent,
	Footer: AntFooter,
});