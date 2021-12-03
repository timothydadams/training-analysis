const path = require("path");
const webpack = require('webpack');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath:'/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets'),
          noErrorOnMissing:true,
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      fileName: 'index.html',
      template: path.resolve(__dirname, 'templates', 'index.html'),
      inject: 'body',
      publicPath: '/',
      scriptLoading: 'blocking',
      hash: true,
      cache: true,
      showErrors: true
  })
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js|jsx)$/i,
        exclude: /[\\/]node_modules[\\/]/, 
        use: ["babel-loader"]
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: ["style-loader","css-loader","sass-loader", "postcss-loader"]
      },

      { test: /\.(woff(2)?|eot|ttf|otf|svg|gif|png|jpg|jpeg)$/, 
        type: "asset"
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
    fallback: {
        "buffer": require.resolve("buffer")
    }
  },
};