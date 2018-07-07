describe('Translation Editor', () => {

    it('should allow translating', () => {
        cy.visit('localhost:3000');
        cy.get('#segment-1').clear().type("Når man skriver et brev...");
        cy.get('#segment-2').clear().type("Vi burde være takknemlig for...");
        cy.get('#segment-3').clear().type("Det er tafatt å tenke at...");
    });

    it('should find/replace plain text', () => {
        cy.visit('localhost:3000');
        cy.contains('Search & Replace').click();
        cy.get('#find').type('man skriver');
        cy.get('#replace').type('man leser');
        cy.contains('Apply').click().trigger('blur');

        cy.get('#segment-1').should('have.value', 'Når man leser et brev...');
    });

    it('should find/replace case-insensitively (regex)', () => {
        cy.visit('localhost:3000');
        cy.contains('Search & Replace').click();
        cy.get('#find').type('NÅR MAN SKRIVER');
        cy.get('#replace').type('Når man leser');
        cy.get('#regex').click();
        cy.get('#caseInsensitive').click();
        cy.contains('Apply').click().trigger('blur');

        cy.get('#segment-1').should('have.value', 'Når man leser et brev...');
    });

    it('should find/replace ALL (regex)', () => {
        cy.visit('localhost:3000');
        cy.contains('Search & Replace').click();
        cy.get('#find').type('\\S+');
        cy.get('#replace').type('cyka blyat');
        cy.get('#regex').click();
        cy.get('#replaceAll').click();
        cy.contains('Apply').click().trigger('blur');

        cy.get('#segment-1').should('have.value', 'cyka blyat cyka blyat cyka blyat cyka blyat cyka blyat');
    });
})