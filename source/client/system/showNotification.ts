import { notification } from 'antd';
import uniqId from "@utils/uniqId";
import isApp from "@system/isApp";

export type messageTypes = ('success' | 'error' | 'info' | 'warning' | 'warn' | 'loading');

export type closeMethod = () => Promise<any>;

notification.config({
	placement: 'topRight',
	duration: 10,
	top: 24 + (isApp() ? 28 : 0),
});

export default function showNotification(type: messageTypes = 'info', message: string, description?: string, autoclose = true): closeMethod {
	const key = uniqId();
	let promiseResolve = () => {};
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
	});
	notification[type]({
		key,
		message,
		description,
		duration: (autoclose ? undefined : 0),
		onClose: () => {
			promiseResolve();
		}
	});
	return () => {
		notification.close(key);
		return promise;
	}
}