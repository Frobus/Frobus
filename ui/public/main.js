(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./core/bin/BasicClass.ts":
/*!********************************!*\
  !*** ./core/bin/BasicClass.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
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


/***/ }),

/***/ "./core/bin/CreateConntection.ts":
/*!***************************************!*\
  !*** ./core/bin/CreateConntection.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
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


/***/ }),

/***/ "./core/bin/WSBasicClass.ts":
/*!**********************************!*\
  !*** ./core/bin/WSBasicClass.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var BasicClass_1 = __webpack_require__(/*! ./BasicClass */ "./core/bin/BasicClass.ts");
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


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./ui/bin/components/Layout/index.styl":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./ui/bin/components/Layout/index.styl ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Exo+2:100,200,300,400,500);", ""]);

// module
exports.push([module.i, ".app {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  color: #eee;\n  background: #2f3b4c;\n  font-family: 'Exo 2', sans-serif;\n  font-size: 16px;\n  line-height: 1.2;\n  font-weight: 300;\n  cursor: default;\n}\n.app__columns {\n  display: flex;\n  width: 100%;\n}\n.app__column {\n  display: flex;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./ui/bin/components/Navigation/index.styl":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./ui/bin/components/Navigation/index.styl ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navigation {\n  background: rgba(0,0,0,0.3);\n}\n.navigation__item {\n  display: block;\n  font-size: 16px;\n  line-height: 1;\n  padding: 1em;\n  cursor: default;\n  text-decoration: none;\n  color: #aaa;\n}\na.navigation__item {\n  color: #fff;\n  cursor: pointer;\n}\n.navigation__item_current {\n  color: #aaa;\n  background: rgba(0,0,0,0.2);\n}\na.navigation__item:hover {\n  color: #fff;\n  background: rgba(0,0,0,0.4);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./ui/bin/index.styl":
/*!**********************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./ui/bin/index.styl ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n#root {\n  padding: 0;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),

/***/ "./ui/bin/components/Layout/index.styl":
/*!*********************************************!*\
  !*** ./ui/bin/components/Layout/index.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./index.styl */ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./ui/bin/components/Layout/index.styl");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ui/bin/components/Layout/index.tsx":
/*!********************************************!*\
  !*** ./ui/bin/components/Layout/index.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Navigation_1 = __webpack_require__(/*! ../Navigation/ */ "./ui/bin/components/Navigation/index.tsx");
var reducer_1 = __webpack_require__(/*! ./reducer */ "./ui/bin/components/Layout/reducer.ts");
__webpack_require__(/*! ./index.styl */ "./ui/bin/components/Layout/index.styl");
var Layout = /** @class */ (function (_super) {
    tslib_1.__extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        return _this;
    }
    Layout.prototype.render = function () {
        var list = [
            {
                id: '1',
                icon: '@ti-wand',
                caption: 'Проекты',
                url: '/projects/123',
            },
            {
                id: '2',
                icon: '@ti-user',
                caption: 'Настройки',
                url: '/settings/321',
            }
        ];
        return (React.createElement("div", { className: "app" },
            React.createElement("div", { className: "app__columns" },
                React.createElement("div", { className: "app__column app__navigation" },
                    React.createElement(Navigation_1.Navigation, null)),
                React.createElement("div", { className: "app__column app__navigation" },
                    React.createElement(Navigation_1.Navigation, { list: list })),
                React.createElement("div", { className: "app__column app__content" }))));
    };
    return Layout;
}(React.Component));
exports.default = Layout;
var reducers = [];
exports.reducers = reducers;
reducers.push(function (state, action) {
    return tslib_1.__assign({}, state, reducer_1.reducer(state, action));
});


/***/ }),

/***/ "./ui/bin/components/Layout/reducer.ts":
/*!*********************************************!*\
  !*** ./ui/bin/components/Layout/reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = function (state, action) {
    return state;
};


/***/ }),

/***/ "./ui/bin/components/Navigation/index.styl":
/*!*************************************************!*\
  !*** ./ui/bin/components/Navigation/index.styl ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./index.styl */ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./ui/bin/components/Navigation/index.styl");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ui/bin/components/Navigation/index.tsx":
/*!************************************************!*\
  !*** ./ui/bin/components/Navigation/index.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var Router_1 = __webpack_require__(/*! ../Router */ "./ui/bin/components/Router/index.tsx");
