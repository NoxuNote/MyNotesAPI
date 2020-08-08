describe('API Basics', () => {
    it('Should respond to /', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/',
        })
        .then(res => {
            expect(res.status).to.eq(200)
            cy.log('Response headers : ' + Object.keys(res.headers).join(', '))})
    })
    it('Should respond to /mynotes/', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/mynotes/',
        })
        .then(res => {
            cy.log('Response headers : ' + Object.keys(res.headers).join(', '))
            expect(res.status).to.eq(200)
        })
    })
    it('Should redirect / to /docs', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/mynotes/',
            followRedirect: false // turn off following redirects
        })
        .then(res => {
            expect(res.status).to.eq(302)
            expect(res.headers.location).to.eq("/docs")
        })
    })
    it('Should redirect /mynotes to /docs', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/mynotes/',
            followRedirect: false // turn off following redirects
        })
        .then(res => {
            expect(res.status).to.eq(302)
            expect(res.headers.location).to.eq("/docs")
        })
    })
    it('Should respond to /docs', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/docs',
        })
        .then(res => expect(res.status).to.eq(200))
    })
})