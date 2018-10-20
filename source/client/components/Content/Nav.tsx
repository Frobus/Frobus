import {connect}				from "react-redux"
import Nav 						from "@components/Nav";
import createNavigation 		from "@utils/createNavigation";
import getItems 				from "@models/appNavigation/getItems";

const ConnectedNav = connect(function mapStateToProps(state){
	let nav = getItems();

	nav = createNavigation(nav);

	return {
		nav: nav,
	}
})(Nav)

export default ConnectedNav;