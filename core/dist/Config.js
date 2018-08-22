"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var BasicClass_1 = require("./BasicClass");
var Config = /** @class */ (function (_super) {
    tslib_1.__extends(Config, _super);
    function Config(configFile, configDefaults, autosave) {
        if (configDefaults === void 0) { configDefaults = {}; }
        if (autosave === void 0) { autosave = true; }
        var _this = _super.call(this) || this;
        _this.defaults = configDefaults;
        _this.file = configFile;
        _this.autosave = autosave;
        _this.config = Object.assign({}, _this.defaults);
        _this.load();
        return _this;
    }
    Config.prototype.load = function () {
        try {
            var config = fs.readFileSync(this.file, 'utf8');
            var configObject = JSON.parse(config);
            configObject = Object.assign({}, this.defaults, configObject);
            this.config = configObject;
            this.emit('loaded');
        }
        catch (error) {
            this.emit('error', error);
        }
    };
    Config.prototype.save = function () {
        try {
            var fileContent = JSON.stringify(this.config, null, '\t');
            fs.writeFileSync(this.file, fileContent, 'utf8');
            this.emit('saved');
        }
        catch (error) {
            this.emit('error', error);
        }
    };
    Config.prototype.set = function (newConfig) {
        this.config = Object.assign({}, this.config, newConfig);
        if (this.autosave) {
            this.save();
        }
    };
    Config.prototype.get = function () {
        return this.config;
    };
    return Config;
}(BasicClass_1.BasicClass));
exports.Config = Config;
