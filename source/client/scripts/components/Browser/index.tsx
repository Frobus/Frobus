import * as React from "react";
import BrowserLayout from "@components/BrowserLayout";

import "./styles.styl";

class Browser extends React.Component {
	webviewRef = React.createRef<HTMLWebViewElement>();
	webviewDevtoolsRef = React.createRef<HTMLWebViewElement>();

	render(){
		let webviewAttrs = {
			id: "browser-view",
			ref: this.webviewRef,
			src: "/content.html",
		}
		webviewAttrs['nodeintegration'] = "";
		return (
			<BrowserLayout>
				<webview {...webviewAttrs}></webview>
				<webview id="browser-devtools" ref={ this.webviewDevtoolsRef }></webview>
			</BrowserLayout>
		);
	}
	componentDidMount(){
		const browserView:any = this.webviewRef.current;
		const devtoolsView:any = this.webviewDevtoolsRef.current;

		browserView.addEventListener('dom-ready', () => {
			const browser = browserView.getWebContents();

			browser.setDevToolsWebContents(devtoolsView.getWebContents());
			browser.openDevTools();
		});
	}
}

export default Browser;