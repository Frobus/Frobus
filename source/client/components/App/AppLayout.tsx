import * as React 		from "react";

import { TitleBar } 	from 'electron-react-titlebar'; // !Need rewrite (1MB+)

import styled 			from "styled-components";
import getIcon 			from "@system/getIcon";
import appMenu 			from "@models/appMenu";

import 'electron-react-titlebar/assets/style.css';

function App(props){
	return <div id="browser" className={ props.className }>{ props.children }</div>
}

function Titlebar(props){
	return (
		<div id="browser__titlebar" className={ props.className }><TitleBar menu={ appMenu } icon={getIcon('svg')} /></div>
	);
}

function AppView(props){
	return (
		<div id="browser__view" className={ props.className }>{ props.children }</div>
	)
}

export default class AppLayout extends React.PureComponent<React.AllHTMLAttributes<HTMLDivElement>> {
	render(){
		return (
			<AppStyled className={ this.props.className }>
				<TitlebarStyled />
				<AppViewStyled children={this.props.children} />
			</AppStyled>
		);
	}
}

const AppStyled = styled(App)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	> * {
		width: 100%;
		flex-grow: 0;
		flex-shrink: 0;
	}
`;

const AppViewStyled = styled(AppView)`
	flex-grow: 1;
	overflow: auto;
	transform: translate3d(0, 0, 0);
	display: flex;
	flex-direction: column;
`;

const TitlebarStyled = styled(Titlebar)`
	#electron-app-title-bar .window-controls button {
		transition-property: color, background;
	}
`;