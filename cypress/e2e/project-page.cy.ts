import { mockProjectDetails } from "../fixtures/projects";

describe("Project page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/projects/airbox", {
      statusCode: 200,
      body: mockProjectDetails,
    }).as("getProjectDetails");
  });

  it("should display the name of the project and show total number of entries", () => {
    cy.visit("/projects/airbox");
    cy.get("h2").should("contain", "Project Airbox");
    cy.get("p").should("contain", "Top 10 out of 21 total feeds");
  });
  it("should display the top 10 feeds", () => {
    cy.visit("/projects/airbox");
    // cypress is counting the header as well so we need to take that into account
    cy.get("[data-testid=feeds").find("tr").its("length").should("be.eq", 11);
  });
  it("should display the device ID, latitude and longitude for each feed", () => {
    cy.visit("/projects/airbox");
    cy.contains("74DA38F7C64C")
      .parent("tr")
      .within(() => {
        cy.get("td").eq(1).contains("11:53:42");
        cy.get("td").eq(2).contains("24.97");
        cy.get("td").eq(3).contains("121.392");
      });
  });
});
