/*
 * Please duplicate this file and rename it like 'environment.prod.js"
 * Do not store credentials on git
 */
module.exports = {
    db: {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'test' 
    }
}