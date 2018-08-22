"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BasicClass_1 = require("./BasicClass");
var Projects_1 = require("./Projects");
var Config_1 = require("./Config");
var path = require("path");
var Core = /** @class */ (function (_super) {
    tslib_1.__extends(Core, _super);
    function Core(root, configPath) {
        var _this = _super.call(this) || this;
        _this.on('error', function (error) { return console.error(error); });
        _this.root = root;
        _this.config = new Config_1.Config(_this.fromRoot(configPath));
        _this.config.setCore(_this);
        var projectsConfig = _this.fromRoot(_this.config.get().projectsConfig);
        _this.projects = new Projects_1.Projects(projectsConfig);
        _this.projects.setCore(_this);
        return _this;
    }
    Core.prototype.getConfig = function () {
        return this.config.get();
    };
    Core.prototype.fromRoot = function (_path) {
        return path.normalize(path.join.apply(path, [this.root, _path]));
    };
    return Core;
}(BasicClass_1.BasicClass));
exports.Core = Core;
