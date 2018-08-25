import {text} from "@system";


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
			key: "project-new",
			icon: "folder-add",
			data: { id: "new" },
			caption: text('Add new project'),
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
			caption: text('Add new boilerplate'),
			parent: "boilerplates",
		},
		{
			key: "boilerplate-1",
			icon: "file",
			data: { id: 1 },
			caption: 'Some boilerplate',
			parent: "boilerplates",
		}
	]
	getNavigation(){
		var result = [];
		var itemsByKeys = {};
		this.items.forEach((item) => {
			if( itemsByKeys[item.key] == null ) itemsByKeys[item.key] = {};
			Object.assign( itemsByKeys[item.key], item );
			if( item.parent ){
				if( itemsByKeys[item.parent] == null ) itemsByKeys[item.parent] = {};
				if( itemsByKeys[item.parent].children == null ) itemsByKeys[item.parent].children = [];
				itemsByKeys[item.parent].children.push(itemsByKeys[item.key]);
			} else {
				result.push( itemsByKeys[item.key] );
			}
		});
		return result;
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