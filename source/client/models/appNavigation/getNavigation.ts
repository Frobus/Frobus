import createNavigation 	from "@utils/createNavigation";
import INavigationItem 		from "./INavigationItem";
import getItems 			from "./getItems";

export default function getNavigation(): INavigationItem[]{
	let items = getItems()
	return createNavigation(items);
}