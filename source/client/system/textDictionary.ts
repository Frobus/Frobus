import getAppPath from "./getAppPath";
import ConfBuffered from "@utils/ConfBuffered";

export default new ConfBuffered({
	cwd: getAppPath('lang'),
	configName: 'lang',
});