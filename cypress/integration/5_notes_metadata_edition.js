describe('Note metadata edition', () => {
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
    it('Should return 1 note metadata', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid')
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res.body))
            expect(res.body.accountUuid).to.eq(Cypress.env('accountUuid'))
            expect(res.body.uuid).to.eq(Cypress.env('uuid0'))
            expect(res.body.title).to.have.length.greaterThan(0)
            Cypress.env('NoteMetadata0', res.body)
        })
    })
    it('Should return the same metadata', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: Cypress.env('NoteMetadata0'),
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            const removeDates = obj => {return { ...obj, createdAt: undefined, updatedAt: undefined } }
            expect(
                removeDates(res.body)
            ).to.deep.eq(
                removeDates(Cypress.env('NoteMetadata0'))
            )
        })
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            const removeDates = obj => {return { ...obj, createdAt: undefined, updatedAt: undefined } }
            expect(
                removeDates(res.body)
            ).to.deep.eq(
                removeDates(Cypress.env('NoteMetadata0'))
            )
        })
    })
    it('Empty object should not return 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {},
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
        })
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            const removeDates = obj => {return { ...obj, createdAt: undefined, updatedAt: undefined } }
            expect(
                removeDates(res.body)
            ).to.deep.eq(
                removeDates(Cypress.env('NoteMetadata0'))
            )
        })
    })
    it('Unauthorized keys should not alter metadata', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: { 
                ...Cypress.env('NoteMetadata0'),
                "test": "test",
                "test": "test",
                "array": ["a"],
                "uuid": "d92fa1ce-d2c2-41fe-a68b-0961cc3f6d53",
                "accountUuid": "d92fa1ce-d2c2-41fe-a68b-0961cc3f6d53",
                "noteContent": "aa"
            },
            failOnStatusCode: false
        })
        .then((res) => {
            cy.log(res)
            expect(res.status).to.eq(200)
            const removeDates = obj => {return { ...obj, createdAt: undefined, updatedAt: undefined } }
            expect(
                removeDates(res.body)
            ).to.deep.eq(
                removeDates(Cypress.env('NoteMetadata0'))
            )
        })
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            const removeDates = obj => {return { ...obj, createdAt: undefined, updatedAt: undefined } }
            expect(
                removeDates(res.body)
            ).to.deep.eq(
                removeDates(Cypress.env('NoteMetadata0'))
            )
        })
    })
    it('Empty JSON should not 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: { },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
        })
    })
    it('Array JSON should not 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: [],
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
        })
    })
    it('Unallowed null or undefined should not 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "title": null
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
            cy.log(JSON.stringify(res.body))
        })
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "title": undefined
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
            cy.log(JSON.stringify(res.body))
        })
    })
    it('Allowed null should 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "description": null
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res.body))
        })
    })
    it('Unallowed empty should not 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "title": ""
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
            cy.log(JSON.stringify(res.body))
        })
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "title": " "
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
            cy.log(JSON.stringify(res.body))
        })
    })
    it('Allowed undefined should 200', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "description": undefined
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.not.eq(200)
            cy.log(JSON.stringify(res.body))
        })
    })
    it('Should change only title', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8080/mynotes/notes/${Cypress.env('uuid0')}`,
            headers: {
                "X-Api-User-Id": Cypress.env('accountUuid'),
                "Content-type": "application/json",
                "charset": "utf8"
            },
            body: {
                "title": "NEWTITLE",
                "uuid": "d92fa1ce-d2c2-41fe-a68b-0961cc3f6d53"
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.title).to.eq("NEWTITLE")
            expect(res.body.uuid).to.eq(Cypress.env('NoteMetadata0').uuid)
            expect(res.body.version).to.eq(Cypress.env('NoteMetadata0').version)
            expect(res.body.author).to.eq(Cypress.env('NoteMetadata0').author)
        })
    })
})