module.exports = {
  roots: ["<rootDir>/tests"],  
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
};