__webpack_require__(/*! ./index.styl */ "./ui/bin/components/Navigation/index.styl");
var Navigation = /** @class */ (function (_super) {
    tslib_1.__extends(Navigation, _super);
    function Navigation(props) {
        return _super.call(this, props) || this;
    }
    Navigation.prototype.render = function () {
        var _this = this;
        var list = this.props.navigation;
        return (React.createElement("div", { className: "navigation" },
            React.createElement("div", { className: "navigation__list" }, list.map(function (item) { return _this.renderItem(item); }))));
    };
    Navigation.prototype.renderItem = function (item) {
        var isCurrentPage = Router_1.isMatch(this.props.location, item.url);
        return (React.createElement(this.ItemElement, { item: item, gotoUrl: this.props.gotoUrl.bind(this), key: item.id, isCurrentPage: isCurrentPage },
            React.createElement("div", { className: "navigation__item-icon" }, (item.icon.indexOf('@') == 0)
                ?
                    React.createElement("span", { className: item.icon.replace('@', '') })
                :
                    React.createElement("img", { src: item.icon, alt: item.caption }))));
    };
    Navigation.prototype.ItemElement = function (props) {
        var item = props.item;
        var isCurrentPage = props.isCurrentPage;
        var isLink = !!(!isCurrentPage || isCurrentPage._);
        var className = "navigation__item";
        if (isCurrentPage) {
            className += " navigation__item_current";
        }
        if (isLink) {
            return (React.createElement("a", { href: item.url, onClick: function (e) { e.preventDefault(); props.gotoUrl(item.url); }, className: className, "data-caption": item.caption }, props.children));
        }
        return (React.createElement("span", { className: className, "data-caption": item.caption }, props.children));
    };
    return Navigation;
}(React.Component));
var ConnectedNavigation = react_redux_1.connect(function mapStateToProps(state, ownProps) {
    console.log('arguments', arguments);
    return {
        navigation: ownProps.list ? ownProps.list : state.mainNavigation,
        location: state.location.string
    };
}, function mapDispatchToProps(dispatch) {
    var navigation = Router_1.CreateNavigation(dispatch);
    return {
        gotoUrl: function (url) {
            console.log('url', url);
            navigation.next(url);
        }
    };
})(Navigation);
exports.Navigation = ConnectedNavigation;


/***/ }),

/***/ "./ui/bin/components/Router/Location.ts":
/*!**********************************************!*\
  !*** ./ui/bin/components/Router/Location.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
var UrlPattern = __webpack_require__(/*! url-pattern */ "./node_modules/url-pattern/lib/url-pattern.js");
exports.isMatch = function (path, url) {
    return (new UrlPattern(url + "(/)(*)")).match(path);
};
var Location = /** @class */ (function () {
    function Location(url) {
        this.url = url;
        this.location = this.parseUrl(url);
    }
    Location.prototype.parseUrl = function (url) {
        var urlSplited = url.split("?");
        var path = urlSplited[0];
        var query = urlSplited[1];
        var hash = "";
        var result = {
            path: "",
            query: {},
            hashQuery: {},
            string: "",
        };
        if (query) {
            var querySplited = query.split("#");
            result.query = queryString.parse(querySplited.shift());
            hash = querySplited.join("#");
        }
        else {
            var pathSplited = path.split("#");
            path = pathSplited.shift();
            hash = pathSplited.join("#");
        }
        result.path = path;
        if (hash) {
            result.hashQuery = queryString.parse(hash);
        }
        result.string = this.toString(result);
        return result;
    };
    Location.prototype.toString = function (location) {
        if (location === void 0) { location = this.location; }
        var string = location.path;
        if (queryString.stringify(location.query)) {
            string += "?" + queryString.stringify(location.query);
        }
        if (queryString.stringify(location.hashQuery)) {
            string += "#" + queryString.stringify(location.hashQuery);
        }
        return string;
    };
    Location.prototype.getLocation = function () {
        return this.location;
    };
    Location.prototype.isMatch = function (url) {
        return exports.isMatch(this.location, url);
    };
    return Location;
}());
exports.Location = Location;


/***/ }),

/***/ "./ui/bin/components/Router/index.tsx":
/*!********************************************!*\
  !*** ./ui/bin/components/Router/index.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Location_1 = __webpack_require__(/*! ./Location */ "./ui/bin/components/Router/Location.ts");
exports.Location = Location_1.Location;
exports.isMatch = Location_1.isMatch;
exports.navigation = {
    back: function () { return window.history.back(); },
    forward: function () { return window.history.forward(); },
    go: function (position) { return window.history.go(position); },
    next: function (url) { return window.history.pushState({}, url, url); },
    change: function (url) { return window.history.replaceState({}, url, url); },
};
var RouteComponent = function () { return function (Component) {
    return function (props) {
    };
}; };
var reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    if (state.currentPage == null) {
        var location = new Location_1.Location(window.location.href.replace(window.location.origin, ""));
        state = tslib_1.__assign({}, state, { location: location.getLocation(), locationString: location.toString() });
    }
    if (action.type != "ROUTER")
        return state;
    var changed = false;
    switch (action.method) {
        case "back":
            exports.navigation.back();
            changed = true;
            break;
        case "forward":
            exports.navigation.forward();
            changed = true;
            break;
        case "go":
            exports.navigation.go(action.argument);
            changed = true;
            break;
        case "next":
            exports.navigation.next(action.argument);
            changed = true;
            break;
        case "change":
            exports.navigation.change(action.argument);
            changed = true;
            break;
    }
    if (changed) {
        var location = new Location_1.Location(window.location.href.replace(window.location.origin, ""));
        state.location = location.getLocation();
        state.locationString = location.toString();
    }
    console.log('changed state', state);
    return state;
};
exports.reducer = reducer;
exports.CreateNavigation = function (dispatch) {
    var fabric = function (action, arg) {
        return {
            type: "ROUTER",
            method: action,
            argument: arg
        };
    };
    return {
        back: function () {
            return dispatch(fabric("back"));
        },
        forward: function () {
            return dispatch(fabric("forward"));
        },
        go: function (position) {
            return dispatch(fabric("go", position));
        },
        next: function (url) {
            return dispatch(fabric("next", url));
        },
        change: function (url) {
            return dispatch(fabric("change", url));
        },
    };
};


