import * as React 				from "react";

import { Layout as AntLayout } 	from 'antd';
import styled 					from "./styles";

import * as system 				from "@system";
import Nav 						from "@components/Nav";
import ExternalLink  			from "@components/ExternalLink";
import LocationString 			from "@components/LocationString";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;

// import RouteContent from "./RouteContent";

import "antd/dist/antd.css";
import "./styles.styl";


class RouteContent extends React.Component {
	state = {
		component: "",
	}
	componentWillMount(){
		import(/* webpackChunkName: "Layout_RouteContent" */ './RouteContent').then(component => {
			this.setState({component: component});
		}).catch(error => 'An error occurred while loading the component');
	}
	render(){
		return this.state.component;
	}
}

export default class Layout extends React.PureComponent {
	constructor(props){
		super(props);
		this.Footer = this.Footer.bind(this);
		this.Logo = this.Logo.bind(this);
		this.Header = this.Header.bind(this);
		this.Content = this.Content.bind(this);
	}
	Footer(){
		const currentYear = (new Date(Date.now())).getFullYear();
		const yearLabel =
			(system.package.creationYear == currentYear)
			? currentYear
			: `${ system.package.creationYear } - ${ currentYear }`;
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
	Logo(){
		return (<Logo><span>{ system.getAppName() }</span></Logo>);
	}
	Header(){
		return (<SectionHeader></SectionHeader>);
	}
	Content(){
		return (
			<ContentScroll>
				<Content>
					<ContentInner>
						<RouteContent />
					</ContentInner>
				</Content>
				{ this.Footer() }
			</ContentScroll>
		);
	}

	render(){
		return (
			<AntLayout>
				<Aside>
					{ this.Logo() }
					<Nav />
				</Aside>
				<Section>
					{ this.Header() }
					{ this.Content() }
				</Section>
			</AntLayout>
		);
	}
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