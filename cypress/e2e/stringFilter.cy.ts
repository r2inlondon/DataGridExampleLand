describe("Just filtering", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001");
    });
    it.only("Table filter using all string operators", () => {
        // Contains operator - filter "li", then "liBROS"
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("li");
        cy.getDataTest("filter-header").contains(/showing 2 out of 2/i);
        cy.getDataTest("filter-badge").should("have.text", "1");
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 2);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        cy.getDataTest("filter-popover").clickOutside();
        cy.getDataTest("filter-button").click();
        cy.getDataTest("form-input").type("BROS");
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);

        // Equals operator - filter "Avatar", then "Avatar.JPEG"
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-equals").click();
        cy.getDataTest("form-input").clear().type("Avatar");
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 0);
        cy.getDataTest("form-input").clear().type(".JPEG");

        // StartsWith operator - filter "EX"
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-startsWith").click();
        cy.getDataTest("form-input").clear();
        cy.getDataTest("filter-badge").should("have.text", "0");
        cy.get(".MuiPagination-ul").children().should("have.length", 7);
        cy.getDataTest("form-input").type("EX");
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "1");
        });
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 1);

        // Change to Column Type, startsWith operator and filter"Ex"
        cy.getDataTest("form-column").click();
        cy.getDataTest("test-filetype").click();
        cy.get("#filter-value-input")
            .invoke("val")
            .then((value) => {
                cy.wrap(value).should("be.empty");
            });
        cy.getDataTest("filter-badge").should("have.text", "0");
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.get(".MuiPagination-ul").children().should("have.length", 7);
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 3);
        cy.getDataTest("filter-badge").should("have.text", "0");
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-startsWith").click();
        cy.getDataTest("form-input").type("EX");
        cy.getDataTest("filter-badge").should("have.text", "1");
        cy.getDataTest("filter-header").contains(/showing 2 out of 2/i);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 2);

        // Close filter popover, re-open and test filter is cached
        cy.get("body").type("{esc}");
        cy.getDataTest("filter-button").click();
        cy.get("#column-select").then((columnName) => {
            cy.wrap(columnName).should("have.text", "Type");
        });
        cy.get("#operator-select").then((operator) => {
            cy.wrap(operator).should("have.text", "Starts with");
        });
        cy.get("#filter-value-input")
            .invoke("val")
            .then((value) => {
                console.log(value);
                expect(value).to.eq("EX");
            });
        cy.getDataTest("filter-badge").should("have.text", "1");
        cy.getDataTest("filter-header").contains(/showing 2 out of 2/i);
        cy.get(".MuiPagination-ul").children().should("have.length", 5);
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 2);

        // Same Column, endsWith operator, filter "pdf", change operator to startWith
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-endsWith").click();
        cy.getDataTest("form-input").clear();
        cy.getDataTest("filter-badge").should("have.text", "0");
        cy.get(".MuiPagination-ul").children().should("have.length", 7);
        cy.getDataTest("form-input").type("pdf");
        cy.getDataTest("filter-header").contains(/showing 0 out of 0/i);
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 0);
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-startsWith").click();
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "1");
        });
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 1);
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);

        // Change Column to Name and filter by isEmpty
        cy.getDataTest("form-column").click();
        cy.getDataTest("test-filename").click();
        cy.getDataTest("form-input").type("caca");
        cy.getDataTest("filter-header").contains(/showing 0 out of 0/i);
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-isEmpty").click();
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "1");
        });
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 1);
        cy.getDataTest("filter-header").contains(/showing 1 out of 1/i);

        // Reset filter
        cy.getDataTest("clear-filter-button").click();
        cy.get("#column-select").then((columnName) => {
            cy.wrap(columnName).should("have.text", "Name");
        });
        cy.get("#operator-select").then((operator) => {
            cy.wrap(operator).should("have.text", "Contains");
        });
        cy.get("#filter-value-input")
            .invoke("val")
            .then((value) => {
                cy.wrap(value).should("be.empty");
            });
        cy.getDataTest("filter-badge").should("have.text", "0");
        cy.getDataTest("filter-header").contains(/showing 3 out of 7/i);
        cy.get(".MuiPagination-ul").children().should("have.length", 7);
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 3);

        // Same column and filter by isNotEmpty
        cy.getDataTest("form-operator").click();
        cy.getDataTest("test-isNotEmpty").click();
        cy.get('button[aria-current="true"]').then((selectedButton) => {
            cy.wrap(selectedButton).should("have.text", "1");
        });
        cy.get(".MuiDataGrid-renderingZone")
            .children()
            .should("have.length", 3);
        cy.getDataTest("filter-header").contains(/showing 3 out of 6/i);
    });
});
