import {connect}				from "react-redux"
import Nav 						from "@components/Nav";
import mainNavigation, {
	createNavigation
} 								from "@models/appNavigation"
import {
	StoreActions as boilerplatesStoreActions,
} 								from "@models/boilerplates";

const ConnectedNav = connect(function mapStateToProps(state){
	let nav = mainNavigation.getItems().concat([]);

	let boilderplates = boilerplatesStoreActions.getList(state);

	nav = createNavigation(nav);
	nav.push(boilderplates);

	return {
		nav: mainNavigation.getNavigation(),
	}
})(Nav)

export default ConnectedNav;