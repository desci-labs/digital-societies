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
import { injected } from "./ethereum";
import assert = require("assert");
import { wagmiStore } from "../fixtures/wagmi-store";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface ApplicationWindow {
      ethereum: typeof injected;
    }
    interface Chainable {
      findByRole(role: ByRoleMatcher, options?: ByRoleOptions): Chainable<void>;
      findAllByRole(
        role: ByRoleMatcher,
        options?: ByRoleOptions
      ): Chainable<void>;
      // interceptRequest(type: string, route: string, ...args: any[])
    }
    interface VisitOptions {
      serviceWorker?: true;
    }
  }
}

// sets up the injected provider to be a mock ethereum provider with the given mnemonic/index
// eslint-disable-next-line no-undef
Cypress.Commands.overwrite(
  "visit",
  (
    original,
    url: string | Partial<Cypress.VisitOptions>,
    options?: Partial<Cypress.VisitOptions>
  ) => {
    assert(typeof url === "string");

    cy.intercept(
      "/service-worker.js",
      options?.serviceWorker ? undefined : { statusCode: 404 }
    ).then(() => {
      original({
        ...options,
        url:
          (url.startsWith("/") && url.length > 2 && !url.startsWith("/#")
            ? `/#${url}`
            : url) + "?chain=goerli",
        onBeforeLoad(win) {
          options?.onBeforeLoad?.(win);
          win.localStorage.clear();
          win.localStorage.setItem("wagmi.store", wagmiStore);
          win.localStorage.setItem("wagmi.wallet", '"metaMask"');
          // win.localStorage.setItem("wagmi.injected.shimDisconnect", "true");
          // win.localStorage.setItem("wagmi.connected", "true");

          win.ethereum = injected;
        },
      });
    });
  }
);

beforeEach(() => {
  // Infura security policies are based on Origin headers.
  // These are stripped by cypress because chromeWebSecurity === false; this adds them back in.
  cy.intercept(/infura.io/, (res) => {
    res.headers["origin"] = "http://localhost:3000";
    res.continue();
  });
});

export const errors = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on("uncaught:exception", (_err, _runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
