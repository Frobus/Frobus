import * as React from "react";


import {Navigation} from "../Navigation/";
import {ProjectsPanel} from "../ProjectsPanel/";
import {IItem} from "../ProjectsPanel/";
import { reducer } from "./reducer";


require("./index.styl");

interface IState {

}

interface IProps {
}

export default class Layout extends React.Component<IProps, IState> {
	private list: Array<IItem>;

	constructor(props){
		super(props);
		this.props = props;
	}
	render() {
		var list = [
			{
				id: '1',
				icon: '@ti-wand',
				caption: 'Проекты',
				url: '/projects/123',
			},
			{
				id: '2',
				icon: '@ti-user',
				caption: 'Настройки',
				url: '/settings/321',
			}
		]
		return (
			<div className="app">
				<div className="app__columns">
					<div className="app__column app__navigation">
						<Navigation />
					</div>
					<div className="app__column app__navigation">
						<Navigation list={list} />
					</div>
					<div className="app__column app__content">
						{/* <Route path="/about" component={ProjectsPanel} list={list} /> */}
					</div>
				</div>
			</div>
		)
	}
}

let reducers = [];

reducers.push(function(state, action){
	return {...state, ...reducer(state, action)};
});

export {reducers}