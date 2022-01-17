const {MYSQL_DATABASE, MYSQL_DATABASE_TEST, NODE_ENV} = process.env

const connectionString = NODE_ENV === 'test'
    ? MYSQL_DATABASE_TEST
    : MYSQL_DATABASE

module.exports = {
    // LOCAL
    database: {
        host: `${process.env.MYSQL_HOST}`,
        user: `${process.env.MYSQL_USER}`,
        password: `${process.env.MYSQL_PASSWORD}`,
        database: connectionString
    }
    // AMBIENTE TEST
    /*
    database: {
        host: "buafjdbqroblshuld81t-mysql.services.clever-cloud.com",
        user: "uqbrgdc9bht3sd2e",
        password: "U4TsdS5Z7JqYOvgdefH8",
        database: "buafjdbqroblshuld81t"
    }
    */
};