/**
 * Importamos el módulo "timeago.js" que nos permite configurar
 * el tiempo pasado.
 * Este módulo lo utilizaremos para 
 */
const timeago = require('timeago.js');

/**
 * Creamos el objeto helpers que almacenará las propiedades de la
 * libreria "timeago.js"
 */
const helpers = {};

/**
 * 
 * @param {string} number
 *  indica el número que identifica el contador de la libreria
 * @param {string} index 
 *  indica el indice que se mostrará relativo al tiempo que ha
 *  pasado
 * @param {string} totalSec
 *  indica el total de segundo que han pasado desde que se creo
 *  cualquier archivo
 * @returns 
 *  retorna un arreglo de string donde solo se selecciona la
 *  opcio que indica el "index"
 */
const localeFunc = (number, index, totalSec) => {
    return [
        ['hace momentos', 'ahora mismo'],
        ['hace %s segundos', 'en %s segundos'],
        ['hace 1 minuto', 'en 1 minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace 1 hora', 'en 1 hora'],
        ['hace %s horas', 'en %s horas'],
        ['ayer', 'mañana'],
        ['hace %s dias', 'en %s dias'],
        ['hace 1 semana', 'en 1 semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['hace 1 mes', 'en 1 mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace 1 año', 'en 1 año'],
        ['hace %s años', 'en %s años']
    ][index];
    };

/**
 * Ejecutamos el objeto "timeago" con la funcion register
 * que enlazará nuestra plantilla de respuestas en forma de
 * arreglo y será relativo a nuestra ubicación geográfica
 */
timeago.register('my-locale', localeFunc);

/**
 * 
 * @param {string} timestamp
 *  parametro que valida el tiempo en que un archivo fue creado
 *  este nos servirá como base para comparar con el tiempo actual
 * @returns
 *  retorna la diferencia en milisegundo entre el tiempo de
 *  creación del archivo y la hora actual.
 *  El formato creado previamente convierte los milisegundos
 *  transurriendo en un array de string que depende de "index"
 *  y revuelve un string indicando el tiempo transcurrido pero en
 *  otro formato.
 */
helpers.timeago = (timestamp) => {
    return timeago.format(timestamp,'my-locale');
};

/**
 * Exportamos el objeto helpers para que pueda ser utilizado en 
 * los arhcivos donde sea importado y llamado.
 */
module.exports = helpers;