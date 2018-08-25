import * as React from "react";
import BrowserLayout from "@components/BrowserLayout";

import "./styles.styl";

import path from "@utils/path";
import app from "@system/app";

class Browser extends React.Component {
	webviewRef = React.createRef<HTMLWebViewElement>();
	// #if DEV
	webviewDevtoolsRef = React.createRef<HTMLWebViewElement>();
	// #endif

	render(){
		let webviewAttrs = {
			id: "browser-view",
			ref: this.webviewRef,
			src: "/content.html",
		}

		/* #if !DEV */
		webviewAttrs['src'] = path(app.getAppPath(), 'dist', 'client', 'content.html');
		/* #endif */

		webviewAttrs['nodeintegration'] = "";
		return (
			<BrowserLayout>
				<webview {...webviewAttrs}></webview>
				// #if DEV
				<webview id="browser-devtools" ref={ this.webviewDevtoolsRef }></webview>
				// #endif
			</BrowserLayout>
		);
	}
	// #if DEV
	componentDidMount(){
		const browserView:any = this.webviewRef.current;
		const devtoolsView:any = this.webviewDevtoolsRef.current;

		browserView.addEventListener('dom-ready', () => {
			const browser = browserView.getWebContents();

			browser.setDevToolsWebContents(devtoolsView.getWebContents());
			browser.openDevTools();
		});
	}
	// #endif
}

export default Browser;