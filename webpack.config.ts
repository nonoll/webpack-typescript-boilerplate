import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { CheckerPlugin } = require('awesome-typescript-loader');
const packageJSON = require('./package.json');

const config: webpack.ConfigurationFactory = (_, args) => {
  const { mode } = args;
  return {
    mode,
    entry: {
      bundle: './src/index.ts'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          happyPackMode: true
        }
      }]
    },
    plugins: [
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        title: packageJSON.name,
        template: path.resolve(__dirname, 'public/index.html'),
        favicon: path.resolve(__dirname, 'public/assets/images/favicon.ico'),
        css: [
          path.resolve(__dirname, 'public/assets/css/static.css')
        ],
        filename: 'index.html',
        chunks: ['bundle']
      })
    ]
  };
};

export default config;
