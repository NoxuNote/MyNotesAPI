/*
 * Please duplicate this file and rename it like 'environment.prod.js"
 * Do not store credentials on git
 */
module.exports = {
    api: {
        /**
         * Api listening port
         */
        port: 8080,
        /**
         * If true, the database will be reset each time the server starts.
         */
        cleanDbBeforeRun: false,
        /**
         * If true, the API endpoint GET /mynotes/reset will be enabled.
         * Calling this endpoind will reset the whole database.
         */
        enableTestMode: false,
    },
    db: {
        /**
         * Sequelize ORM supports many DBMS. See
         * https://sequelize.org/master/manual/dialect-specific-things.html
         */
        dialect: 'postgres',
        host: '',
        port: 5432,
        username: '',
        password: '',
        database: '' 
    }
}