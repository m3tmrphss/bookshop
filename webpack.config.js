const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); 

module.exports = { 
    entry: './src/js/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        open: true, 
        hot: true,
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                /*options: {
                  url: false,
                }*/
              },
              "sass-loader"
            ],
          }, 
        ],
    },
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin(), 
        ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, 'dist/assets') }, 
        ],
      }),
    ], 
}
