"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = require("events");
var CreateConntection = /** @class */ (function (_super) {
    tslib_1.__extends(CreateConntection, _super);
    function CreateConntection(connection) {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.connection = connection;
        _this.connection.onmessage = function (event) {
            self.emit('message', event.data);
        };
        _this.connection.onopen = function (event) {
            self.emit('open', event);
        };
        _this.connection.onclose = function (event) {
            self.emit('close', event);
        };
        _this.connection.onerror = function (event) {
            self.emit('error', event);
        };
        return _this;
    }
    CreateConntection.prototype.send = function (obj) {
        if (typeof obj == 'string') {
            this.connection.send(obj);
        }
        else if (typeof obj == 'object') {
            this.connection.send(JSON.stringify(obj));
        }
    };
    return CreateConntection;
}(events_1.EventEmitter));
exports.CreateConntection = CreateConntection;
