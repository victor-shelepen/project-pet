const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./pug/index.pug"),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: { '^/api': '' },
      },
    },
    compress: false,
    port: 9000,
  },
};