/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  globalSetup: "./src/testUtils/setUp.ts",
  globalTeardown: "./src/testUtils/tearDown.ts",
};