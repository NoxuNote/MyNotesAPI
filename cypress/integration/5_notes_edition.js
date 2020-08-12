describe('Note edition', () => {
    it('Reset database', () => {
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
                Cypress.env('uuid' + i, res.body.uuid)
            })
        }
    })
    it('Should return note content', () => {
        for (let i = 0; i < 2; i++) {     
            cy.request({
                method: 'GET',
                url: `http://localhost:8080/mynotes/notes/${Cypress.env(`uuid${i}`)}/content`,
                headers: {
                    "X-Api-User-Id": Cypress.env('accountUuid')
                },
                failOnStatusCode: false
            })
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.eq('{}')
            })
        }
    })
    it('Should update note 0 content', () => {
        Cypress.env('newContent0', {"time":1589235091957,"blocks":[{"type":"paragraph","data":{"text":"dsqdqsdqs"}},{"type":"paragraph","data":{"text":"dsqdqsdqs"}},{"type":"header","data":{"text":"dsqdsqdqsd","level":2}}],"version":"2.16.1"})
        cy.log(Cypress.env(`uuid0`))
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env(`uuid0`)}/content`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "text/plain",
                "charset": "utf8"
            },
            body: Cypress.env('newContent0'),
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
        })
    })
    it('Should return new note contents', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env(`uuid0`)}/content`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.eq(JSON.stringify(Cypress.env('newContent0')))
        })
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env(`uuid1`)}/content`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.eq('{}')
        })
    })
    it('Create another account with it\'s own note', () => {
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
    it('Should not update other account content', () => {
        cy.log(Cypress.env(`uuid0`))
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env(`otherAccountNote`)}/content`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "text/plain",
                "charset": "utf8"
            },
            body: Cypress.env('newContent0'),
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(404)
            cy.request({
                method: 'GET',
                url: `http://localhost:8080/mynotes/notes/${Cypress.env(`otherAccountNote`)}/content`,
                headers: {
                    "X-Api-User-Id": Cypress.env('accountUuid2')
                },
                failOnStatusCode: false
            })
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.eq('{}')
            })
        })
    })
})