const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    historyApiFallback: {
      index: path.resolve(__dirname, "public/index.html"),
    },
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "public",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /(\.scss$)/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".ts", ".json", ".scss"],
  },
  target: "node",
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public/index.html"),
      inject: false,
    }),
  ],
};
