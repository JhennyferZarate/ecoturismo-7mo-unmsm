const app = require('../../src/app');
const request = require('supertest');

describe.skip('GET /', () => {
    test('should responde with a 200 status code', async () =>{
        const response = await request(app).get('/').expect(200)
    })
})