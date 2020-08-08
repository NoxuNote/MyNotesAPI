describe('Note creation', () => {
    it('Reset database', () => {
        cy.visit('http://localhost:8080/mynotes/')
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/mynotes/reset',
        })
        .then(res => expect(res.status).to.eq(200))
    })
    it('Create an account', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'testAccount@example.com'
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('accountUuid')
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.eq('testAccount@example.com')
            Cypress.env('accountUuid', res.body.accountUuid)
        })
    })
    it('Create an empty note', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/notes',
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('uuid')
            expect(res.body).to.have.property('accountUuid')
            expect(res.body).to.have.property('title')
            expect(res.body.title).to.not.eq('')
            expect(res.body.accountUuid).to.eq(Cypress.env('accountUuid'))
        })
    })
})