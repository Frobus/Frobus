(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["browser"],{

/***/ "../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js??ref--5-2!./client/scripts/components/Browser/styles.styl":
/*!**************************************************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/stylus-loader??ref--5-2!./client/scripts/components/Browser/styles.styl ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n#root {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\nwebview {\n  flex-grow: 9;\n}\nwebview#browser-devtools {\n  flex-grow: 3;\n}\n", ""]);

// exports


/***/ }),

/***/ "./client/scripts/browser.tsx":
/*!************************************!*\
  !*** ./client/scripts/browser.tsx ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/Browser */ "./client/scripts/components/Browser/index.tsx");



react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Browser__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.querySelector('#root'));


/***/ }),

/***/ "./client/scripts/components/Browser/index.tsx":
/*!*****************************************************!*\
  !*** ./client/scripts/components/Browser/index.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_BrowserLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/BrowserLayout */ "./client/scripts/components/BrowserLayout/index.tsx");
/* harmony import */ var _styles_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.styl */ "./client/scripts/components/Browser/styles.styl");
/* harmony import */ var _styles_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_styl__WEBPACK_IMPORTED_MODULE_3__);




var Browser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Browser, _super);
    function Browser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.webviewRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this.webviewDevtoolsRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        return _this;
    }
    Browser.prototype.render = function () {
        var webviewAttrs = {
            id: "browser-view",
            ref: this.webviewRef,
            src: "/content.html",
        };
        webviewAttrs['nodeintegration'] = "";
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_components_BrowserLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("webview", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, webviewAttrs)),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("webview", { id: "browser-devtools", ref: this.webviewDevtoolsRef })));
    };
    Browser.prototype.componentDidMount = function () {
        var browserView = this.webviewRef.current;
        var devtoolsView = this.webviewDevtoolsRef.current;
        browserView.addEventListener('dom-ready', function () {
            var browser = browserView.getWebContents();
            browser.setDevToolsWebContents(devtoolsView.getWebContents());
            browser.openDevTools();
        });
    };
    return Browser;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Browser);


/***/ }),

/***/ "./client/scripts/components/Browser/styles.styl":
/*!*******************************************************!*\
  !*** ./client/scripts/components/Browser/styles.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/stylus-loader??ref--5-2!./styles.styl */ "../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js??ref--5-2!./client/scripts/components/Browser/styles.styl");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/stylus-loader??ref--5-2!./styles.styl */ "../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js??ref--5-2!./client/scripts/components/Browser/styles.styl", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/stylus-loader??ref--5-2!./styles.styl */ "../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js??ref--5-2!./client/scripts/components/Browser/styles.styl");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./client/scripts/components/BrowserLayout/index.tsx":
/*!***********************************************************!*\
  !*** ./client/scripts/components/BrowserLayout/index.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron_react_titlebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron-react-titlebar */ "../node_modules/electron-react-titlebar/index.js");
/* harmony import */ var electron_react_titlebar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron_react_titlebar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var electron_react_titlebar_assets_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron-react-titlebar/assets/style.css */ "../node_modules/electron-react-titlebar/assets/style.css");
/* harmony import */ var electron_react_titlebar_assets_style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron_react_titlebar_assets_style_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "../node_modules/styled-components/dist/styled-components.es.js");





function Browser(props) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: "browser", className: props.className }, props.children);
}
function Titlebar(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: "browser__titlebar", className: props.className },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](electron_react_titlebar__WEBPACK_IMPORTED_MODULE_2__["TitleBar"], { menu: [], icon: '' })));
}
function BrowserView(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { id: "browser__view", className: props.className }, props.children));
}
var BrowserLayout = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BrowserLayout, _super);
    function BrowserLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserLayout.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](BrowserStyled, { className: this.props.className },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](TitlebarStyled, null),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](BrowserViewStyled, { children: this.props.children })));
    };
    return BrowserLayout;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (BrowserLayout);
var BrowserStyled = Object(styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(Browser)(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n\tdisplay: flex;\n\tflex-direction: column;\n\twidth: 100%;\n\theight: 100%;\n\t> * {\n\t\twidth: 100%;\n\t\tflex-grow: 0;\n\t\tflex-shrink: 0;\n\t}\n"], ["\n\tdisplay: flex;\n\tflex-direction: column;\n\twidth: 100%;\n\theight: 100%;\n\t> * {\n\t\twidth: 100%;\n\t\tflex-grow: 0;\n\t\tflex-shrink: 0;\n\t}\n"])));
var BrowserViewStyled = Object(styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(BrowserView)(templateObject_2 || (templateObject_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n\tflex-grow: 1;\n\toverflow: auto;\n\ttransform: translate3d(0, 0, 0);\n\tdisplay: flex;\n\tflex-direction: column;\n"], ["\n\tflex-grow: 1;\n\toverflow: auto;\n\ttransform: translate3d(0, 0, 0);\n\tdisplay: flex;\n\tflex-direction: column;\n"])));
var TitlebarStyled = Object(styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(Titlebar)(templateObject_3 || (templateObject_3 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n\t#electron-app-title-bar .window-controls button {\n\t\ttransition-property: color, background;\n\t}\n"], ["\n\t#electron-app-title-bar .window-controls button {\n\t\ttransition-property: color, background;\n\t}\n"])));
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ })

},[["./client/scripts/browser.tsx","runtime","vendors"]]]);
//# sourceMappingURL=browser.js.map