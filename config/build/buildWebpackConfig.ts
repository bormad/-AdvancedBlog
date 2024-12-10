import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(
	options: BuildOptions
): webpack.Configuration {
	const { paths, mode, isDev } = options;
	return {
		mode: mode,
		entry: paths.entry,
		module: {
			rules: buildLoaders()
		},
		resolve: buildResolvers(),
		output: {
			filename: '[name].[contenthash].js',
			path: paths.build,
			clean: true
		},
		devtool: isDev ? 'inline-source-map' : undefined,
		plugins: buildPlugins(options),
		devServer: isDev ? buildDevServer(options) : undefined
	};
}
