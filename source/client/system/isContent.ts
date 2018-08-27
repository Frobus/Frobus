import viewType from "@system/viewType";

export default function isContent(){
	return viewType() == 'content';
}