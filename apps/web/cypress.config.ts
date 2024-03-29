import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1kt3ev",
  defaultCommandTimeout: 10000,
  videoUploadOnPasses: false,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return {
        ...config,
        browsers: config.browsers.filter(({ name }) => name === "chrome"),
      };
    },
  },
});
