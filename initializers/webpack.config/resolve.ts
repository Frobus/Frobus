import {source, dist, client, root} from "./_utils";

export default {
	extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".png", ".jpg", ".gif", ".svg"],
	alias: {
		'@root'			: root(),
		'@source'		: source(),
		'@client'		: client(),
		'@components'	: client('components'),
		'@models'		: client('models'),
		'@scenes'		: client('scenes'),
		'@styles'		: client('styles'),
		'@system'		: client('system'),
		'@utils'		: client('utils'),
		'@views'		: client('views'),
	}
}