describe('Note creation and listing', () => {
    it('Reset database', () => {
        cy.visit('http://localhost:8080/mynotes/')
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/mynotes/reset',
        })
        .then(res => expect(res.status).to.eq(200))
    })
    it('Should list 0 notes', () => {
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
            expect(res.body).to.have.lengthOf(0)
            cy.log('Response :')
            cy.log(JSON.stringify(res.body))
            cy.log(JSON.stringify(res.headers))
        })
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
            })
        }
    })
    it('Should list those 2 notes', () => {
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
            expect(res.body).to.have.lengthOf(2)
            cy.log('Response :')
            cy.log(JSON.stringify(res.body))
            cy.log(JSON.stringify(res.headers))
            Cypress.env('uuid1', res.body[0].uuid)
        })
    })
    it('Should return 1 note metadata', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid1')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.accountUuid).to.eq(Cypress.env('accountUuid'))
            expect(res.body.uuid).to.eq(Cypress.env('uuid1'))
        })
    })
    it('Should return 1 note content', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid1')}/content`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res.body))
        })
    })
    it('Create another account with his own note', () => {
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
    it('Should list again 2 notes', () => {
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
            expect(res.body).to.have.lengthOf(2)
            cy.log('Response :')
            cy.log(JSON.stringify(res.body))
            cy.log(JSON.stringify(res.headers))
        })
    })
})