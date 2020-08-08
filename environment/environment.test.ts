module.exports = {
    api: {
        /**
         * Api listening port
         */
        port: 8080,
        /**
         * If true, the database will be reset each time the server starts.
         */
        cleanDbBeforeRun: true,
        /**
         * If true, the API endpoint GET /mynotes/reset will be enabled.
         * Calling this endpoind will reset the whole database.
         */
        enableTestMode: true
    },
    db: {
        /**
         * Sequelize ORM supports many DBMS. See
         * https://sequelize.org/master/manual/dialect-specific-things.html
         */
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'test' 
    }
}