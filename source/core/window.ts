let isDev = false;
/* #if DEV */
isDev = true;
/* #endif */

import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
/* #if DEV */
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
/* #endif */

import * as path from "path";

import Config from "../config";
const config = Config(app);

const _path = function(...args){ return path.normalize(path.join(...args)); }
// const fromRoot = function(...args){ return _path( __dirname, "..", ...args ); }
// const fromDist = function(...args){ return _path(__dirname, "..", ...args); }
// const fromClient = function(...args){ return fromDist("client", ...args); }

let mainWindow: BrowserWindow;

function createWindow() {
	let windowOptions: BrowserWindowConstructorOptions = {
		width	: config.get('window.size.width', 1024),
		height	: config.get('window.size.height', 768),
		frame	: false,
		show	: false,
	}
	if( config.get('window.position.x') != null && config.get('window.position.y') != null ){
		windowOptions = {
			...windowOptions,
			...{
				x: config.get('window.position.x'),
				y: config.get('window.position.y'),
			}
		}
	} else {
		windowOptions = {
			...windowOptions,
			...{
				center: true,
			}
		}
	}

	// Create the browser window.
	mainWindow = new BrowserWindow(windowOptions);

	if( config.get('window.maximize', false) ){
		mainWindow.maximize();
	}
	if( config.get('window.minimize', false) ){
		mainWindow.minimize();
	}

	// and load the index.html of the app.
	/* #if DEV */
		mainWindow.loadURL('http://localhost:8080/');
	/* #endif */

	/* #if !DEV */
		mainWindow.loadFile(_path(app.getAppPath(), 'dist', 'client', 'index.html'));
	/* #endif */

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	});

	let resizeTimeout;
	let moveTimeout;

	const resetMoveAndResize = function(){
		if(moveTimeout) clearTimeout(moveTimeout);
		if(resizeTimeout) clearTimeout(resizeTimeout);
	}

	mainWindow.on('maximize'	, function(){
		resetMoveAndResize();
		config.set('window.maximize', true);
	});
	mainWindow.on('unmaximize'	, function(){
		resetMoveAndResize();
		config.set('window.maximize', false);
	});
	mainWindow.on('minimize'	, function(){
		resetMoveAndResize();
		config.set('window.minimize', true);
	});
	mainWindow.on('restore'		, function(){
		resetMoveAndResize();
		config.set('window.minimize', false);
	});
	mainWindow.on('resize'		, function(){
		if(resizeTimeout) clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){
			resizeTimeout = undefined;
			const [width, height] = mainWindow.getSize();
			config.set('window.size', { width, height });
		}, 300);
	});
	mainWindow.on('move'		, function(){
		if(moveTimeout) clearTimeout(moveTimeout);
		moveTimeout = setTimeout(function(){
			moveTimeout = undefined;
			const [x, y] = mainWindow.getPosition();
			config.set('window.position', { x, y });
		}, 300);
	});

	mainWindow.setMenu(null);

	/* #if DEV */
		mainWindow.webContents.openDevTools();

		installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
			console.log(`Added Extension:  ${name}`);
		})
		.catch((err) => {
			console.log('An error occurred: ', err)
		});
	/* #endif */

	/* #if !DEV */
		// mainWindow.webContents.openDevTools();
	/* #endif */

	mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
});

app.on('web-contents-created', function(event, webContents){
	
	/* #if DEV */
	console.log(webContents.id, webContents.getURL());
	/* #endif */

	webContents.on('will-navigate', (event) => {
		// console.log('will-navigate');
		event.preventDefault();
	})
	webContents.on('did-navigate', (event) => {
		/* #if DEV */
		console.log(webContents.id, webContents.getURL());
		/* #endif */
	})
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.