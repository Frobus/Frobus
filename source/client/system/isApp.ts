import viewType from "@system/viewType";

export default function isApp(){
	return viewType() == 'app';
}