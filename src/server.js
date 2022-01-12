const express = require('express')
const server = express()
const routes = require('./routes')


server.set('view engine', 'ejs')

//habilita arquivos statics como a pasta Publica definida
server.use(express.static("public"))

//usar o rec.body
server.use(express.urlencoded({extended: true}))

//usa as rotas - paginas html em views através do exports
server.use(routes)


server.listen(3000, () => console.log('rodando'))