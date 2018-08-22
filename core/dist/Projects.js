"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BasicClass_1 = require("./BasicClass");
var Config_1 = require("./Config");
var Projects = /** @class */ (function (_super) {
    tslib_1.__extends(Projects, _super);
    function Projects(projectsConfigFile) {
        var _this = _super.call(this) || this;
        _this.projects = [];
        _this.config = new Config_1.Config(projectsConfigFile, _this.projects);
        _this.config.load();
        return _this;
    }
    Projects.prototype.addProject = function (project) {
        var projects = this.config.get();
        projects.list.push(project);
    };
    Projects.prototype.getProjects = function () {
        return this.config.get().list;
    };
    return Projects;
}(BasicClass_1.BasicClass));
exports.Projects = Projects;
