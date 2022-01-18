
const supertest = require('supertest')
const {app,server} = require('../../src/index')
const api = supertest(app)
const pool = require('../../src/database')

describe('GET: página principal', () => {
    test('GET index: ', async() => {
        api
            .get('/index')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

beforeAll(async() => {
    await server.close();
})