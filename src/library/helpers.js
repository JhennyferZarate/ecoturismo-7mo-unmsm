/**
 * Importamos el módulo "bcrypt.js" que nos permitirá
 * encriptar las contraseña para nuestros usuarios
 * mediante hashing
 */
const bcrypt = require('bcryptjs');
/**
 * Creamos el objeto helpers que almacenará la información
 * del string encriptado.
 */
const helpers = {};

/**
 * Esta funcion encripta las contraseña pasando por parametro
 * un string.
 * @param {string} password
 *  se pasará por parametro la contraseña de nuestro usuario
 *  que luego será encriptado mediante hashing.
 * @returns 
 *  se retorna la contraseña encriptada mediante hashing.
 */
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

/**
 * Esta función compara dos string, desencriptando uno
 * y luego comparado con el otro string
 * @param {string} password
 *  contraseña ingresas por los usuarios
 * @param {string} savedPassword
 *  contraseña encriptada que será comparada con la contraseña
 *  ingresada por los usuarios
 * @returns 
 *  return un valor booleano que nos indicará si la contraseña
 *  es la misma o no
 */
helpers.matchPassword = async(password, savedPassword) => {
    return await bcrypt.compare(password, savedPassword);
};

/**
 * Exportamos el objeto helpers para que pueda ser utilizado
 * en los archivos donde sea llamado
 */
module.exports = helpers;