const path = require("path");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.config.js");

module.exports = merge(base, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    client: {
      logging: 'info',
    },
    static : './dist',
    proxy: {
        '/api': 'http://localhost:9000',
    }
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});