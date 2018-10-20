import $getList from "./$getList"

export default function (state, itemKey){
	let list = $getList(state);
	return list.filter( item => item.key === itemKey )[0];
}