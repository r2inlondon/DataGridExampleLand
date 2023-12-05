describe("launch filter and fire search", () => {
    it("filter libros", () => {
        cy.visit("http://localhost:3001");
        cy.get('[data-test="filter-header').contains(/showing 3 out of 7/i);
        cy.get('[data-test="filter-button"]').click();
        cy.get('[data-test="form-input"]').type("libros");
        cy.get('[data-test="filter-header').contains(/showing 1 out of 1/i);
        cy.get('[data-test="filter-badge"]').should("be.visible");
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 1);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        cy.get('[data-test="clear-filter-button"]').click();
        cy.get('[data-test="filter-header').contains(/showing 3 out of 7/i);
        cy.get('[data-test="filter-badge"]').should("have.text", "0");
    });
});
