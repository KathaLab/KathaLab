const ForkTsCheckerWebpackPlugin = import("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = import("copy-webpack-plugin");
const path = import("path");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "./src/assets"),
        to: "assets",
      },
    ],
  }),
];
