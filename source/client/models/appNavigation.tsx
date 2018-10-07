import * as React 		from "react";
import text 			from "@system/text";
import icons 			from "@system/icons"
import createNavigation from "@utils/createNavigation";

// import boilerplates, {
// 	IBoilerplate
// }						from "@models/boilerplates"

export const reducer = function (state, actions) {
	
}

export const getNavigation = () => {
	return [
		{
			key: "projects",
			caption: text('Projects'),
			icon: "appstore-o",
		},
		{
			key: "boilerplates",
			caption: text('Boilerplates'),
			icon: "code-o",
		},
		{
			key: "settings",
			caption: text('Settings'),
			icon: "setting",
		},

		{
			key: "project-new",
			icon: "folder-add",
			data: { id: "new" },
			caption: text('New project'),
			parent: "projects",
		},
		{
			key: "project-1",
			icon: "folder",
			data: { id: 1 },
			caption: 'Some project',
			parent: "projects",
		},
		{
			key: "boilerplate-new",
			icon: "file-add",
			data: { id: "new" },
			caption: text('New boilerplate'),
			parent: "boilerplates",
		}
	];
}

export type INavigationItem = {
	key: string,
	icon: icons,
	data: any,
	caption: string,
	children?: INavigationItem[],
}

class Navigation {
	items = [
		{
			key: "projects",
			caption: text('Projects'),
			icon: "appstore-o",
		},
		{
			key: "boilerplates",
			caption: text('Boilerplates'),
			icon: "code-o",
		},
		{
			key: "settings",
			caption: text('Settings'),
			icon: "setting",
		},

		{
			key: "project-new",
			icon: "folder-add",
			data: { id: "new" },
			caption: text('New project'),
			parent: "projects",
		},
		{
			key: "project-1",
			icon: "folder",
			data: { id: 1 },
			caption: 'Some project',
			parent: "projects",
		},
		{
			key: "boilerplate-new",
			icon: "file-add",
			data: { id: "new" },
			caption: text('New boilerplate'),
			parent: "boilerplates",
		}
	];

	getNavigation(): INavigationItem[]{
		return createNavigation(this.items);
	}
	getItems(){
		return this.items;
	}
	getItemByKey(key: string){
		return this.items.filter( item => (item.key === key) )[0];
	}
	getItemUrl(item){
		if( typeof item == 'string' ) item = this.getItemByKey(item);
		let parent = item.parent;
		let url = "/" + item.key + "/";
		while( parent ){
			url = "/" + parent + url;
			parent = this.getItemByKey(parent).parent;
		}
		return url;
	}
}

export default new Navigation();
export {createNavigation}