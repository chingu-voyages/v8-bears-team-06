module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  coverageReporters: ["json"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!.next/**",
    "!next.config.js",
    "!coverage/**",
    "!jest.config.js"
  ]
};
