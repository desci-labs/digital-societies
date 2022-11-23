// eslint-disable-next-line @typescript-eslint/no-var-requires
import nextJest from "next/jest";
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: "v8",
  collectCoverageFrom: [
    "helpers/*.ts",
    "components/**/*.tsx",
    "pages/**/*.tsx",
    "hooks/**/*.ts",
    "service/**/*.ts",
    // Ignore untestable files
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["./jest.setup.ts", "<rootDir>/jest-shim.ts"],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
