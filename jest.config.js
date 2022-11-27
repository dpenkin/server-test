module.exports = {
    setupFiles: ["dotenv/config"],
    preset: 'ts-jest',
    transform: {
      "\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/'
    ],
    testEnvironment: "node",
  };
