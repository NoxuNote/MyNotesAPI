describe('Note deletion', () => {
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
    it('Create 2 empty notes', () => {
        for (let i = 0; i < 2; i++) {     
            cy.log(`Creating #${i} note...`)       
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
                if (i == 0) Cypress.env('uuid1', res.body.uuid)
            })
        }
    })
    it('Create another account with it\' own note', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'testAccount2@example.com'
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('accountUuid')
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.eq('testAccount2@example.com')
            Cypress.env('accountUuid2', res.body.accountUuid)
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/mynotes/notes',
                headers: {
                    "X-Api-User-Id": Cypress.env('accountUuid2')
                },
                failOnStatusCode: false
            })
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('uuid')
                expect(res.body).to.have.property('accountUuid')
                expect(res.body).to.have.property('title')
                expect(res.body.title).to.not.eq('')
                expect(res.body.accountUuid).to.eq(Cypress.env('accountUuid2'))
                Cypress.env('otherAccountNote', res.body.uuid)
            })
        })
    })
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
    it('Should not delete on other account', () => {
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