const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config.base");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const webpackConfig = merge(webpackBaseConfig, {
  mode: "production",
  stats: { children: false, warnings: false },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
            ascii_only: false
          },
          mangle: true
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
});

module.exports = webpackConfig;
