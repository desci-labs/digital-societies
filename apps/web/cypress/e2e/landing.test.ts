// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errors } from "../support/e2e";

describe("Landing Page", () => {
  beforeEach(() => cy.visit("/"));

  it("loads explore page", () => {
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /explore/i }).should("exist");
    });
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /forum/i }).should("exist");
    });
    cy.screenshot();
  });
});
