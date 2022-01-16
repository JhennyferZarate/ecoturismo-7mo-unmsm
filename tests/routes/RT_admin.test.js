const supertest = require('supertest')
const {app,server} = require('../../src/index')
const api = supertest(app)
const {pool} = require('../../src/database')

describe('GET + POST: Admin', () => {
    test('GET: Admin: ', async() => {
        await api
            .get('/admin')
            .expect(404)
    })
    test('GET: Filtro Destinos: ', async() => {
        await api
            .get('/admin/filtro_destinos')
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            //.expect('Content-Type', "/application\/json/")
    })
    test('POST: Filtro Destinos: ', async() => {
        await api
            .post('/admin/filtro_destinos')
            .expect(302)
            .expect('Content-Type', "text/plain; charset=utf-8")
            //.expect('Content-Type', "text/plain; charset=utf-8")
    })
    
    test.skip('GET: destino ', async() => {
        jest.setTimeout(10000)
        const response = await api.get('/admin/destinos/1')
        expect(response.req.params.id).toBe(1)
        //await api
        //    .get('/admin/destinos/1')
        //    .expect(200)
        //    .expect('Content-Type', "text/html; charset=utf-8")
        //    .expect('Content-Type', "/application\/json/")
    })
    /*
    test('POST: destino ', async() => {
        jest.setTimeout(10000)
        await api
            .post('/admin/destinos/1')
            .expect(300)
            .expect('Content-Type', "text/html; charset=utf-8")
    })
    */
})

afterAll(() => {
    server.close((err) => {
        console.log('server closed: ',err)
    })
});