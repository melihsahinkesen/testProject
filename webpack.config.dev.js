const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => {
  const env = dotenv.config({ path: "./.env.dev" }).parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: "development",
    devtool: "source-map",
    entry: {
      vendor: {
        import: path.resolve(__dirname, "./src/vendor.js"),
      },
      index: {
        dependOn: "vendor",
        import: path.resolve(__dirname, "./src/index.js"),
      },
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, "src")],
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets/img", to: "assets/img" },
        ],
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
      historyApiFallback: true,
    },
  };
};
