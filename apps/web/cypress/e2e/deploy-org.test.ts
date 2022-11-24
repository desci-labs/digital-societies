// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockOrg } from "../fixtures/data";

describe("Create an organisation", () => {
  beforeEach(() => cy.visit("/"));

  it("loads explore page", () => {
    cy.findByRole("navigation").within(() => {
      cy.findByRole("button", {
        name: /connect wallet/i,
      }).click();
    });
    cy.findByText("Injected Wallet").click();
    cy.findByRole("link", { name: /Launch an organisation/i }).click();
    cy.findByRole("textbox", { name: /name/i }).type(mockOrg.metadata.name);
    cy.findByRole("textbox", { name: /symbol/i }).type(mockOrg.metadata.symbol);
    cy.findByRole("textbox", { name: /description/i }).type(
      mockOrg.metadata.description
    );
    cy.findByRole("textbox", { name: /external link/i }).type(
      mockOrg.metadata.external_link
    );
    cy.get('[data-cy="banner-dropzone"]').selectFile(
      "cypress/fixtures/banner.png",
      {
        action: "drag-drop",
      }
    );
    cy.get('[data-cy="image-dropzone"]').selectFile(
      "cypress/fixtures/image.png",
      {
        action: "drag-drop",
      }
    );
  });
});
