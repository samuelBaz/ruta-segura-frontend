import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalSessionAndOrigin: true,
    numTestsKeptInMemory: 0,
    fixturesFolder: 'test/e2e/cypress/fixtures',
    specPattern: 'test/e2e/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/e2e/cypress/support/e2e.ts'
  }
});
