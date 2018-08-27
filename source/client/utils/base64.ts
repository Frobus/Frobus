export default {
	encode(val){
		return Buffer.from(val).toString('base64')
	},
	decode(val){
		return Buffer.from(val, 'base64').toString('utf8');
	}
}