// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errors } from "../support/e2e";

describe("Landing Page", () => {
  beforeEach(() => cy.visit("/"));

  it("loads explore page", () => {
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /explore/i }).should("exist");
      cy.findByRole("link", { name: /forum/i }).should("exist");
    });

    cy.findByRole("main").within(() => {
      // check if loader has been removed
      cy.findByLabelText("/loading/i").should("not.exist");

      // check if search box is present
      cy.findByRole("searchbox").should("exist");
    });

    cy.findByRole("navigation").within(() => {
      cy.findByRole("button", {
        name: /connect wallet/i,
      }).should("exist");
    });
    // cy.findByText("Injected Wallet").click();
    // cy.findByRole("link", { name: /Launch an organisation/i }).should("exist");
  });
});
