export interface IAddBoilerplate {
	name 	 : string,
	path 	 : string,
	key		?: string,
	options ?: any,
}
export interface IBoilerplate {
	name 	 : string,
	path 	 : string,
	key		 : string,
	options  : any,
}
export interface IState {
	list: IList,
}
export type IList = IBoilerplate[];


export interface IActions {
	addBoilerplate: (boilerplate: IAddBoilerplate) => void;
	getBoilerplate: (key: string) => (IBoilerplate | null);
	getList: () => IBoilerplate[];
}
