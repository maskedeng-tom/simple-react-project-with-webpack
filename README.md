# Simple React project with webpack

シンプルなwebpackを利用したReactプロジェクトのサンプルです。
This is a sample of a simple React project using webpack.

## Construction Procedure (構築手順)

### Create project folder (プロジェクトフォルダの作成)

```sh
mkdir test-app
cd test-app
```

### Initializing package (パッケージの初期化)

```sh
npm -y init
```

### Package Installation (パッケージのインストール)

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save-dev typescript ts-loader
npm install --save-dev react react-dom @types/react @types/react-dom
```

### Changes to `package.json` (`package.json`の変更)

```json
// package.json
  "scripts": {
+    "start": "webpack-cli serve --mode development",
+    "build": "webpack-cli --node-env=production --mode production",
  }
```

### Adding `webpack.config.js` (`webpack.config.js`の追加)

```js
// webpack.config.js
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
```

### Initializing TypeScript (Typescriptの初期化)

```sh
npx tsc --init
```

### Changes to `tsconfig.json` (`tsconfig.json`の変更)

```json
// tsconfig.json
{
  "compilerOptions": {
-    // "jsx": "",
+    "jsx": "react-jsx",
-    // "outDir": "./",
+    "outDir": "./dist",
-  }
+  },
+  "files": [
+    "src/index.tsx",
+  ],
+  "include": [
+    "src/**/*",
+  ],
+  "exclude": [
+    "./node_modules",
+    "./dist"
+  ]
}
```

### Adding `src/index.html` (`src/index.html`の追加)

```sh
mkdir src
```

```html
<!-- src/index.html -->
<html lang='ja'>
  <head>
    <meta charset='UTF-8'>
    <title>Simple React app with webpack</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
```

### Adding `src/index.tsx` (`src/index.tsx`の追加)

```tsx
// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Simple React App with webpack!</h1>;
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
```

### Run (実行)

```sh
npm start
```

### Build (ビルド)

```sh
npm run build
```
