describe('Account creation', () => {
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
        })
    })
    it('Create an already existing account', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'testAccount@example.com'
            },
            failOnStatusCode: false
        }).then(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/mynotes/account',
                body: {
                    email: 'testAccount@example.com'
                },
                failOnStatusCode: false
            }).then(res => {
                expect(res.status).to.eq(403)
            })
        })
    })
    it('Create an already existing account (lowercase)', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'testAccount@example.com'
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(403)
        })
    })
    it('Create with invalid email', () => {
        let invalids = [
            '',
            'a@@a.a',
            'é@a.a',
            '@.',
            'a@a'
        ]
        invalids.forEach(email => {
            cy.log('Testing ' + email)
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/mynotes/account',
                body: {
                    email: email
                },
                failOnStatusCode: false
            }).then(res => {
                expect(res.status).to.eq(400)
            })
        })
    })
})