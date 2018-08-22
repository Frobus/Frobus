"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WSBasicClass_1 = require("./WSBasicClass");
var BasicClass_1 = require("./BasicClass");
var WS = require("ws");
var ClientConnection = /** @class */ (function (_super) {
    tslib_1.__extends(ClientConnection, _super);
    function ClientConnection(connection) {
        var _this = _super.call(this) || this;
        _this.connection = connection;
        return _this;
    }
    return ClientConnection;
}(WSBasicClass_1.WSBasicClass));
var Server = /** @class */ (function (_super) {
    tslib_1.__extends(Server, _super);
    function Server(config) {
        var _this = _super.call(this) || this;
        _this.defaultConfig = {
            port: 7000,
        };
        _this.config = Object.assign(_this.defaultConfig, config);
        return _this;
    }
    Server.prototype.start = function () {
        this.server = new WS.Server({
            port: this.config.port,
            perMessageDeflate: {
                // Other options settable:
                clientNoContextTakeover: true,
                serverNoContextTakeover: true,
                clientMaxWindowBits: 10,
                serverMaxWindowBits: 10,
                // Below options specified as default values.
                concurrencyLimit: 10,
                threshold: 1024,
            }
        });
        var self = this;
        this.server.on('connection', function (connection) {
            var _connection = new ClientConnection(connection);
            var TestRoot = {
                Projects: {
                    add: function () {
                        console.log("Projects:add", arguments);
                        return "added";
                    }
                }
            };
            _connection.setRoot(TestRoot);
            _connection.connectionReady();
            // _connection.call("Client", "hello", "man!").then((...args) => console.log(args))
        });
    };
    return Server;
}(BasicClass_1.BasicClass));
exports.Server = Server;
