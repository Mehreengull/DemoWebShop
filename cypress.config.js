const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "dvsi1y",
  reporter: "cypress-mochawesome-reporter",
  video: true,
  retries: 1,
  e2e: {
    baseUrl: "https://demowebshop.tricentis.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    experimentalStudio: true,
  },
});
