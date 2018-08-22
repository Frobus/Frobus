"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BasicClass_1 = require("./BasicClass");
var WSBasicClass = /** @class */ (function (_super) {
    tslib_1.__extends(WSBasicClass, _super);
    function WSBasicClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WSBasicClass.prototype.connectionReady = function () {
        var self = this;
        this.connection.on('message', function (message) {
            message = self.parseMessage(message);
            switch (message.type) {
                case 'call':
                    self.callHandler(message);
                    break;
                case 'result':
                    self.emit("result:" + message.id, message.result, message.error);
                    break;
            }
        });
    };
    WSBasicClass.prototype.createMessage = function (message) {
        return JSON.stringify(message);
    };
    WSBasicClass.prototype.parseMessage = function (message) {
        return JSON.parse(message);
    };
    WSBasicClass.prototype.send = function (message) {
        message = this.createMessage(message);
        this.connection.send(message);
    };
    WSBasicClass.prototype.call = function (objectName, methodName) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var req = {
            id: Date.now() + "." + Math.round(Math.random() * 1000000),
            type: "call",
            objectName: objectName,
            methodName: methodName,
            args: args,
        };
        var promise = new Promise(function (resolve, reject) {
            _this.once('result:' + req.id, function (result, error) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
        this.send(req);
        return promise;
    };
    WSBasicClass.prototype.callHandler = function (obj) {
        var root = this.getActions();
        var result = {
            id: obj.id,
            type: "result",
            error: false,
            result: false,
        };
        try {
            result.result = root[obj.objectName][obj.methodName].apply(root[obj.objectName], obj.args);
        }
        catch (error) {
            result.error = error;
        }
        this.send(result);
    };
    WSBasicClass.prototype.setActions = function (root) {
        this.actions = root;
    };
    WSBasicClass.prototype.getActions = function () {
        return this.actions;
    };
    WSBasicClass.prototype.addActions = function (newAction) {
        var actions = this.getActions();
        Object.keys(newAction).forEach(function (key) {
            if (!actions[key])
                actions[key] = {};
            actions[key] = tslib_1.__assign({}, actions[key], newAction[key]);
        });
        this.setActions(actions);
    };
    return WSBasicClass;
}(BasicClass_1.BasicClass));
exports.WSBasicClass = WSBasicClass;
