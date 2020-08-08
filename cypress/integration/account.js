describe('Account creation', () => {
    it('Create an account', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'test1@example.com'
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('accountUuid')
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.eq('test1@example.com')
        })
    })
    it('Create an already existing account', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'test2@example.com'
            },
            failOnStatusCode: false
        }).then(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:8080/mynotes/account',
                body: {
                    email: 'test2@example.com'
                },
                failOnStatusCode: false
            }).then(res => {
                expect(res.status).to.eq(403)
            })
        })
        return
    })
  })