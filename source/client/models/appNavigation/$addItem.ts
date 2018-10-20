import $getItems from "./$getItems";
import $setItems from "./$setItems";

export default function $addItem(state, item){
	console.trace();
	let items = $getItems(state);
	items.push(item);
	return $setItems(state, items);
}