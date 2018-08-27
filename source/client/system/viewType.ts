export default function viewType(): ('app' | 'content') {
	return window['__viewType'];
};