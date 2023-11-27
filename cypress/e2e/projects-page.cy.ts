describe("Projects page", () => {
  it("happy path - should show a list with all the projects", () => {
    cy.visit("/projects");
    cy.get("h2").should("contain", "Projects");
    cy.get("[data-testid=airbox").should("contain", "Airbox");
    cy.get("[data-testid=fw_sensor").should("contain", "Fw Sensor");
  });

  it("should allow the user to click on the project and redirect to project page", () => {
    // this doesn't work atm because of the version of Next.JS used: https://github.com/vercel/next.js/discussions/56446
    // const handler = http.get(
    //   "https://pm25.lass-net.org/API-1.0.0/project/all/",
    //   ({ request }) => {
    //     return HttpResponse.text(mockProjects);
    //   }
    // );
    // cy.interceptRequest(handler);

    cy.visit("/projects");
    cy.get("h1").should("contain", "Welcome to PM25 projects");
    cy.get("[data-testid=fw_sensor").should("contain", "Fw Sensor");

    cy.get("[data-testid=fw_sensor").click();
    cy.url().should("include", "/fw_sensor");
    cy.get("h2").should("contain", "Project Fw_sensor");
  });

  // TODO: add test for when the HTTP request fails
  it("should redirect to error page if projects can't be retrieved from the API", () => {});
});
