const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dvsi1y',
  
  e2e: {
    baseUrl: 'https://demowebshop.tricentis.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
     
    },
    experimentalStudio: true
  },
});
