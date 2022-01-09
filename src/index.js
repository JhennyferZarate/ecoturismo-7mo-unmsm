const app = require('./app')

const listener = () => {
    console.log('servidor en el puerto: ',app.get('port'))
}

async function main(){
    await app.listen(app.get('port'), listener)
}

main()