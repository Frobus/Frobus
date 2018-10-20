import {store} from "@system/AppStore";
import $getList from "./$getList"

export default function () {
	return $getList(store.getState());
} 