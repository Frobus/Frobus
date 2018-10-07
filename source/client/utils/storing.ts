// import { createStore as reduxCreateStore, Reducer } from 'redux';

// interface IStore {
// 	dispatch: (...args) => void;
// }

// export default class Store {
// 	private store;
// 	private resucersList: Reducer[] = [];

// 	constructor(middleware?){
// 		this.store = reduxCreateStore(this.mainReducer, middleware);
// 	}
// 	mainReducer = (state, action) => {
// 		return this.resucersList.reduce((state, reducer) => reducer(state, action), state);
// 	}
// 	addReducer = (reducer: Reducer) => {
// 		if(typeof reducer !== 'function') throw new Error(`${reducer} no function`);
// 		this.resucersList.push(reducer);
// 		return this;
// 	}
// }






// abstract class Model {
// 	abstract name: string;
// 	abstract store: IStore;
// 	actions:{
// 		type: string,
// 		handler: (state: any, ...args) => any,
// 	}[] = [];

// 	getName(name){
// 		return [this.name, name].join('.');
// 	}
// 	addAction(actionName, handler){
// 		this.actions.push({
// 			type: this.getName(actionName),
// 			handler: handler,
// 		});
// 	}
// 	action(actionName, handler){
// 		this.addAction(actionName, handler);

// 		return (...args) => {
// 			store.dispatch({
// 				type: this.getName(actionName),
// 				args: args,
// 			});
// 		}
// 	}
// 	reducer(state, action){
// 		this.actions.reduce( (state, _action) => {
// 			if(_action.type !== action.type) return state;
// 			return _action.handler(state, ...(action.args || []));
// 		}, state);
// 	}
// };

// const store:any = new Store();

// // const childrenStore = store.createStore('children');

// class Children extends Model {
// 	store = store;
// 	name: 'children';
// 	state: {};

// 	test = this.action('test', (state) => {

// 	});
// 	test2(state, ...args){

// 	};
// }