const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    polyfill: '@babel/polyfill',
    vendor: ['react', 'react-dom', 'recharts'],
    moment: 'moment',
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.css',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
        },
      },
    },
  },
};