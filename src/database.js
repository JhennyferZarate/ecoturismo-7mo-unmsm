/**
 * Importar el módulo "mysql" para utilizarlo como base de datos
 */
const mysql = require('mysql');

/**
 * Importamos la libreria "util" para convertir funciones en
 * promesas. Importamos el objeto promisify de la libreria "util"
 */
const { promisify } = require('util');

/**
 * Importamos el archivo donde se encuentran las credenciales para
 * acceder a la base de datos en la ruta "./keys". Donde solo importamos
 * el objeto database
 */
const { database } = require('./keys');

/**
 * Ejecutamos el atributo "createPool" del objeto mysql, pasando por parametro
 * las credenciales importadas del archivo "./keys" mediante el objeto database.
 * Esta información se almacena en el objeto pool.
 */
const pool = mysql.createPool(database);

/**
 * Ejecutamos el objeto pool con la funcion getConnection para conectarlo a la base
 * de datos. Esta funcion pasa por parametro los valores de la conexión y un posible
 * formato de error.
 */
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            /**
             * Muestra un error donde la base de datos se ha cerrado
             */
            consoles.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            /**
             * Muestra un error donde existen varias conexiones a la misma
             * base de datos.
             */
            consoles.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            /**
             * Muestra un error donde la base de datos ha rechazado la conexión
             */
            consoles.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    /**
     * condicional que establece la conexión a la base de datos y muestra un mensaje
     * donde indica que la base de datos ha sido conectada.
     */
    if (connection) return connection.release();
    console.log('DB is connected');
});

/**
 * promisify pool querys - > convertir a promesas lo que antes era callback
 */
pool.query = promisify(pool.query);

/**
 * Exportamos el objeto pool que contiene la acreditación sobre la base de datos
 * que se maneja. Este objeto puede ser utilizado en cualquier parte del proyecto
 * para establecer una conexión con la base de datos.
 */
module.exports = pool;