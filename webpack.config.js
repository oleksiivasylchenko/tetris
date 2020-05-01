module.exports = (env) => ({
  entry: {
    tetris: ['babel-polyfill', 'whatwg-fetch', __dirname + '/src/index.ts'],
  },
  output: {
    path: __dirname + '/build/',
    publicPath: '/',
    filename: 'assets/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: env ? __dirname + "/build/" : null,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8181/",
    }
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      libs: __dirname + '/src/libs',
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        include: [
          /node_modules/,
          /widgets\/button\/style.css/
        ],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /widgets\/button\/style.css/
        ],
        use: [
          { loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: "dashes",
              // importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require('postcss-import')(),
                require('postcss-css-variables')(),
                require('autoprefixer')({
                  browsers: "last 2 versions, Firefox ESR"
                }),
              ]
            },
          },
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 800000, // Convert images < 8kb to base64 strings
            name:  __dirname + '/public/images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 65000,
          name: 'fonts/[name].[ext]',
        },
      }
    ],
  },
});
