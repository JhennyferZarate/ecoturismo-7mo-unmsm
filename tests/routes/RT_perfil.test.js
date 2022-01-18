const supertest = require('supertest')
const {app, server} = require('../../src/index')
const api = supertest(app)
const pool = require('../../src/database')

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const letra1 = characters.charAt(Math.floor(Math.random() * characters.length))
const letra2 = characters.charAt(Math.floor(Math.random() * characters.length))
const letra3 = characters.charAt(Math.floor(Math.random() * characters.length))

const usuario_cambio = {
    email_usuario: `luiz_${letra1}${letra2}${letra3}@gmail.com`,
    nombre_perfil:`luiz_${letra1}${letra2}${letra3}`,
    apellido_perfil:`chavez_${letra1}${letra2}${letra3}`
}

describe('GET + POST: Perfil', () => {

    test('GET: perfil de usuario', async() => {
        await api
        .get('/perfil')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
    })

    test('GET: html cambiar datos', async() => {
        await api
        .get('/perfil/cambiar_datos')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
    })

    test('POST: cambiar datos del usuario', async() => {
        await api
        .post('/perfil/cambiar_datos')
        .send(usuario_cambio)
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })

    test('GET: html cambiar contraseña', async() => {
        await api
        .get('/perfil/cambiar_pass')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
    })

    test('POST: cambiar contraseña del usuario', async() => {
        const usuarios = await pool.query(`
        SELECT
            *
        FROM
            usuarios
        WHERE
            id_usuario = 1
        `)
        const pass = usuarios[0].pass_usuario
        const usuario_nueva_pass = {
            pass_usuario: pass,
            nuevo_pass_usuario: "123",
            copia_nuevo_pass_usuario: "123"
        }
        await api
        .post('/perfil/cambiar_pass')
        .send(usuario_nueva_pass)
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })
})

beforeAll(async () => {
    await server.close()
})