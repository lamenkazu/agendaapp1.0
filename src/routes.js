const express = require('express')
const routes = express.Router()
const consultaController = require('./controllers/consultaController')
const pacienteController = require('./controllers/pacienteController')
//request, response 

//Rotas das Paginas

routes.get('/', (req, res) => res.render("index"))

routes.post('/', pacienteController.criarCliente)

routes.get('/pacientes', pacienteController.pacientes)

routes.post('/pacientes/postfile/:id', pacienteController.uploadArquivos)

routes.get('/pacientes/consultas/:id_paciente', pacienteController.consultasEspecificas)

routes.post('/pacientes/delete/:id_paciente', pacienteController.deletePaciente)

routes.get('/pacientes/:id_paciente', pacienteController.editPaciente)

routes.post('/pacientes/:id_paciente', pacienteController.updatePaciente)

routes.get('/consultas/:id_paciente', pacienteController.marcarConsulta)

routes.post('/consultas/:id_paciente', pacienteController.criarConsulta)

//consultas

routes.get('/consultas', consultaController.consultas)

routes.get('/historico', consultaController.historico)


    routes.get('/consultas/edit/:id_consulta', consultaController.show)


    routes.post('/consultas/edit/:id_consulta', consultaController.update)


    routes.post('/consultas/delete/:id_consulta', consultaController.delete)





module.exports = routes;