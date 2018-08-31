export const ENV 		= process.env.NODE_ENV == 'production' 	? 'production' 	: 'development';
export const MODE 		= process.env.RUN_MODE == 'build' 		? 'build' 		: 'dev';

export const BUILD 		= MODE == 'build';
export const DEV 		= ENV == 'development';
export const PROD 		= ENV == 'production';

export const WATCH 		= MODE == 'dev';
export const SERVER 	= MODE == 'dev';
export const DEV_PORT 	= 50080;
export const DEV_URL	= `http://localhost:${ DEV_PORT }/`;

const _preprocessorOptions:any = {
	MODE,
	ENV,
	DEV,
	BUILD,
	PROD,
	WATCH,
	SERVER,
	DEV_PORT,
	DEV_URL,
}

export const preprocessorOptions =  Object.keys(_preprocessorOptions).reduce((result, key) => {
	result.push( key + "=" + _preprocessorOptions[key] );
	return result;
}, []).join('&');