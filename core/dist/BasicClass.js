"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = require("events");
var ClassError = /** @class */ (function (_super) {
    tslib_1.__extends(ClassError, _super);
    function ClassError(error, originalError) {
        var _this = _super.call(this, error.message) || this;
        error.originalError = originalError;
        return _this;
    }
    return ClassError;
}(Error));
var BasicClass = /** @class */ (function (_super) {
    tslib_1.__extends(BasicClass, _super);
    function BasicClass() {
        return _super.call(this) || this;
    }
    BasicClass.prototype.setCore = function (core) {
        this.core = core;
    };
    BasicClass.prototype.error = function (text, originalError) {
        var error = new ClassError({ message: text }, originalError);
        this.emit('error', error);
        if (this.core) {
            this.core.emit('error', error);
        }
    };
    return BasicClass;
}(events_1.EventEmitter));
exports.BasicClass = BasicClass;
