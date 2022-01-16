const helpers = require('../../src/library/helpers');

describe('Helper encriptado', () => {
    let encrypt,match,pass
    test('Debe ser definido', async () =>{
        expect(helpers).not.toBeUndefined();
    })
    test('Debe ser un objeto', async () =>{
        expect(helpers).objectContaining;
    })
    test('Debe encriptar hash(10)', async () => {
        pass = "string"
        encrypt = await helpers.encryptPassword(pass)
        expect((pass.length)*10).toBe(encrypt.length)
    })
    test('Debe desencriptar y relacionar', async () => {
        match = await helpers.matchPassword("string",encrypt)
        expect(match).toBeTruthy()
    })
    test('Debe fallar encriptar hash(9)', async () => {
        pass = "string"
        encrypt = await helpers.encryptPassword(pass)
        expect((pass.length)*9).not.toBe(encrypt.length)
    })
    test('Debe fallar el desencriptar y relacionar, contraseña mal escrita', async () => {
        pass = pass + " falso"
        match = await helpers.matchPassword(pass,encrypt)
        expect(match).not.toBeTruthy()
    })
})