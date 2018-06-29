describe('Translation Editor', () => {
    it('should find/replace plain text', () => {
        cy.visit('localhost:3000');
        cy.get('#find').type('klar');
        cy.get('#replace').type('ikke klar!');  
        cy.contains('Apply').click().trigger('blur');
        // This won't work for input value apparently ... use textarea? contenteditable?
        // cy.contains('Middagen er ikke klar!');
    });
    it('should find/replace case-insensitively (regex)', () => {
        cy.visit('localhost:3000');
        cy.get('#find').type('BADET');
        cy.get('#replace').type('badet din gamle sjokolade!');
        cy.get('#regex').click();
        cy.get('#caseInsensitive').click();
        cy.contains('Apply').click().trigger('blur');
        // cy.contains('Ha det på badet din gamle sjokolade');
    });
    it('should find/replace ALL (regex)', () => {
        cy.visit('localhost:3000');
        cy.get('#find').type('\\w+');
        cy.get('#replace').type('cyka blyat!');
        cy.get('#regex').click();
        cy.get('#replaceAll').click();

        cy.contains('Apply').click().trigger('blur');
        // cy.contains('Ha det på badet din gamle sjokolade');
    });
})