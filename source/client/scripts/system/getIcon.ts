import getDistPath from "./getDistPath";
import isWin from "./isWin";

export default function getIcon(ext = (isWin ? 'ico' : "png")){
	/* @if WATCH */
	return "//localhost:8080/icons/icon."  + ext;
	/* @endif */
	/* @if !WATCH */
	return getDistPath('client', 'icons', 'icon.' + ext);
	/* @endif */
}