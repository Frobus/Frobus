import {BasicClass} from "./BasicClass";
import {Config} from "./Config";

interface IProject {
	"name": string;
	"directory": string;
	"source": string;
	"destination": string;
}

interface IProjectConfig {
	"list": IProject[];
}

export class Projects extends BasicClass {
	private projects: Array<IProject>;
	private config: Config<IProjectConfig>;

	constructor(projectsConfigFile){
		super();
		this.projects = [];
		this.config = new Config<IProjectConfig>(projectsConfigFile, this.projects);
		this.config.load();
	}
	addProject(project: IProject){
		var projects: IProjectConfig = this.config.get();
		projects.list.push( project );
	}
	getProjects(){
		return this.config.get().list;
	}
}