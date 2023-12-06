describe("launch filter and fire search", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001");
    });
    it("filter libros in table", () => {
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("libros");
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);
        cy.getDataTest("filter-badge").should("be.visible");
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 1);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        cy.getDataTest("clear-filter-button").click();
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.getDataTest("filter-badge").should("have.text", "0");
    });
    it("Filter libros in grid", () => {
        cy.getDataTest("gridAndListButton").click();
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("libros");
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);
        cy.getDataTest("filter-badge").should("be.visible");
        cy.getDataTest("grid-ele").children().should("have.length", 1);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        cy.getDataTest("clear-filter-button").click();
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.getDataTest("filter-badge").should("have.text", "0");
    });
});
