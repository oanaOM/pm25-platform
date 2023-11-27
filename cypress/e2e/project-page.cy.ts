describe("Project page", () => {
  it("should display the name of the project and show total number of entries", () => {
    cy.visit("/projects/airu");
    cy.get("h2").should("contain", "Project Airu");
    cy.get("p").should("contain", "23 feeds");
  });
  it("should display the top 10 feeds", () => {
    cy.visit("/projects/airu");
    // cypress is counting the header as well so we need to take that into account
    cy.get("[data-testid=feeds").find("tr").its("length").should("be.eq", 11);
  });
  it("should display the device ID, latitude and longitude for each feed", () => {
    cy.visit("/projects/airu");
    cy.contains("AirU_F45EABA254AA")
      .parent("tr")
      .within(() => {
        cy.get("td").eq(1).contains("09:44:08");
        cy.get("td").eq(2).contains("40.73606");
        cy.get("td").eq(3).contains("-111.85306");
      });
  });
});
