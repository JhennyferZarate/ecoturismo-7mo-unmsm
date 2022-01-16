const supertest = require('supertest')
const {app, server} = require('../../src/index')
const api = supertest(app)
const pool = require('../../src/database')
const {passport} = require('../../src/library/passport')


describe('GET + POST: Autenticacion', () => {
    test('GET: Login ', async() => {
        await api
            .get('/registro')
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
    })
    
    test('POST: Login ', async() => {
        // await api
        //     .get('/admin/filtro_destinos')
        //     .expect(200)
        //     .expect('Content-Type', "text/html; charset=utf-8")
        //     //.expect('Content-Type', "/application\/json/")
    })
    test('GET: registro ', async() => {
        await api
            .get('/ingreso')
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            //.expect('Content-Type', "text/plain; charset=utf-8")
    })
    
    test('POST: registro ', async() => {
        // jest.setTimeout(10000)
        // const response = await api.get('/admin/destinos/1')
        // expect(response.req.params.id).toBe(1)
        //await api
        //    .get('/admin/destinos/1')
        //    .expect(200)
        //    .expect('Content-Type', "text/html; charset=utf-8")
        //    .expect('Content-Type', "/application\/json/")
    })
})


afterAll(() => {
    pool.end()
    server.close()
})