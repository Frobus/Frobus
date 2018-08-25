import * as fs from "fs";
import getAppPath from "./getAppPath";
export default JSON.parse(fs.readFileSync(getAppPath('package.json'), "UTF-8"));