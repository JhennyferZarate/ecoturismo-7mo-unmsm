const supertest = require('supertest')
const {app, server} = require('../../src/index')
const api = supertest(app)
const pool = require('../../src/database')

const comentario = {
    comentario: "comentario"
}

const like = {
    like: ""
}

const denuncia = {
    denuncia: ""
}

const destino = {
    img_destino: null,
    titulo_destino: "titulo de destino",
    region: "lima",
    macroregion: "norte",
    ciudad_ubicacion: "ciudad de destino",
    recomendacion_1: "recomendacion 1",
    recomendacion_2: "recomendacion 2",
    recomendacion_3: "recomendacion 3",
    contenido_destino: "contenido del destino"
}

describe('GET + POST: Destinos', () => {
    
    test('GET: destino furuto', async() => {
        await api
        .get('/destinos/futuro')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
    })

    test('GET: filtro destinos', async() => {
        await api
        .get('/destinos/filtro_destinos')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
    })

    test('GET: crear destino', async() => {
        await api
        .get('/destinos/crear')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
    })

    test('POST: crear destino', async() => {
        await api
        .post('/destinos/crear')
        .send(destino)
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })

    test('GET: destino', async() => {
        await api
        .get('/destinos/1')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        //.expect('Content-Type', "/application\/json/")
    })

    test('POST: comentar destino', async() => {
        await api
        .post('/destinos/1')
        .send(comentario)
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })

    test('POST: like destino', async() => {
        await api
        .post('/destinos/1')
        .send(like)
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })

    test('POST: denuncia destino', async() => {
        await api
        .post('/destinos/1')
        .send(denuncia)
        .expect(302)
        .expect('Content-Type', "text/plain; charset=utf-8")
    })
})

beforeAll(async () => {
    await server.close()
})