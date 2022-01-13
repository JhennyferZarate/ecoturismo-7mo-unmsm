module.exports = {
    // LOCAL
    database: {
        host: `${process.env.MYSQL_HOST}`,
        user: `${process.env.MYSQL_USER}`,
        password: `${process.env.MYSQL_PASSWORD}`,
        database: `${process.env.MYSQL_DATABASE}_test`
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