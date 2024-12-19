import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default ({ config }: { config: Configuration }) => {
	const isDev = true;
	config.module.rules.push({
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						namedExport: false,
						auto: (resPath: string) => Boolean(resPath.includes('.module.')),
						localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
					}
				}
			},
			{
				loader: 'sass-loader',
				options: { implementation: require.resolve('sass') }
			}
		]
	});
	return config;
};
