export default {
	// runtimeChunk: {
	// 	name: entrypoint => `runtime~${entrypoint.name}`
	// },
	runtimeChunk: 'single',
	// mergeDuplicateChunks: true,
	// removeEmptyChunks: false,
	// flagIncludedChunks: true,
	// occurrenceOrder: true,
	// concatenateModules: false,
	splitChunks: {
		minSize: 1,
		minChunks: 2,
		cacheGroups: {
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all'
			},
			components: {
				test: /[\\/]components[\\/]/,
				name: 'components',
				chunks: 'all'
			},
			utils: {
				test: /[\\/]utils[\\/]/,
				name: 'utils',
				chunks: 'all'
			},
			system: {
				test: /[\\/]system[\\/]/,
				name: 'system',
				chunks: 'all'
			},
			models: {
				test: /[\\/]models[\\/]/,
				name: 'models',
				chunks: 'all'
			},
			interfaces: {
				test: /[\\/]interfaces[\\/]/,
				name: 'interfaces',
				chunks: 'all'
			},
			scenes: {
				test: /[\\/]interfaces[\\/]/,
				name: 'scenes',
				chunks: 'all'
			},
		}
	}
}