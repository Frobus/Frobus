export function CreateController( options, methods ) {
	var actions = {};
	var reducerActions = {};

	Object.keys(methods).forEach(function(key){
		var handler = methods[key];
	});

	var createAction = function(){
		return {
			type: "",
		}
	}
	var doAction = function (dispatch){
		dispatch(createAction());
	}

	var reducer = function(state = {}, action){
		if( options.type != action.type ) return state;
	}


	return {
		reducer,
		createActions: function(dispatch){

		}
	}
}