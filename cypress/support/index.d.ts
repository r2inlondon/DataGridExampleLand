// cypress/support/index.ts

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
        clickOutside(): Chainable<any>;
    }
}
