/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
          "@link-color": "#1DA57A",
        },
      },
    },
  ],
};
