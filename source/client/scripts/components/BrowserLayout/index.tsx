import * as React from "react";
import { TitleBar } from 'electron-react-titlebar';
import 'electron-react-titlebar/assets/style.css';
import styled from "styled-components";

function Browser(props){
	return <div id="browser" className={ props.className }>{ props.children }</div>
}

function Titlebar(props){
	return (
		<div id="browser__titlebar" className={ props.className }><TitleBar menu={ [] } icon={''} /></div>
	);
}

function BrowserView(props){
	return (
		<div id="browser__view" className={ props.className }>{ props.children }</div>
	)
}

export default class BrowserLayout extends React.PureComponent<React.AllHTMLAttributes<HTMLDivElement>> {
	render(){
		return (
			<BrowserStyled className={ this.props.className }>
				<TitlebarStyled />
				<BrowserViewStyled children={this.props.children} />
			</BrowserStyled>
		);
	}
}

const BrowserStyled = styled(Browser)`
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

const BrowserViewStyled = styled(BrowserView)`
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