export const ENV 		= process.env.NODE_ENV == 'production' 	? 'production' 	: 'development';
export const MODE 		= process.env.RUN_MODE == 'build' 		? 'build' 		: 'dev';

export const BUILD 		= MODE == 'build';
export const DEV 		= ENV == 'development';
export const PROD 		= ENV == 'production';

export const WATCH 		= MODE == 'dev';
export const SERVER 	= MODE == 'dev';


const _preprocessorOptions:any = {
	MODE: MODE,
	ENV: ENV,
	DEV: DEV,
	BUILD: MODE == 'build',
	PROD: PROD,
	WATCH: WATCH,
	SERVER: SERVER,
}

export const preprocessorOptions =  Object.keys(_preprocessorOptions).reduce((result, key) => {
	result.push( key + "=" + _preprocessorOptions[key] );
	return result;
}, []).join('&');