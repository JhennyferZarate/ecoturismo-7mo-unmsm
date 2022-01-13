const app = require('../../src/app');
const request = require('supertest');

describe.skip('GET /', () => {
    test('should responde with a 200 status code', async () =>{
        const response = await request(app).get('/admin/destinos/1').send()
        expect(response.statusCode).toBe(200)
    })
})