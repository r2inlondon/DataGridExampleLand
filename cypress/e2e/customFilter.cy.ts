describe("launch filter and fire search", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001");
    });
    it("filter liBROS in table, delete it, moved to page 2, changed layout", () => {
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("li");
        cy.getDataTest("filter-header").contains(/showing 2 out of 2/i);
        cy.getDataTest("filter-badge").should("be.visible");
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 2);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        // cy.getDataTest("clear-filter-button").click();
        cy.getDataTest("filter-popover").clickOutside();
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("BROS");
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);
        cy.getDataTest("filter-popover").clickOutside();
        cy.getDataTest("test-delete-btn-liBros.xls").click();
        cy.getDataTest("filter-header").contains(/showing 3 out of 6/i);
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "1");
        });
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 3);
        cy.getDataTest("filter-badge").should("have.text", "0");
        cy.get('button[aria-label="Go to page 2"]').then((selectedButton) => {
            cy.wrap(selectedButton).click();
        });
        cy.getDataTest("gridAndListButton").click();
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "2");
        });
        cy.getDataTest("grid-ele").children().should("have.length", 3);
    });
    it("Filter liBros in grid and delete it", () => {
        cy.getDataTest("gridAndListButton").click();
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("li");
        cy.getDataTest("filter-header").contains(/showing 2 out of 2/i);
        cy.getDataTest("filter-badge").should("be.visible");
        cy.getDataTest("grid-ele").children().should("have.length", 2);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        // cy.getDataTest("clear-filter-button").click();
        cy.getDataTest("filter-popover").clickOutside();
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("bros");
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);
        cy.getDataTest("filter-popover").clickOutside();
        cy.getDataTest("btn-menu-liBros.xls").click();
        cy.getDataTest("test-delete-btn-liBros.xls").click();
        cy.getDataTest("filter-header").contains(/showing 3 out of 6/i);
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "1");
        });
        cy.getDataTest("grid-ele").children().should("have.length", 3);
        cy.getDataTest("filter-badge").should("have.text", "0");
    });
});

// describe("Upload items and navigate", () => {
//     beforeEach(() => {
//         cy.visit("http://localhost:3001");
//     });
//     it("Change to grid view, upload, should go to last page, navigate to previous page", () => {
//         cy.getDataTest("gridAndListButton").click();
//         cy.getDataTest("upload-button").click();
//         cy.getDataTest("grid-ele").children().should("have.length", 2);
//         cy.getDataTest("grid-item-file8").should("exist");
//         cy.getDataTest("filter-header").contains(/showing 2 out of 8/i);
//         cy.get('button[aria-current="true"]').then((selectedButton) => {
//             cy.wrap(selectedButton).should("have.text", "3");
//         });
//         cy.get('button[aria-label="Go to page 2"]').then((selectedButton) => {
//             cy.wrap(selectedButton).click();
//         });
//         cy.getDataTest("grid-ele").children().should("have.length", 3);
//         cy.getDataTest("filter-header").contains(/showing 3 out of 8/i);
//     });
// });
