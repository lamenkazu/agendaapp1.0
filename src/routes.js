const express = require('express')
const routes = express.Router()
const consultaController = require('./controllers/consultaController')
//request, response 

//Rotas das Paginas
routes.get('/', (req, res) => res.render("index"))

//Recebimento do Questionario
routes.post('/', consultaController.create)


routes.get('/consultas', consultaController.consultas)


routes.get('/consultas/:id', consultaController.show)


routes.post('/consultas/:id', consultaController.update)


routes.post('/consultas/delete/:id', consultaController.delete)


routes.get('/historico', consultaController.historico)


module.exports = routes;