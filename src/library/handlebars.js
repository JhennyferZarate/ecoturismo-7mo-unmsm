//configuraciones de todas las funciones handlebars
const timeago = require('timeago.js');

const helpers = {};


const localeFunc = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
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

timeago.register('my-locale', localeFunc);


helpers.timeago = (timestamp) => {
    return timeago.format(timestamp,'my-locale');
};

module.exports = helpers;