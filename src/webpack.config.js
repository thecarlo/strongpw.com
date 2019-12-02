const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  cache: false,
  entry: {
    main: './index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].bundle.css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.bundle\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    publicPath:
      'http://localhost:4000/build/' /*bundled files will be available in the browser under this path */,
    contentBase: [path.join(__dirname)] /*where to serve content from*/,
    port: 4000,
    compress: true /*enable gzip compression*/
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};