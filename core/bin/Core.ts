import {BasicClass} from "./BasicClass";
import {Projects} from "./Projects";
import {Config} from "./Config";
import * as path from "path";

interface CoreConfig {
	projectsConfig: string;
}

export class Core extends BasicClass {
	private root: string;
	private config: Config<CoreConfig>;
	public projects: Projects;
	
	constructor(root: string, configPath: string){
		super();
		this.on('error', (error) => console.error(error));
		this.root = root;
		this.config = new Config(this.fromRoot(configPath));
		this.config.setCore(this);
		var projectsConfig = this.fromRoot(this.config.get().projectsConfig)
		this.projects = new Projects(projectsConfig);
		this.projects.setCore(this);
	}
	getConfig(){
		return this.config.get();
	}
	fromRoot(_path){
		return path.normalize(path.join.apply(path, [this.root, _path]));
	}
}