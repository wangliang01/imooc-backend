const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const webpackconfig = {
  entry: {
    server: path.join(__dirname, "../src/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: [path.join(__dirname, "node_modules")],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV":
        process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
          ? JSON.stringify("production")
          : JSON.stringify("development"),
    }),
  ],
  externals: [nodeExternals()],
  target: "node",
};

module.exports = webpackconfig;
