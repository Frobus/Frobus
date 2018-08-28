import ConfBuffered from "@utils/ConfBuffered";

export default function (app){
	return new ConfBuffered({
		configName: "app-config",
		cwd: app.getPath('userData'),
	});
}