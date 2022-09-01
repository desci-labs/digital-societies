const { ProvidePlugin } = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    util: require.resolve("util"),
  };

  config.plugins.push(
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  return config;
};
