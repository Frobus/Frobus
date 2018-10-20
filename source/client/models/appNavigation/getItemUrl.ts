import getItemByKey from "./getItemByKey"

export default function getItemUrl(item){
	if( typeof item == 'string' ) item = getItemByKey(item);
	let parent = item.parent;
	let url = "/" + item.key + "/";
	while( parent ){
		url = "/" + parent + url;
		parent = getItemByKey(parent).parent;
	}
	return url;
}