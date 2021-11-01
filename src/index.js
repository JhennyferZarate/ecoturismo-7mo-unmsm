const app = require('./app')

async function main(){
    await app.listen(app.get('port'), async () => {
        await console.log('servidor en el puerto: ',app.get('port'))
    })
}

main()