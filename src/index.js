/**
 * Importamos el archivo con el objeto app de la ruta "./app",
 * este objeto contiene toda la información a utilizar por el
 * proyecto. 
 */
const app = require('./app')

/**
 * Estas funciones ejecutan la aplicacion y señalan el puerto
 * donde serán ejecutados.
 * Luego ejecutamos la función para que pueda ser utilizada.
 */
const listener = () => {
    console.log('servidor en el puerto: ',app.get('port'))
}
async function main(){
    await app.listen(app.get('port'), listener)
}
main()