/***/ }),

/***/ "./ui/bin/configs/mainNavigation.ts":
/*!******************************************!*\
  !*** ./ui/bin/configs/mainNavigation.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        id: '1',
        icon: '@ti-folder',
        caption: 'Проекты',
        url: '/projects/',
    },
    {
        id: '2',
        icon: '@ti-settings',
        caption: 'Настройки',
        url: '/settings/',
    }
];


/***/ }),

/***/ "./ui/bin/index.styl":
/*!***************************!*\
  !*** ./ui/bin/index.styl ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./index.styl */ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./ui/bin/index.styl");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ui/bin/index.tsx":
/*!**************************!*\
  !*** ./ui/bin/index.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var Router = __webpack_require__(/*! ./components/Router */ "./ui/bin/components/Router/index.tsx");
__webpack_require__(/*! ./index.styl */ "./ui/bin/index.styl");
var index_1 = __webpack_require__(/*! ./components/Layout/index */ "./ui/bin/components/Layout/index.tsx");
var App_1 = __webpack_require__(/*! ./logic/App */ "./ui/bin/logic/App.ts");
var mainNavigation_1 = __webpack_require__(/*! ./configs/mainNavigation */ "./ui/bin/configs/mainNavigation.ts");
var app = new App_1.default();
app.addReducers(Router.reducer);
app.addReducers(index_1.reducers);
app.addReducers(function (state, action) {
    if (state === void 0) { state = {}; }
    if (state.mainNavigation == null) {
        state = tslib_1.__assign({}, state);
        state.mainNavigation = mainNavigation_1.default;
    }
    return state;
});
var store = redux_1.createStore(app.getReducers());
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(index_1.default, null)), document.getElementById("root"));


/***/ }),

/***/ "./ui/bin/logic/App.ts":
/*!*****************************!*\
  !*** ./ui/bin/logic/App.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var ServerConnection_1 = __webpack_require__(/*! ./ServerConnection */ "./ui/bin/logic/ServerConnection.ts");
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.reducers = [];
        _this.server = new ServerConnection_1.default();
        _this.server.setActions({
            Client: {
                hello: function () {
                    console.log("Client:hello", arguments);
                    return "welcome";
                }
            }
        });
        return _this;
    }
    App.prototype.startServer = function () {
        this.server.start();
    };
    App.prototype.addReducers = function (reducers) {
        var _this = this;
        if (!Array.isArray(reducers))
            reducers = [reducers];
        reducers.forEach(function (reducer) { return _this.reducers.push(reducer); });
    };
    App.prototype.getReducers = function () {
        var _this = this;
        return function (state, action) {
            var results = [];
            var resultState = state ? tslib_1.__assign({}, state) : {};
            if (state == undefined) {
                _this.emit('actions:init', resultState, action, function (_resultState) {
                    resultState = tslib_1.__assign({}, resultState, _resultState);
                });
            }
            _this.emit('actions:begin', resultState, action, function (_resultState) {
                resultState = tslib_1.__assign({}, resultState, _resultState);
            });
            _this.reducers.forEach(function (reducer) {
                resultState = tslib_1.__assign({}, resultState, reducer(resultState, action));
            });
            _this.emit('actions:end', resultState, action, function (_resultState) {
                resultState = tslib_1.__assign({}, resultState, _resultState);
            });
            console.log('resultState', resultState);
            return resultState;
        };
    };
    return App;
}(events_1.EventEmitter));
exports.default = App;


/***/ }),

/***/ "./ui/bin/logic/ServerConnection.ts":
/*!******************************************!*\
  !*** ./ui/bin/logic/ServerConnection.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var WSBasicClass_1 = __webpack_require__(/*! ../../../core/bin/WSBasicClass */ "./core/bin/WSBasicClass.ts");
var CreateConntection_1 = __webpack_require__(/*! ../../../core/bin/CreateConntection */ "./core/bin/CreateConntection.ts");
var ServerConnection = /** @class */ (function (_super) {
    tslib_1.__extends(ServerConnection, _super);
    function ServerConnection() {
        var _this = _super.call(this) || this;
        _this.address = 'ws://' + window.document.location.host.replace(/:.*/, '');
        _this.port = 7000;
        var self = _this;
        console.log(self);
        return _this;
    }
    ServerConnection.prototype.start = function () {
        var host = window.document.location.host.replace(/:.*/, '');
        this.connection = new CreateConntection_1.CreateConntection(new WebSocket(this.address + ':' + this.port));
        this.connectionReady();
    };
    return ServerConnection;
}(WSBasicClass_1.WSBasicClass));
exports.default = ServerConnection;


/***/ })

},[["./ui/bin/index.tsx","runtime","vendors"]]]);
//# sourceMappingURL=main.js.map