const express = require('express')
const server = express()
const routes = require('./routes')
const path = require("path")

//usando template engine EJS
server.set('view engine', 'ejs')

//mudar a localização da pasta views
server.set('views', path.join(__dirname,'views'))

//habilita arquivos statics como a pasta Publica definida
server.use(express.static("public"))

//usar o rec.body
server.use(express.urlencoded({extended: true}))

//usa as rotas - paginas html em views através do exports
server.use(routes)


server.listen(3000, () => console.log('rodando'))