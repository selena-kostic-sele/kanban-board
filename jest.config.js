module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "ts", "jsx", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
    "^@/store/BoardStore$": "<rootDir>/store/BoardStoreMock.ts",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
