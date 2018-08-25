(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Layout_RouteContent"],{

/***/ "./client/scripts/components/Layout/RouteContent.tsx":
/*!***********************************************************!*\
  !*** ./client/scripts/components/Layout/RouteContent.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RouteContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Router_Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/Router/Route */ "./client/scripts/components/Router/Route.tsx");
/* harmony import */ var _components_ProjectSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/ProjectSettings */ "./client/scripts/components/ProjectSettings/index.tsx");



function RouteContent() {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Router_Route__WEBPACK_IMPORTED_MODULE_1__["default"], { url: "/projects/:projectKey/" }, function (matched) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_ProjectSettings__WEBPACK_IMPORTED_MODULE_2__["default"], { projectKey: matched.projectKey }); }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Router_Route__WEBPACK_IMPORTED_MODULE_1__["default"], { url: "/boilerplates/boilerplate-new/" }, function (matched) { return "New boilerplate"; })));
}
;


/***/ }),

/***/ "./client/scripts/components/ProjectSettings/index.tsx":
/*!*************************************************************!*\
  !*** ./client/scripts/components/ProjectSettings/index.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ProjectSettings = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ProjectSettings, _super);
    function ProjectSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectSettings.prototype.render = function () {
        return "ProjectSettings: " + this.props.projectKey;
    };
    return ProjectSettings;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ProjectSettings);


/***/ }),

/***/ "./client/scripts/components/Router/Route.tsx":
/*!****************************************************!*\
  !*** ./client/scripts/components/Router/Route.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url_pattern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url-pattern */ "../node_modules/url-pattern/lib/url-pattern.js");
/* harmony import */ var url_pattern__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url_pattern__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Location__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Location */ "./client/scripts/components/Router/Location.tsx");




var Route = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Route, _super);
    function Route() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pattern = new url_pattern__WEBPACK_IMPORTED_MODULE_2__(_this.props.url);
        return _this;
    }
    Route.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Location__WEBPACK_IMPORTED_MODULE_3__["default"], null, function (location) {
            var matched = _this.pattern.match(location.pathname);
            if (matched) {
                return _this.props.children(matched);
            }
            return '';
        }));
    };
    return Route;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Route);


/***/ })

}]);
//# sourceMappingURL=Layout_RouteContent.js.map