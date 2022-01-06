const db = require('../db/index.query')
const index = {}

index.get_inicio = async (req, res) => {
    const Mejores = await db.indexGetMejores()
    const Ultimos = await db.indexGetUltimos()

    res.render('index',{Mejores,Ultimos})
}

module.exports = index