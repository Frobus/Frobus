import icons 				from "@system/icons"
type INavigationItem = {
	key: string,
	icon: icons,
	data: any,
	caption: string,
	children?: INavigationItem[],
}
export default INavigationItem;