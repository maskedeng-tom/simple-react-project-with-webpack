const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dist = path.resolve(__dirname, './dist');

module.exports = (env, { mode }) => {

  // build mode
  let buildMode = 'production';
  if (mode === 'development') {
    buildMode = 'development';
  }

  return {
    mode: buildMode,
    devtool: ((buildMode === 'development') ? 'inline-source-map' : 'source-map'),

    entry: {'index': './src/index.tsx'},
    output: {
      filename: '[name].js',
      path: dist,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
        chunks: ['index']
      }),
    ],

    devServer: {
      port: '3000',
      host: '0.0.0.0',
      open: true,
    },
  }
};
