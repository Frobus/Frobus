export default function createNavigation(items){
	var result = [];
	var itemsByKeys = {};
	items.forEach((item) => {
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