import _package from "@system/package";
import openExternalUrl  from "@system/openExternalUrl";
import text from "@system/text";
import { PartialMenuItemConstructorOptions } from 'electron-react-titlebar';
import {remote} from "electron";
import browser from "@client/scripts/browser";
import config from "@system/config";

const template:(PartialMenuItemConstructorOptions & { submenu: PartialMenuItemConstructorOptions[] })[] = [
	{
		label: text('View'),
		submenu: [
			{
				label: text('Toggle Window DevTools'),
				click(){
					const webContents = remote.getCurrentWebContents();
					const openDevTools = !webContents.isDevToolsOpened();

					// webContents.on('devtools-closed');
					// webContents.on('devtools-opened');
					if(openDevTools){
						webContents.openDevTools();
					} else {
						webContents.closeDevTools();
					}
					config.set('window.devtools', openDevTools);
				}
			},
			{
				label: text('Toggle Content DevTools'),
				click(){
					browser.get().toggleDevTools();
				}
			}
		]
	},
	{
		label: text('Help'),
		submenu: [
			{
				label: text('Learn More'),
				click() {
					openExternalUrl(_package.homepage)
				}
			}
		]
	}
]

export default template;