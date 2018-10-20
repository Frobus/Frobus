import getItems from "./getItems";


export default function getItemByKey(key: string){
	return getItems().filter( item => (item.key === key) )[0];
}