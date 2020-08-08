/*
 * Please duplicate this file and rename it like 'environment.prod.js"
 * Do not store credentials on git
 */
module.exports = {
    api: {
        port: 8080,
        cleanDbBeforeRun: false
    },
    db: {
        dialect: 'postgres',
        host: '',
        port: 5432,
        username: '',
        password: '',
        database: '' 
    }
}