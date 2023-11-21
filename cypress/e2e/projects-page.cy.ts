import { mockProjectDetails, mockProjects } from "../fixtures/projects";

describe("Projects page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/projects", {
      statusCode: 200,
      body: JSON.stringify(mockProjects),
      headers: {
        Accept: "text/plain",
      },
    }).as("getProjects");
  });

  it("should show a list with all the projects", () => {
    cy.visit("/projects");
    cy.wait("@getProjects");
    cy.get("h2").should("contain", "Projects");
    cy.get("[data-testid=airbox").should("contain", "Airbox");
    cy.get("[data-testid=fw_sensor").should("contain", "Fw Sensor");
  });

  it("should allow the user to click on the project and redirect to project page", () => {
    cy.visit("/projects");
    cy.wait("@getProjects");
    cy.get("h1").should("contain", "Welcome to PM25 projects");
    cy.get("[data-testid=airbox").should("contain", "Airbox");

    cy.intercept("GET", "/api/projects/airbox", {
      statusCode: 200,
      body: mockProjectDetails,
    }).as("getProjectDetails");

    cy.get("[data-testid=airbox").click();
    cy.url().should("include", "/airbox");
    cy.wait("@getProjectDetails");
    cy.get("h2").should("contain", "Project Airbox");
  });

  it("should redirect to error page if projects can't be retrieved from the API", () => {
    cy.intercept("GET", "/api/projects", {
      forceNetworkError: true,
    }).as("getProjectsError");
    cy.visit("/projects");

    cy.wait("@getProjectsError").should("have.property", "error");
    cy.url().should("include", "/error");
  });
});
