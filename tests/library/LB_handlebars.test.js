const time = require('../../src/library/handlebars');

describe('Time ago debe ser definido', () => {
    test('Debe ser definido', async () => {
        expect(time).toBeDefined()
    })
    test('Debe ser correcto, string solo año-mes-dia', async () =>{
        const año = time.timeago("2021-05-05")
        expect(año).toBe("hace 8 meses")
    })
    test('Debe haber error, string solo hora-minuto-segundo', async () =>{
        const mes = time.timeago("21:40:50")
        expect(mes).not.toBe("hace 8 meses")
    })
    test('Debe ser respuesta correcta', async () =>{
        const result = time.timeago("2021-05-05 21:40:50")
        expect(result).toBe("hace 8 meses")
    })
})