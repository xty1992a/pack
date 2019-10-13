const VueLoaderPlugin = require("vue-loader/lib/plugin");
const PRODUCTION = process.env.NODE_ENV === "production";
const path = require("path");

const baseConfig = ({root, workspace}) => {
  return {
    entry: {},
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(workspace, "src"),
      },
    },
    output: {
      path: root("dist"),
      filename: PRODUCTION ? "[name]_[chunkhash:8].js" : "[name].js",
      chunkFilename: PRODUCTION ? "[name]_[chunkhash:8].js" : "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.css$/,
          use: [
            "vue-style-loader",
            "css-loader",
            "postcss-loader",
          ]
        },
        {
          test: /\.less$/,
          use: [
            "vue-style-loader",
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
};

module.exports = baseConfig;
