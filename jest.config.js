module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { presets: ["next/babel"] },
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest-setup.ts"],
};
