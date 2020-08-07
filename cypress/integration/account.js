describe('Account creation', () => {
    it('Create an account', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account',
            body: {
                email: 'test@example.com'
            },
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('accountUuid')
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.eq('test@example.com')
        })
    })
    it('Create an already existing account', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/mynotes/account?email=test%40example.com',
            failOnStatusCode: false
        })
        .then((res) => {
            expect(res.status).to.eq(403)
        })
    })
  })