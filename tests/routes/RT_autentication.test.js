const supertest = require('supertest')
const {app, server} = require('../../src/index')
const api = supertest(app)
const pool = require('../../src/database')

/*
beforeEach(async() => {
    1. Eliminar todos los datos de la Tabla en la DB
    2. Insertar el nuevo usuario.
})
*/
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const letra1 = characters.charAt(Math.floor(Math.random() * characters.length))
const letra2 = characters.charAt(Math.floor(Math.random() * characters.length))
const letra3 = characters.charAt(Math.floor(Math.random() * characters.length))

const usuario_registro = {
    email_usuario: `luiz_${letra1}${letra2}${letra3}@gmail.com`,
    pass_usuario: "123",
    nombre_perfil:`luiz_${letra1}${letra2}${letra3}`,
    apellido_perfil:`chavez_${letra1}${letra2}${letra3}`
}

const usuario_ingreso = {
    email_usuario: `luiz_${letra1}${letra2}${letra3}@gmail.com`,
    pass_usuario: "123"
}

describe('GET + POST: Autenticacion', () => {

    test('GET: html registro ', async() => {
        await api
            .get('/registro')
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            //.expect('Content-Type', "text/plain; charset=utf-8")
    })
    
    test('POST: enviar registro ', async() => {
        await api
            .post('/registro')
            .send(usuario_registro)
            .expect('Content-Type', "text/plain; charset=utf-8")
            //.expect('Content-Type', "/application\/json/")
    })

    test('GET: html ingreso ', async() => {
        await api
            .get('/ingreso')
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
    })
    
    test('POST: enviar ingreso ', async() => {
        await api
            .post('/ingreso')
            .send(usuario_ingreso)
            .expect('Content-Type', "text/plain; charset=utf-8")
            //.expect('Content-Type', "/application\/json/")
    })

    test('GET: cerrar sesion', async() => {
        await api
            .get('/salida')
            .expect(302)
            .expect('Content-Type', "text/plain; charset=utf-8")
    })
})

beforeAll(async () => {
    await server.close();
})