/*
const supertest = require('supertest')
const {app,server} = require('../../src/index')
const api = supertest(app)
const {pool} = require('../../src/database')

describe('GET: Index', () => {
    test('GET index: ', async() => {
        api
            .get('/index')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    server.close((err) => {
        console.log('server closed: ',err)
    })
})
*/