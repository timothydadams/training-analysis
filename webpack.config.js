const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  let config = {};

  config.entry = path.resolve(__dirname, 'src', 'index.js');
  config.devtool = argv.mode === 'production' ? false : "inline-source-map",
  config.watch = argv.mode === 'development' ? true : false,
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
  };

  config.plugins = [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new CleanWebpackPlugin(),
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
    new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
        chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      fileName: 'index.html',
      template: path.resolve(__dirname, 'templates', 'index.html'),
      scriptLoading: 'blocking',
    })
  ];

  // Determine how modules within the project are treated
  config.module = {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js|jsx)$/i,
        exclude: /node_modules/, 
        use: ["babel-loader"]
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.css$/,
        exclude:/node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },

      { test: /\.(woff(2)?|eot|ttf|otf|svg|gif|png|jpg|jpeg)$/, 
        type: "asset"
      },
    ],
  };

  config.resolve = {
    extensions: [ '.ts', '.js' ],
    fallback: {
        "buffer": require.resolve("buffer")
    }
  };

  if (argv.mode === 'production') {

    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin()
      ],
      runtimeChunk: {
        name: "runtime",
      },
    };

    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
    
  }

  return config;

};

/*

  devServer: {
    //historyApiFallback: true,
    open: true,
    //compress: true,
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


*/