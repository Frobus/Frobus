import {Core} from "./Core";
import {Server} from "./Server";
import * as path from "path";

const core = new Core(__dirname, path.join("..", "configs", "config.json"));

const server = new Server({});
server.setCore(core);

server.start();

// core.projects.loadFromFile();