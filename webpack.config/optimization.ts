export default {
	runtimeChunk: 'single',
	// mergeDuplicateChunks: true,
	// removeEmptyChunks: false,
	// flagIncludedChunks: true,
	// occurrenceOrder: true,
	// concatenateModules: false,
	splitChunks: {
		minSize: 1,
		minChunks: 1,
		cacheGroups: {
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all'
			},
			components: {
				test: /[\\/]source[\\/]components[\\/]/,
				name: 'components',
				chunks: 'all'
			},
			utils: {
				test: /[\\/]source[\\/]utils[\\/]/,
				name: 'utils',
				chunks: 'all'
			},
			system: {
				test: /[\\/]source[\\/]system[\\/]/,
				name: 'system',
				chunks: 'all'
			},
			mixins: {
				test: /[\\/]source[\\/]mixins[\\/]/,
				name: 'models',
				chunks: 'all'
			},
			interfaces: {
				test: /[\\/]source[\\/]interfaces[\\/]/,
				name: 'interfaces',
				chunks: 'all'
			},
		}
	}
}