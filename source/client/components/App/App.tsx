import * as React from "react";
import Resizable from "re-resizable";

import AppLayout 		from "./AppLayout";
import config 			from "@system/config";
import getDistPath 		from "@system/getDistPath";

import "./styles.styl";

class DevTools extends React.PureComponent<{open: boolean, refCallback: (element: HTMLWebViewElement) => void}> {
	render(){
		if(!this.props.open) return '';
		return (
			<Resizable
				onResizeStop={this.onResize}
				enable={ {top: true} }
				id="browser-devtools-box"
				defaultSize={ {height: config.get('browser.devtool.height', 200)} }
			>
				<webview id="browser-devtools" ref={ this.props.refCallback } />
			</Resizable>
		);
	}
	onResize(event, direction , ref: HTMLWebViewElement, delta){
		config.set('browser.devtool.height', ref.offsetHeight);
	}
}

export default class Browser extends React.PureComponent {
	webviewRef = React.createRef<HTMLWebViewElement>();
	webviewDevtoolsRef = React.createRef<DevTools>();
	state = {
		devTools: false,
	}
	private ready = false;
	private devTools = config.get('browser.devtool.open', false);
	constructor(props){
		super(props);
		this.webviewDevtoolsCallback = this.webviewDevtoolsCallback.bind(this);
	}
	render(){
		let webviewAttrs = {
			id: "browser-view",
			ref: this.webviewRef,
			src: '',
		}

		/* @if !SERVER */
		webviewAttrs['src'] = getDistPath('client', 'content.html');
		/* @endif */
		/* @if SERVER */
		webviewAttrs['src'] = ('/* @echo DEV_URL */' || "//localhost:8080/") + "content.html";
		/* @endif */
		webviewAttrs['nodeintegration'] = "";
		return (
			<AppLayout>
				<webview {...webviewAttrs}></webview>
				<DevTools refCallback={ this.webviewDevtoolsCallback } open={ this.state.devTools } />
			</AppLayout>
		);
	}
	componentDidMount(){
		const browserView:any = this.webviewRef.current;

		browserView.addEventListener('dom-ready', () => {
			this.ready = true;
			this.toggleDevTools(this.devTools);
		});
	}
	toggleDevTools(newState = !this.devTools){
		if( newState === this.state.devTools ) return;
		if(this.ready){
			const browserView:any = this.webviewRef.current;
			const browser = browserView.getWebContents();
			if(newState){
				this.setState({
					devTools: newState,
				});
			} else {
				browser.closeDevTools();
				this.setState({
					devTools: newState,
				})
			}
		}
		this.devTools = newState;
		config.set('browser.devtool.open', newState);
	}
	webviewDevtoolsCallback(devtoolsView: any){
		if(!this.devTools) return;
		const browserView:any = this.webviewRef.current;
		const browser = browserView.getWebContents();
		browser.setDevToolsWebContents(devtoolsView.getWebContents());
		setTimeout(() => browser.openDevTools(), 0);
	}
}