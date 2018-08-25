"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var isDev = true;
var electron_1 = require("electron");
var electron_devtools_installer_1 = require("electron-devtools-installer");
var path = require("path");
var config_1 = require("../config");
var config = config_1.default(electron_1.app);
var _path = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return path.normalize(path.join.apply(path, args));
};
var fromRoot = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return _path.apply(void 0, [__dirname, ".."].concat(args));
};
var fromDist = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return _path.apply(void 0, [__dirname, ".."].concat(args));
};
var fromClient = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return fromDist.apply(void 0, ["client"].concat(args));
};
var mainWindow;
function createWindow() {
    var windowOptions = {
        width: config.get('window.size.width', 1024),
        height: config.get('window.size.height', 768),
        frame: false,
        show: false,
    };
    if (config.get('window.position.x') != null && config.get('window.position.y') != null) {
        windowOptions = tslib_1.__assign({}, windowOptions, {
            x: config.get('window.position.x'),
            y: config.get('window.position.y'),
        });
    }
    else {
        windowOptions = tslib_1.__assign({}, windowOptions, {
            center: true,
        });
    }
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow(windowOptions);
    if (config.get('window.maximize', false)) {
        mainWindow.maximize();
    }
    if (config.get('window.minimize', false)) {
        mainWindow.minimize();
    }
    // and load the index.html of the app.
    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/');
    }
    else {
        mainWindow.loadFile(fromClient('index.html'));
    }
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    var resizeTimeout;
    var moveTimeout;
    var resetMoveAndResize = function () {
        if (moveTimeout)
            clearTimeout(moveTimeout);
        if (resizeTimeout)
            clearTimeout(resizeTimeout);
    };
    mainWindow.on('maximize', function () {
        resetMoveAndResize();
        config.set('window.maximize', true);
    });
    mainWindow.on('unmaximize', function () {
        resetMoveAndResize();
        config.set('window.maximize', false);
    });
    mainWindow.on('minimize', function () {
        resetMoveAndResize();
        config.set('window.minimize', true);
    });
    mainWindow.on('restore', function () {
        resetMoveAndResize();
        config.set('window.minimize', false);
    });
    mainWindow.on('resize', function () {
        if (resizeTimeout)
            clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            resizeTimeout = undefined;
            var _a = mainWindow.getSize(), width = _a[0], height = _a[1];
            config.set('window.size', { width: width, height: height });
        }, 300);
    });
    mainWindow.on('move', function () {
        if (moveTimeout)
            clearTimeout(moveTimeout);
        moveTimeout = setTimeout(function () {
            moveTimeout = undefined;
            var _a = mainWindow.getPosition(), x = _a[0], y = _a[1];
            config.set('window.position', { x: x, y: y });
        }, 300);
    });
    mainWindow.setMenu(null);
    if (isDev) {
        // mainWindow.webContents.openDevTools();
        electron_devtools_installer_1.default(electron_devtools_installer_1.REACT_DEVELOPER_TOOLS).then(function (name) {
            console.log("Added Extension:  " + name);
        })
            .catch(function (err) {
            console.log('An error occurred: ', err);
        });
    }
    mainWindow.show();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.app.on('web-contents-created', function (event, webContents) {
    // console.log('web-contents-created')
    // webContents.hostWebContents
    console.log(webContents.id, webContents.getURL());
    webContents.on('will-navigate', function (event) {
        // console.log('will-navigate');
        event.preventDefault();
    });
    webContents.on('did-navigate', function (event) {
        // console.log('will-navigate');
        console.log(webContents.id, webContents.getURL());
    });
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=window.js.map