import {message} from 'antd';
import isApp from "@system/isApp";

export type messageTypes = ('success' | 'error' | 'info' | 'warning' | 'warn' | 'loading');

export type closeMethod = () => Promise<any>;

message.config({
	duration: 3,
	maxCount: 5,
	top: 24 + (isApp() ? 28 : 0),
});

export default function showMessage(type: messageTypes = 'info', text: string, autoclose = true): closeMethod {
	const close = message[type](text, (autoclose ? undefined : 0));
	return () => {
		return new Promise((resolve, reject) => {
			close.promise.then(resolve);
			close();
		});
	}
}