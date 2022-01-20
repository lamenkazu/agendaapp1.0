const express = require('express')
const routes = express.Router()
const consultaController = require('./controllers/consultaController')
//request, response 

//Rotas das Paginas

routes.get('/', (req, res) => res.render("index"))

routes.post('/', consultaController.criarCliente)

routes.get('/pacientes', consultaController.pacientes)

routes.post('/pacientes/postfile/:id', consultaController.uploadArquivos)

routes.get('/pacientes/consultas/:id_paciente', consultaController.consultasEspecificas)

routes.post('/pacientes/delete/:id_paciente', consultaController.deletePaciente)

routes.get('/pacientes/:id_paciente', consultaController.editPaciente)

routes.post('/pacientes/:id_paciente', consultaController.updatePaciente)

routes.get('/consultas/:id_paciente', consultaController.marcarConsulta)

routes.post('/consultas/:id_paciente', consultaController.criarConsulta)

routes.get('/consultas', consultaController.consultas)

//
    routes.get('/consultas/:id', consultaController.show)


    routes.post('/consultas/:id', consultaController.update)
//


routes.post('/consultas/delete/:id', consultaController.delete)


routes.get('/historico', consultaController.historico)


module.exports = routes;