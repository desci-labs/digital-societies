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
  });
});
