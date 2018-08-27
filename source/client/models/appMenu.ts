import { remote, WebviewTag } 					from "electron";
import { PartialMenuItemConstructorOptions } 	from 'electron-react-titlebar';

import browser 									from "@client/views/app";
import config 									from "@system/config";
import _package 								from "@system/package";
import openExternalUrl  						from "@system/openExternalUrl";
import openExternalFile  						from "@system/openExternalFile";
import text 									from "@system/text";

const template:(PartialMenuItemConstructorOptions & { submenu: PartialMenuItemConstructorOptions[] })[] = [
	{
		label: text('File'),
		submenu: [
			{
				label: text('Exit'),
				click() {
					const windowInstance = remote.getCurrentWindow();
					windowInstance.close();
				}
			}
		]
	},
	{
		label: text('Tools'),
		submenu: [
			{
				label: text('Reload content'),
				click(){
					const browserInstance = browser.get().webviewRef.current as WebviewTag;
					browserInstance.reload();
				}
			},
			{
				label: text('Toggle content devTools'),
				click(){
					browser.get().toggleDevTools();
				}
			},
			{
				type: 'separator',
			},
			{
				label: text('Reload application'),
				click(){
					const applicationInstance = remote.getCurrentWebContents();
					applicationInstance.reload();
				}
			},
			{
				label: text('Toggle application devTools'),
				click(){
					const webContents = remote.getCurrentWebContents();
					const openDevTools = !webContents.isDevToolsOpened();
					if(openDevTools){
						webContents.openDevTools();
					} else {
						webContents.closeDevTools();
					}
					config.set('window.devtools', openDevTools);
				}
			},
			{
				type: 'separator',
			},
			{
				label: text('Open config file'),
				click(){
					openExternalFile( config.getConf().path );
				}
			},
		]
	},
	{
		label: text('About'),
		submenu: [
			{
				label: text('Homepage'),
				click() {
					openExternalUrl(_package.homepage)
				}
			},
			{
				label: text('Repository'),
				click() {
					openExternalUrl(_package.repository.url.replace(/(.+)(https?\:\/\/)/, '$2') );
				}
			},
			{
				label: text('Bug report'),
				click() {
					openExternalUrl(_package.bugs.url );
				}
			}
		]
	}
]

export default template;