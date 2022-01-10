/**
 * Objetos que permiten conectarnos a los URL
 * Es este caso existen 4 situaciones:
 *      ISLOGGEDIN
 *          esta funcion es utilizada como un callback
 *          que nos permite acceder a ciertas rutas
 *          si y solo si el usuario esta autenticado
 *          o se logeado
 *      ISNOTLOGGEDIN
 *          esta funcion es utilizada como un callback
 *          que nos permite acceder a ciertas rutas
 *          si y solo si el usuario no esta autenticado
 *          o no se a logeado.
 */
module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/ingreso');
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/usuario');
    }
};