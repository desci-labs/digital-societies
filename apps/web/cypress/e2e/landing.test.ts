import { errors } from "../support/e2e";

describe("Landing Page", () => {
  beforeEach(() => cy.visit("/"));

  it("loads explore page", () => {
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /explore/i }).click();
    });
    cy.screenshot();
  });

  // it("redirects to url /swap", () => {
  //   cy.url().should("include", "/swap");
  // });

  // it("allows navigation to pool", () => {
  //   cy.get("#pool-nav-link").click();
  //   cy.url().should("include", "/pool");
  // });
});
