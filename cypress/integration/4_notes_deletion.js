describe('Note deletion', () => {
    it('Delete note one of my notes', () => {
        cy.log(Cypress.env('accountUuid'))
        cy.request({
            method: 'DELETE',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid1')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
        })
    })
    it('Should list 1 note', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/mynotes/notes',
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.headers['content-type']).to.eq('application/json')
            expect(res.status).to.eq(200)
            expect(res.body).to.have.lengthOf(1)
            cy.log('Response :')
            cy.log(JSON.stringify(res.body))
            cy.log(JSON.stringify(res.headers))
            Cypress.env('uuid1', res.body[0].uuid)
        })
    })
    it('Other account has 1 note', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid2')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.lengthOf(1)
        })
    })
    it('Should not delete other account', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('otherAccountNote')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(404)
            cy.request({
                method: 'GET',
                url: `http://localhost:8080/mynotes/notes/`,
                headers: {
                    "X-Api-User-Id": Cypress.env('accountUuid2')
                },
                failOnStatusCode: false
            })
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.lengthOf(1)
            })
        })
    })
})