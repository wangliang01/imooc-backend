module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    [
      "root-import",
      {
        rootPathSuffix: "src/",
        rootPathPrefix: "@/",
      },
    ],
  ],
};
