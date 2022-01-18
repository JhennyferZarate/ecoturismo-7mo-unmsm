const supertest = require('supertest')
const {app, server} = require('../../src/index')
const api = supertest(app)

describe('GET + POST: Admin', () => {

    test('GET: filtro destinos', async() => {
        await api
        .get('/admin/filtro_destinos')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
    })

    test('POST: filtro destinos', async() => {
        await api
        .post('/admin/filtro_destinos')
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })

    test('GET: destinos', async() => {
        await api
        .get('/admin/destinos/1')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
    })
    
    test('POST: cambios destinos', async() => {
        await api
        .post('/admin/destinos/1')
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })
})

beforeAll(async () => {
    await server.close()
})