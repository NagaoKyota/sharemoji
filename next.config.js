require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withImages = require("next-images");

module.exports = withImages({
  esModule: true,
  webpack: config => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];
    return config;
  }
});
