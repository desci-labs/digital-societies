// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import "cypress-hmr-restarter";
import "@testing-library/cypress/add-commands";

// import * as Testserver from "../../src/test/server/test-server"
import { ByRoleMatcher, ByRoleOptions } from "@testing-library/react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      findByRole(role: ByRoleMatcher, options?: ByRoleOptions): Chainable<void>;
      findAllByRole(
        role: ByRoleMatcher,
        options?: ByRoleOptions
      ): Chainable<void>;
      // interceptRequest(type: string, route: string, ...args: any[])
    }
  }
}

export const errors = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on("uncaught:exception", (_err, _runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
