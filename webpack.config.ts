import * as path from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';

const PACKAGE_JSON = require('./package.json');

const config: webpack.ConfigurationFactory = (_, args) => {
  const { mode } = args;
  const IS_DEV_MODE = mode === 'development';

  return {
    mode,
    entry: {
      vendor: './src/vendor.ts',
      polyfills: './src/polyfills.ts',
      bundle: './src/index.ts'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'src/assets')
      }
    },
    output: {
      filename: IS_DEV_MODE ? 'js/[name].js' : 'js/[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
            happyPackMode: true
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            IS_DEV_MODE
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.relative(__dirname, '..'),
                hmr: IS_DEV_MODE,
              },
            },
            'css-loader',
            'sass-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                outputPath: 'images/',
                name: IS_DEV_MODE ? '[name].[ext]' : '[name].[hash].[ext]',
                limit: 1000 * 10 // 10KB
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/',
                name: IS_DEV_MODE ? '[name].[ext]' : '[name].[hash].[ext]',
              }
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: [
        path.join(__dirname, 'public')
      ],
      quiet: true,
      clientLogLevel: 'silent',
      host: 'localhost',
      overlay: true,
      compress: true,
      watchContentBase: true,
      https: false,
      port: 8080
    },
    plugins: [
      new CheckerPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/static'),
            to: path.resolve(__dirname, 'dist/static')
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: IS_DEV_MODE ? 'css/[name].css' : 'css/[name].[hash].css'
      }),
      new HtmlWebpackPlugin({
        title: PACKAGE_JSON.name,
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
        chunks: [
          'vendor',
          'polyfills',
          'bundle'
        ]
      })
    ],
    optimization: {
      minimize: !IS_DEV_MODE,
      splitChunks: {},
      concatenateModules: true
    }
  };
};

export default config;
