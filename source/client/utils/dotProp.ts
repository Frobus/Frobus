class DotProp {
	getPath(path: string){
		if(!path) return [];
		return path.split('.');
	}
	get(obj: any, path: string = "", defaultValue: any = undefined){
		if(!(obj instanceof Object)) return defaultValue;
		let _path = this.getPath(path);
		let currentPath = "";
		for(let i = 0; i < _path.length; i++){
			currentPath = _path[i];
			if(!(obj instanceof Object)) return defaultValue;
			if( obj[currentPath] === undefined ) return defaultValue;
			obj = obj[currentPath];
		}
		return obj;
	}
	set(obj: any, path: string = "", value: any){
		return this.setter(obj, path, value, false);
	}
	assign(obj: any, path: string = "", value: any){
		return this.setter(obj, path, value, true);
	}
	has(obj: any, path: string){
		let _path = this.getPath(path);
		let currentPath = "";
		if(!_path.length) return false;
		for(let i = 0; i < _path.length; i++){
			currentPath = _path[i];
			if(!(obj instanceof Object)) return false;
			if( obj[currentPath] === undefined ) return false;
			obj = obj[currentPath];
		}
		return true;
	}
	setter(obj: any, path: string = "", value: any, assign: boolean){
		if(!(obj instanceof Object)) return obj;
		let _path = this.getPath(path);
		let currentPath = "";
		let isLast = false;
		if(!assign){
			obj = {...obj};	
		}
		let root = obj;
		for(let i = 0; i < _path.length; i++){
			currentPath = _path[i];
			isLast = i == _path.length - 1;
			if(!(obj instanceof Object)){
				throw new Error(`${obj} is not object`);
			}
			if(isLast){
				obj[currentPath] = value;
				return root;
			}
			if( obj[currentPath] === undefined ){
				obj[currentPath] = {};
			} else if(!assign) {
				obj[currentPath] = {
					...obj[currentPath]
				}
			}
			obj = obj[currentPath];
		}
		return root;
	}
}

export default new DotProp();