import { arcURL } from '../fixtures/urls'

const login = () => {
    cy.get('.pm-login-button').click()
    cy.get('[href="/sso/index.php"]').click()
    cy.get('[id="username"]').type(Cypress.env('username'))
    cy.get('[id="password"]').type(Cypress.env('password'))
    cy.get('[name="_eventId_proceed"]').click()
    cy.url({timeout: 180000}).should(
        "eq",
        arcURL
    )
}

const selectTime = (time) => cy.get('.anchor').contains(time).parentsUntil('td').children('.bm-group-item-link').click()

const clickThrough = () => {
    cy.get('.bm-book-button').click()
    cy.get('[title="Next"]').click()
    cy.get('[title="Next"]').click()
    cy.get('[id="checkoutButton"]').click()
    cy.get('.process-now', { timeout: 15000 }).click()
    cy.get('.bm-course-primary-inner').should('contain', 'Thank you!')
}

context('Autobook', () => {
    it('Book', () => {
        cy.visit(arcURL)
        login()

        selectTime('03:00 pm - 04:25 pm')

        clickThrough()
        
    })
})