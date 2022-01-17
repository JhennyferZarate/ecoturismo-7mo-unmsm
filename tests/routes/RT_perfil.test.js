const supertest = require('supertest')
const {app, server} = require('../../src/index')
const api = supertest(app)
const pool = require('../../src/database')

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

describe('GET + POST: Perfil', () => {
    
    
    test('GET: Perfil', async() => {

        await api
            .post('/registro')
            .send(usuario_registro)
            .expect('Content-Type', "text/plain; charset=utf-8")

        await api
            .post('/ingreso')
            .send(usuario_ingreso)
            .expect('Content-Type', "text/plain; charset=utf-8")
            //.expect('Content-Type', "/application\/json/")
        
        const usuarios = await pool.query(
            `
            SELECT 
                *
            FROM
                usuarios
            WHERE
                email_usuario = ?
            `,[usuario_ingreso.email_usuario]
        )

        const id_usuario = usuarios[0].id_usuario

        await api
        .get('/perfil')
        .send(`${id_usuario}`)
        .expect(200)
        .expect('Content-Type', "text/plain; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
        expect(request.body).toBeDefined();
    })

    test('GET: Salida', async() => {
        await api
            .get('/salida')
            .expect(302)
            .expect('Content-Type', "text/plain; charset=utf-8")
    })
})

beforeAll(async () => {
    await server.close();
})

afterAll(async () => {
    await pool.end()
    await server.close();
})