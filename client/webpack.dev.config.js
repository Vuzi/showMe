var webpack = require('webpack')

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/../server/public/js'
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'GOOGLE_API_KEY': JSON.stringify('44077302857-hukep14pmirdvcth0utgetfpjmi8rjo7.apps.googleusercontent.com')
			}
		})
	]
}