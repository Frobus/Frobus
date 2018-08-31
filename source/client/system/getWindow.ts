import {remote} from 'electron';

export default function getWindow(){
	return remote.getCurrentWindow();
}